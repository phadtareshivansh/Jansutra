import { STATE_SCHEDULES } from "../backend/src/data/states.js";

const MODEL = "google/gemini-2.5-flash";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const USER_QUESTION_TOO_LONG = 500;
const MAX_QUESTIONS_PER_IP = 20;

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

export const config = { runtime: "nodejs" };

const inFlight = new Map<string, number>();

export default async function handler(req: import("http").IncomingMessage, res: import("http").ServerResponse) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || "unknown";
  const count = inFlight.get(ip) || 0;
  if (count >= MAX_QUESTIONS_PER_IP) {
    res.statusCode = 429;
    res.end(JSON.stringify({ error: "Rate limit reached. Please try again later." }));
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
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Invalid JSON body" }));
    return;
  }

  if (!question) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "question is required" }));
    return;
  }
  if (question.length > USER_QUESTION_TOO_LONG) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Question is too long. Please keep it under 500 characters." }));
    return;
  }

  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "AI service is not configured on the server." }));
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

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
      res.statusCode = 502;
      res.end(JSON.stringify({ error: "Upstream AI service error." }));
      return;
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = data.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) {
      res.statusCode = 502;
      res.end(JSON.stringify({ error: "No response from AI service." }));
      return;
    }
    res.statusCode = 200;
    res.end(JSON.stringify({ answer: text }));
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    res.statusCode = aborted ? 504 : 500;
    res.end(
      JSON.stringify({
        error: "The AI assistant is temporarily unavailable. Please try again shortly.",
      })
    );
  } finally {
    clearTimeout(timeout);
  }
}

function readBody(req: import("http").IncomingMessage): Promise<string> {
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
