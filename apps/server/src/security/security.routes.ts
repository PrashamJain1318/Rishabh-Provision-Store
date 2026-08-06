import { Router } from "express";
import { getSecurityStatus } from "./security.controller";

const router = Router();

router.get("/status", getSecurityStatus);

export default router;
