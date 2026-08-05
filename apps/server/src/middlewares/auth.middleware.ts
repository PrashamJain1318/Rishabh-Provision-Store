import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import { sendError } from "../utils/response";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendError({
      res,
      statusCode: 401,
      message: "Authentication failed: Authorization header with Bearer token is required.",
      errors: [{ header: "Authorization", message: "Bearer token missing" }],
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as any;
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return sendError({
        res,
        statusCode: 401,
        message: "Authentication failed: Access token has expired.",
        errors: [{ token: "expired" }],
      });
    }
    return sendError({
      res,
      statusCode: 401,
      message: "Authentication failed: Invalid authorization token.",
      errors: [{ token: "invalid" }],
    });
  }
};

export const authenticateJwt = authenticate;
export default authenticate;
