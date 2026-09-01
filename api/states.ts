import type { IncomingMessage, ServerResponse } from "http";
import { getStates } from "./firestore";
import { verifyIdToken, applyCors, send } from "./auth";

export const config = { runtime: "nodejs" };

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "OPTIONS") {
    applyCors(res, req);
    res.statusCode = 204;
    res.end();
    return;
  }

  applyCors(res, req);
  if (req.method !== "GET") {
    send(res, 405, { error: "Method not allowed" });
    return;
  }

  const user = await verifyIdToken(req);
  if (!user) {
    send(res, 401, { error: "Unauthorized" });
    return;
  }

  const states = await getStates();
  send(res, 200, { states });
}
