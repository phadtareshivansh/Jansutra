import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = process.env.AUTH_TOKEN;

  // If no AUTH_TOKEN is set, bypass auth (dev mode)
  if (!token) {
    next();
    return;
  }

  const header = req.headers.authorization;
  if (!header || header !== `Bearer ${token}`) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}
