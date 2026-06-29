import { Request, Response } from "express";
import { Package } from "../models/Package";

export const getPackages = async (req: Request, res: Response) => {
  const pkgs = await Package.find().sort({ createdAt: -1 });
  res.json(pkgs);
};

export const createPackage = async (req: Request, res: Response) => {
  try {
    const p = new Package(req.body);
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    res.status(400).json({ error: "Failed to create package" });
  }
};

export const updatePackage = async (req: Request, res: Response) => {
  try {
    const p = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(p);
  } catch (err) {
    res.status(400).json({ error: "Failed to update package" });
  }
};

export const deletePackage = async (req: Request, res: Response) => {
  await Package.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
