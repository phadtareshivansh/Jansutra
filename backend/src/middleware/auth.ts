import { Request, Response, NextFunction } from "express";
import { getFirebaseApp } from "../db";

/**
 * Auth middleware.
 *
 * When Firebase is configured (FIREBASE_PROJECT_ID + service account env vars),
 * verifies the Firebase ID token from the Authorization: Bearer header.
 * The verified user is attached to req as res.locals.user.
 *
 * When Firebase is NOT configured (local dev without credentials), requests pass
 * through unauthenticated (dev mode) so local development isn't blocked.
 */
export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const app = getFirebaseApp();

  // Dev mode: no Firebase configured -> allow through.
  if (!app) {
    next();
    return;
  }

  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token) {
    res.status(401).json({ error: "Unauthorized: missing bearer token" });
    return;
  }

  try {
    const { getAuth } = await import("firebase-admin/auth");
    const decoded = await getAuth(app).verifyIdToken(token);
    res.locals.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized: invalid or expired token" });
  }
}
