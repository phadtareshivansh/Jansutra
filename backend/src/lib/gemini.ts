import { readFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";
import { STATE_SCHEDULES } from "../data/states";

export type AskResult = { answer: string };

const MODEL = "google/gemini-2.5-flash";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

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

/** Local-dev only fallback that reads the opencode auth.json. NEVER called under Vercel. */
function readLocalOpenRouterKey(): string | undefined {
  try {
    const raw = readFileSync(join(homedir(), ".local", "share", "opencode", "auth.json"), "utf-8");
    const parsed = JSON.parse(raw) as Record<string, { type?: string; key?: string }>;
    for (const [provider, entry] of Object.entries(parsed)) {
      if (provider === "openrouter" && entry && entry.key) return entry.key;
    }
  } catch {
    // ignore — fall through to env or undefined
  }
  return undefined;
}

export function getOpenRouterKey(): string | undefined {
  if (process.env.OPENROUTER_API_KEY) return process.env.OPENROUTER_API_KEY;
  // Hard-deployed guard: serverless never falls back to local files.
  if (process.env.VERCEL) return undefined;
  return readLocalOpenRouterKey();
}

export async function askOpenRouter(question: string): Promise<AskResult> {
  const key = getOpenRouterKey();
  if (!key) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const res = await fetch(OPENROUTER_URL, {
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

    if (!res.ok) {
      throw new Error(`OpenRouter API error: ${res.status}`);
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = data.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) {
      throw new Error("No response from AI service");
    }
    return { answer: text };
  } finally {
    clearTimeout(timeout);
  }
}

export { FACTS_CONTEXT };
