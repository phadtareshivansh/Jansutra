import { Router, Request, Response } from "express";

const router = Router();

router.get("/ping", async (req: Request, res: Response) => {
  const db = req.app.locals.db;

  try {
    if (db) {
      await db.query("INSERT INTO ping_logs (timestamp) VALUES ($1)", [new Date().toISOString()]);
    }
  } catch {
    // DB is optional — ping still works without it
  }

  res.json({ ok: true, timestamp: new Date().toISOString() });
});

export default router;
