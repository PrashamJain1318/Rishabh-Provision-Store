import { Router } from "express";
import { uploadSingleImage } from "./upload.controller";
import { uploadMiddleware } from "../../middlewares/upload.middleware";

const router = Router();

router.post("/single", uploadMiddleware.single("image"), uploadSingleImage);
router.post("/image", uploadMiddleware.single("image"), uploadSingleImage);

export default router;
