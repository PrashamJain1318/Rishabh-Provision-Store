import { Router } from "express";
import { uploadSingleImage } from "./upload.controller";
import { uploadMiddleware } from "../../middlewares/upload.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post(
  "/image",
  authorize("OWNER", "MANAGER"),
  uploadMiddleware.single("image"),
  uploadSingleImage
);

export default router;
