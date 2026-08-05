import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { sendError } from "../utils/response";

export interface ValidateRequestSchemas {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return sendError({
        res,
        statusCode: 400,
        message: "Request Body Validation Failed",
        errors: result.error.errors.map((e) => ({
          field: `body.${e.path.join(".")}`,
          message: e.message,
        })),
      });
    }
    req.body = result.data;
    next();
  };
};

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return sendError({
        res,
        statusCode: 400,
        message: "Query Parameters Validation Failed",
        errors: result.error.errors.map((e) => ({
          field: `query.${e.path.join(".")}`,
          message: e.message,
        })),
      });
    }
    req.query = result.data as any;
    next();
  };
};

export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      return sendError({
        res,
        statusCode: 400,
        message: "Route Parameters Validation Failed",
        errors: result.error.errors.map((e) => ({
          field: `params.${e.path.join(".")}`,
          message: e.message,
        })),
      });
    }
    req.params = result.data as any;
    next();
  };
};

export const validateRequest = (schemas: ValidateRequestSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: any[] = [];

    if (schemas.body) {
      const bRes = schemas.body.safeParse(req.body);
      if (!bRes.success) {
        errors.push(...bRes.error.errors.map((e) => ({ field: `body.${e.path.join(".")}`, message: e.message })));
      } else {
        req.body = bRes.data;
      }
    }

    if (schemas.query) {
      const qRes = schemas.query.safeParse(req.query);
      if (!qRes.success) {
        errors.push(...qRes.error.errors.map((e) => ({ field: `query.${e.path.join(".")}`, message: e.message })));
      } else {
        req.query = qRes.data as any;
      }
    }

    if (schemas.params) {
      const pRes = schemas.params.safeParse(req.params);
      if (!pRes.success) {
        errors.push(...pRes.error.errors.map((e) => ({ field: `params.${e.path.join(".")}`, message: e.message })));
      } else {
        req.params = pRes.data as any;
      }
    }

    if (errors.length > 0) {
      return sendError({
        res,
        statusCode: 400,
        message: "Request Validation Failed",
        errors,
      });
    }

    next();
  };
};
