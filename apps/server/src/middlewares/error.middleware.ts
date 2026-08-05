import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";
import { sendError } from "../utils/response";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`API Error: ${err.message}`, err);
  const statusCode = err.statusCode || 500;
  return sendError({
    res,
    statusCode,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
};
