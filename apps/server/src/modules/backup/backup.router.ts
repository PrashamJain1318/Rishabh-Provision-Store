import { Router } from "express";
import { createBackup, restoreBackup, getAuditHistory } from "./backup.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/create", createBackup);
router.post("/restore", restoreBackup);
router.get("/audit", getAuditHistory);

export default router;
