import { Router } from "express";
import { getPackages, createPackage, updatePackage, deletePackage } from "../controllers/packageController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", getPackages);
router.post("/", requireAuth, createPackage);
router.put("/:id", requireAuth, updatePackage);
router.delete("/:id", requireAuth, deletePackage);

export default router;
