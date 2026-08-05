import { Router } from "express";
import { processCheckoutPipeline } from "./checkout.controller";

const router = Router();

router.post("/process", processCheckoutPipeline);

export default router;
