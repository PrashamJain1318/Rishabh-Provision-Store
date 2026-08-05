import { Response } from "express";

export interface ApiResponseOptions<T = any> {
  res: Response;
  statusCode?: number;
  message?: string;
  data?: T;
  errors?: any[];
}

export const sendSuccess = <T = any>({
  res,
  statusCode = 200,
  message = "Operation completed successfully",
  data = {} as T,
}: ApiResponseOptions<T>): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = ({
  res,
  statusCode = 400,
  message = "An error occurred",
  errors = [],
}: ApiResponseOptions): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
