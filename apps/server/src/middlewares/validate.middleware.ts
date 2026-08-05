import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { sendError } from "../utils/response";

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return sendError({
        res,
        statusCode: 400,
        message: "Validation failed",
        errors: result.error.errors,
      });
    }
    req.body = result.data;
    next();
  };
};
