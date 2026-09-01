import { readFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";
import type { AskResult } from "../../../shared/types";
import { FACTS_CONTEXT } from "../../../shared/prompt";

export type { AskResult };

const MODEL = "google/gemini-2.5-flash";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

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

export { FACTS_CONTEXT } from "../../../shared/prompt";
