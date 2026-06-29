import { Router } from "express";
import { uploadFiles } from "../controllers/uploadController";
import { requireAuth } from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = Router();

router.post("/", requireAuth, upload.array("files", 10), uploadFiles);

export default router;
