import { Request, Response } from "express";

export const uploadFiles = (req: Request, res: Response) => {
  if (!req.files || !Array.isArray(req.files)) return res.status(400).json({ error: "No files uploaded" });
  const urls = req.files.map((f: any) => `/uploads/${f.filename}`);
  res.json({ urls });
};
