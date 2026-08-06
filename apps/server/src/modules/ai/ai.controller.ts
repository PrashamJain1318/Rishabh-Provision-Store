import { Request, Response } from "express";
import { aiService } from "./ai.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const queryGeminiAI = asyncHandler(async (req: Request, res: Response) => {
  const { prompt, context } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return sendError({ res, statusCode: 400, message: "Prompt text is required for AI processing." });
  }

  const result = await aiService.queryGemini({ prompt, context });

  return sendSuccess({
    res,
    statusCode: 200,
    message: "Gemini AI query processed successfully",
    data: result,
  });
});

export const getInventoryAdvice = asyncHandler(async (_req: Request, res: Response) => {
  const advice = await aiService.getInventoryAdvice();

  return sendSuccess({
    res,
    statusCode: 200,
    message: "AI inventory optimization advice retrieved successfully",
    data: advice,
  });
});

export const getSalesForecast = asyncHandler(async (_req: Request, res: Response) => {
  const forecast = await aiService.getSalesForecast();

  return sendSuccess({
    res,
    statusCode: 200,
    message: "AI sales demand forecast retrieved successfully",
    data: forecast,
  });
});
