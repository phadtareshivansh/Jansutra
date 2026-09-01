import type { IncomingMessage, ServerResponse } from "http";
import { getApps } from "firebase-admin/app";

type Cred = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

function getCredentials(): Cred | null {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (!projectId || !clientEmail || !privateKey) return null;
  return { projectId, clientEmail, privateKey };
}

/**
 * Auth for Vercel serverless functions.
 *
 * When Firebase credentials are configured, verifies the Firebase ID token from
 * the Authorization: Bearer header and returns the decoded user claim. Returns
 * null when unauthenticated. When Firebase is NOT configured (local offline dev
 * only), returns null so callers can decide how to fail.
 */
export async function verifyIdToken(req: IncomingMessage): Promise<object | null> {
  const header = req.headers["authorization"];
  const token = typeof header === "string" && header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return null;

  const cred = getCredentials();
  if (!cred) return null;

  // Lazily initialize the default app if not already done.
  if (getApps().length === 0) {
    const { initializeApp, cert } = await import("firebase-admin/app");
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
  return getAuth().verifyIdToken(token);
}

/** Shared CORS headers so serverless functions only answer allowed origins. */
export function applyCors(res: ServerResponse, req: IncomingMessage): void {
  const origin = req.headers["origin"] ?? "";
  // Restrict to the deployed frontend (or any frontend calling same-origin).
  const allowed = ["https://jansutra.vercel.app", "http://localhost:5173", "http://localhost:3000"];
  if (allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
}

export function send(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}
