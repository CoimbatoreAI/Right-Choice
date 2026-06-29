import { Router } from "express";
import { getVehicles, createVehicle, updateVehicle, deleteVehicle } from "../controllers/vehicleController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", getVehicles);
router.post("/", requireAuth, createVehicle);
router.put("/:id", requireAuth, updateVehicle);
router.delete("/:id", requireAuth, deleteVehicle);

export default router;
