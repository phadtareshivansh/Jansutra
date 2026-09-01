import type { IncomingMessage, ServerResponse } from "http";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/**
 * Single self-contained Vercel serverless function for Jan Sutra.
 *
 * Why one file? Vercel deploys each api/*.ts as its own lambda and does not
 * reliably bundle relative imports that live outside api/ (../shared/*) in
 * ESM. Inlining everything here keeps the whole API in one resolvable closure.
 *
 * Routes (via vercel.json rewrite "/api/(.*)" -> "/api"):
 *   GET  /api/states  -> state schedule from Firestore (seed fallback)
 *   POST /api/ask     -> Census 2027 assistant via OpenRouter
 */

export const config = { runtime: "nodejs" };

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "OPTIONS") {
    applyCors(res, req);
    res.statusCode = 204;
    res.end();
    return;
  }

  applyCors(res, req);

  const url = (req.url ?? "").split("?")[0];

  if (url === "/api/states" && req.method === "GET") {
    const states = await getStates();
    send(res, 200, { states });
    return;
  }

  if (url === "/api/ask" && req.method === "POST") {
    await handleAsk(req, res);
    return;
  }

  send(res, 404, { error: "Not found" });
}

// ---------------------------------------------------------------------------
// /api/ask — OpenRouter-powered assistant
// ---------------------------------------------------------------------------

const MODEL = "google/gemini-2.5-flash";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const QUESTION_TOO_LONG = 500;
const MAX_PER_IP_PER_MINUTE = 20;

const inFlight = new Map<string, number>();

async function handleAsk(req: IncomingMessage, res: ServerResponse) {
  if (req.headers["authorization"]) {
    const okUser = await verifyIdToken(req);
    if (!okUser) {
      send(res, 401, { error: "Unauthorized" });
      return;
    }
  }

  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || "unknown";
  const count = inFlight.get(ip) || 0;
  if (count >= MAX_PER_IP_PER_MINUTE) {
    send(res, 429, { error: "Rate limit reached. Please try again later." });
    return;
  }
  inFlight.set(ip, count + 1);
  setTimeout(() => {
    const c = inFlight.get(ip) || 1;
    if (c <= 1) inFlight.delete(ip);
    else inFlight.set(ip, c - 1);
  }, 60_000);

  let question = "";
  try {
    const body = await readBody(req);
    const parsed = JSON.parse(body);
    question = typeof parsed?.question === "string" ? parsed.question.trim() : "";
  } catch {
    send(res, 400, { error: "Invalid JSON body" });
    return;
  }

  if (!question) {
    send(res, 400, { error: "question is required" });
    return;
  }
  if (question.length > QUESTION_TOO_LONG) {
    send(res, 400, { error: "Question is too long. Please keep it under 500 characters." });
    return;
  }

  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    send(res, 500, { error: "AI service is not configured on the server." });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: FACTS_CONTEXT },
          { role: "user", content: question },
        ],
        max_tokens: 300,
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      send(res, 502, { error: "Upstream AI service error." });
      return;
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = data.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) {
      send(res, 502, { error: "No response from AI service." });
      return;
    }
    send(res, 200, { answer: text });
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    send(res, aborted ? 504 : 500, {
      error: "The AI assistant is temporarily unavailable. Please try again shortly.",
    });
  } finally {
    clearTimeout(timeout);
  }
}

// ---------------------------------------------------------------------------
// /api/states — Firestore-backed schedule with bundled seed fallback
// ---------------------------------------------------------------------------

let firestoreDb: Firestore | null = null;

function initFirestore(): Firestore | null {
  if (firestoreDb) return firestoreDb;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) return null;

  if (getApps().length === 0) {
    initializeApp({
      projectId,
      credential: cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, "\n"),
      }),
    });
  }

  firestoreDb = getFirestore();
  return firestoreDb;
}

async function getStates(): Promise<StateSchedule[]> {
  const db = initFirestore();
  if (!db) return STATE_SCHEDULES;

  try {
    const snap = await db.collection("states").orderBy("selfEnumStart").get();
    if (snap.empty) return STATE_SCHEDULES;
    return snap.docs.map((doc) => {
      const d = doc.data();
      const state = String(d.name ?? d.state ?? "");
      const seed = STATE_SCHEDULES.find((s) => s.state === state);
      return {
        id: typeof d.id === "number" ? d.id : seed?.id ?? 0,
        state,
        selfEnumStart: String(d.selfEnumStart ?? ""),
        selfEnumEnd: String(d.selfEnumEnd ?? ""),
        houseListingStart: String(d.houseListingStart ?? ""),
        houseListingEnd: String(d.houseListingEnd ?? ""),
      };
    });
  } catch (err) {
    console.error("getStates failed, using fallback:", err);
    return STATE_SCHEDULES;
  }
}

// ---------------------------------------------------------------------------
// Auth — Firebase ID token verification bound to the frontend's Bearer token.
// Only enforced when a token is actually presented, so the public assistant
// works without a mandatory sign-in (hackathon demo trade-off).
// ---------------------------------------------------------------------------

type Cred = { projectId: string; clientEmail: string; privateKey: string };

function getCredentials(): Cred | null {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (!projectId || !clientEmail || !privateKey) return null;
  return { projectId, clientEmail, privateKey };
}

async function verifyIdToken(req: IncomingMessage): Promise<object | null> {
  const header = req.headers["authorization"];
  const token = typeof header === "string" && header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return null;

  const cred = getCredentials();
  if (!cred) return null;

  if (getApps().length === 0) {
    initializeApp({
      projectId: cred.projectId,
      credential: cert({
        projectId: cred.projectId,
        clientEmail: cred.clientEmail,
        privateKey: cred.privateKey.replace(/\\n/g, "\n"),
      }),
    });
  }

  const { getAuth } = await import("firebase-admin/auth");
  return getAuth().verifyIdToken(token).catch(() => null);
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function applyCors(res: ServerResponse, req: IncomingMessage): void {
  const origin = req.headers["origin"] ?? "";
  const allowed = [
    "https://jansutra.vercel.app",
    "https://jansutra-web.vercel.app",
    "https://jansutra-gamma.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
  ];
  if (allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
}

function send(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk: Buffer) => {
      body += chunk;
      if (body.length > 10_000) {
        reject(new Error("Body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

// ---------------------------------------------------------------------------
// Inlined shared data (kept here so the single lambda needs no ../shared import)
// ---------------------------------------------------------------------------

type StateSchedule = {
  id: number;
  state: string;
  selfEnumStart: string;
  selfEnumEnd: string;
  houseListingStart: string;
  houseListingEnd: string;
};

const STATE_SCHEDULES: StateSchedule[] = [
  { id: 1, state: "Andaman & Nicobar", selfEnumStart: "2026-04-01", selfEnumEnd: "2026-04-15", houseListingStart: "2026-04-16", houseListingEnd: "2026-05-15" },
  { id: 2, state: "Delhi (NDMC)", selfEnumStart: "2026-04-01", selfEnumEnd: "2026-04-15", houseListingStart: "2026-04-16", houseListingEnd: "2026-05-15" },
  { id: 3, state: "Goa", selfEnumStart: "2026-04-01", selfEnumEnd: "2026-04-15", houseListingStart: "2026-04-16", houseListingEnd: "2026-05-15" },
  { id: 4, state: "Gujarat", selfEnumStart: "2026-04-05", selfEnumEnd: "2026-04-19", houseListingStart: "2026-04-20", houseListingEnd: "2026-05-19" },
  { id: 5, state: "Jharkhand", selfEnumStart: "2026-05-01", selfEnumEnd: "2026-05-15", houseListingStart: "2026-05-16", houseListingEnd: "2026-06-14" },
  { id: 6, state: "Karnataka", selfEnumStart: "2026-04-01", selfEnumEnd: "2026-04-15", houseListingStart: "2026-04-16", houseListingEnd: "2026-05-15" },
  { id: 7, state: "Kerala", selfEnumStart: "2026-06-16", selfEnumEnd: "2026-06-30", houseListingStart: "2026-07-01", houseListingEnd: "2026-07-30" },
  { id: 8, state: "Maharashtra", selfEnumStart: "2026-05-01", selfEnumEnd: "2026-05-15", houseListingStart: "2026-05-16", houseListingEnd: "2026-06-14" },
  { id: 9, state: "Odisha", selfEnumStart: "2026-04-01", selfEnumEnd: "2026-04-15", houseListingStart: "2026-04-16", houseListingEnd: "2026-05-15" },
  { id: 10, state: "Rajasthan", selfEnumStart: "2026-05-01", selfEnumEnd: "2026-05-15", houseListingStart: "2026-05-16", houseListingEnd: "2026-06-14" },
  { id: 11, state: "Sikkim", selfEnumStart: "2026-04-01", selfEnumEnd: "2026-04-15", houseListingStart: "2026-04-16", houseListingEnd: "2026-05-15" },
  { id: 12, state: "Tamil Nadu", selfEnumStart: "2026-07-17", selfEnumEnd: "2026-07-31", houseListingStart: "2026-08-01", houseListingEnd: "2026-08-30" },
  { id: 13, state: "Uttar Pradesh", selfEnumStart: "2026-05-07", selfEnumEnd: "2026-05-21", houseListingStart: "2026-05-22", houseListingEnd: "2026-06-20" },
];

const FACTS_CONTEXT = `
You are the official informational assistant for Census 2027, India's first fully digital census.
Use ONLY the following locked-in facts. Do not invent dates, numbers, or policies.

FACTS:
- Census 2027 is India's 16th census, 8th since Independence, and the first fully digital census.
- Phase 1 (Houselisting & Housing Census): April 1 - September 30, 2026. Collects housing conditions, amenities, household assets, and geo-tagging of buildings.
- Phase 2 (Population Enumeration): February 2027, reference date March 1, 2027. Snow-bound regions (Ladakh, J&K, Himachal Pradesh, Uttarakhand) use October 1, 2026 as reference date. Collects individual-level data, including India's first caste census since 1931.
- Self-enumeration: a 15-day online window immediately before each state's house-listing phase, via portal se.census.gov.in, available in 16 languages. Citizens self-report household data and receive a unique Self-Enumeration ID, verified later by an enumerator during the physical visit.
- No documents are required from citizens during self-enumeration (they do not need to bring Aadhaar, proof of address, etc.).
- Scale: Rs. 11,718.24 crore budget, 31+ lakh enumerators, ~6.39 lakh villages, 36 states/UTs covered.

STATE SCHEDULES (self-enum date -> house listing date):
${STATE_SCHEDULES.map((s) => `${s.state}: Self-enum ${s.selfEnumStart} to ${s.selfEnumEnd}; House listing ${s.houseListingStart} to ${s.houseListingEnd}`).join("\n")}

REPLY RULES:
- Answer concisely and helpfully. If asked about a fact not in the list, say you can only answer using official Census 2027 facts.
- If asked for dates for a state not in the list, say only the sample schedule above is available.
- Keep the reply brief (under ~120 words unless more is clearly needed).
`;