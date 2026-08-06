import { Router } from "express";
import {
  getLiveness,
  getReadiness,
  getSystemMetrics,
  getDependenciesHealth,
  getMonitoringDashboardData,
} from "./monitoring.controller";

const router = Router();

router.get("/live", getLiveness);
router.get("/ready", getReadiness);
router.get("/system", getSystemMetrics);
router.get("/dependencies", getDependenciesHealth);
router.get("/dashboard", getMonitoringDashboardData);

export default router;
