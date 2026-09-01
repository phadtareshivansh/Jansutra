import { Router, Request, Response } from "express";
import { getStates } from "../lib/firestore";

const router = Router();

router.get("/states", async (_req: Request, res: Response) => {
  const states = await getStates();
  res.json({ states });
});

export default router;
