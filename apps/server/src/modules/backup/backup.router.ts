import { Router } from "express";
import {
  createBackup,
  restoreBackup,
  getAuditHistory,
  getBackupStatus,
  getStorageMetrics,
} from "./backup.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.get("/status", getBackupStatus);
router.get("/history", getAuditHistory);
router.get("/storage", getStorageMetrics);
router.post("/create", authenticate, authorize("OWNER"), createBackup);
router.post("/restore", authenticate, authorize("OWNER"), restoreBackup);

export default router;
