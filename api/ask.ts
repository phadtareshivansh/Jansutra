import type { IncomingMessage, ServerResponse } from "http";
import { FACTS_CONTEXT } from "../shared/prompt";
import { verifyIdToken, applyCors, send } from "./auth";

const MODEL = "google/gemini-2.5-flash";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const USER_QUESTION_TOO_LONG = 500;
const MAX_QUESTIONS_PER_IP = 20;

export const config = { runtime: "nodejs" };

const inFlight = new Map<string, number>();

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "OPTIONS") {
    applyCors(res, req);
    res.statusCode = 204;
    res.end();
    return;
  }

  applyCors(res, req);
  if (req.method !== "POST") {
    send(res, 405, { error: "Method not allowed" });
    return;
  }

  const user = await verifyIdToken(req);
  if (!user) {
    send(res, 401, { error: "Unauthorized" });
    return;
  }

  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || "unknown";
  const count = inFlight.get(ip) || 0;
  if (count >= MAX_QUESTIONS_PER_IP) {
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
  if (question.length > USER_QUESTION_TOO_LONG) {
    send(res, 400, { error: "Question is too long. Please keep it under 500 characters." });
    return;
  }

  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    send(res, 500, { error: "AI service is not configured on the server." });
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
