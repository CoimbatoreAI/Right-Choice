import { Request, Response } from "express";
import { Vehicle } from "../models/Vehicle";

export const getVehicles = async (req: Request, res: Response) => {
  const vehicles = await Vehicle.find().sort({ createdAt: -1 });
  res.json(vehicles);
};

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const v = new Vehicle(req.body);
    await v.save();
    res.status(201).json(v);
  } catch (err) {
    res.status(400).json({ error: "Failed to create vehicle" });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const v = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(v);
  } catch (err) {
    res.status(400).json({ error: "Failed to update vehicle" });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
