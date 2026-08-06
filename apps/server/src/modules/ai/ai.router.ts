import { Router } from "express";
import { queryGeminiAI } from "./ai.controller";

const router = Router();

router.post("/query", queryGeminiAI);
router.post("/ask", queryGeminiAI);

export default router;
