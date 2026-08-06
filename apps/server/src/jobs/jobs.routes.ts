import { Router } from "express";
import { getJobStatus } from "./jobs.controller";

const router = Router();

router.get("/status", getJobStatus);

export default router;
