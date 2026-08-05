import { Request, Response } from "express";
import { sendError } from "../utils/response";

export const notFoundHandler = (req: Request, res: Response) => {
  return sendError({
    res,
    statusCode: 404,
    message: `API Route Not Found: [${req.method}] ${req.originalUrl}`,
    errors: [],
  });
};
