import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const loginAdmin = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email === "admin@chennaitravels.com" && password === "arjun@3454") {
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "7d" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};
