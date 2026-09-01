import { Router, Request, Response } from "express";
import { askOpenRouter } from "../lib/gemini";

const router = Router();

router.post("/ask", async (req: Request, res: Response) => {
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";
  if (!question) {
    res.status(400).json({ error: "question is required" });
    return;
  }
  if (question.length > 500) {
    res.status(400).json({ error: "Question is too long." });
    return;
  }

  try {
    const result = await askOpenRouter(question);
    res.json(result);
  } catch (err) {
    console.error("ask error:", err instanceof Error ? err.message : err);
    res.status(503).json({ error: "The AI assistant is temporarily unavailable. Please try again shortly." });
  }
});

export default router;
