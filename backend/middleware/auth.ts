import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
