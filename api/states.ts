import { getStates } from "./firestore.js";
import { ok } from "./shared.js";

export const config = { runtime: "nodejs20.x" };

export default async function handler(req: import("http").IncomingMessage, res: import("http").ServerResponse) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const states = await getStates();
  ok({ states }, asVercelResponse(res));
}

function asVercelResponse(res: import("http").ServerResponse): { status: (c: number) => { json: (b: unknown) => void } } {
  return {
    status: (code: number) => {
      res.statusCode = code;
      return {
        json: (body: unknown) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(body));
        },
      };
    },
  };
}
