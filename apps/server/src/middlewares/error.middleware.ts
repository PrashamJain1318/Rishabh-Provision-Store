import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";
import { sendError } from "../utils/response";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`API Error: ${err.message}`, { stack: err.stack, name: err.name });

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors: any[] = err.errors || [];

  // 1. JWT Error Handlers
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid authorization token.";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Authorization token has expired. Please sign in again.";
  }

  // 2. Mongoose Database Error Handlers
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid database resource identifier: ${err.value}`;
  } else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || "Resource";
    message = `Duplicate field value entered for '${field}'. Must be unique.`;
  } else if (err.name === "ValidationError" && err.errors) {
    statusCode = 400;
    message = "Database Validation Failed";
    errors = Object.values(err.errors).map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // 3. Zod Validation Error Handler
  if (err.name === "ZodError" && err.issues) {
    statusCode = 400;
    message = "Request Payload Validation Failed";
    errors = err.issues.map((issue: any) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
  }

  return sendError({
    res,
    statusCode,
    message,
    errors,
  });
};
