import { Router } from "express";
import { queryGeminiAI, getInventoryAdvice, getSalesForecast } from "./ai.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import { aiQuerySchema } from "./ai.schema";
import { aiRateLimiter } from "../../middlewares/rateLimiter.middleware";

const router = Router();

// Apply 20 req/min rate limiter to all AI endpoints
router.use(aiRateLimiter);

router.post("/query", validateBody(aiQuerySchema), queryGeminiAI);
router.post("/inventory-advice", getInventoryAdvice);
router.post("/sales-forecast", getSalesForecast);

export default router;
