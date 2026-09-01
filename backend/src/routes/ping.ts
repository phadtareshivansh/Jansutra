import { Router, Request, Response } from "express";
import { getFirestoreDb } from "../db";

const router = Router();

router.get("/ping", async (_req: Request, res: Response) => {
  const db = getFirestoreDb();

  try {
    if (db) {
      await db.collection("ping_logs").add({ timestamp: new Date().toISOString() });
    }
  } catch {
    // DB is optional — ping still works without it
  }

  res.json({ ok: true, timestamp: new Date().toISOString() });
});

export default router;
