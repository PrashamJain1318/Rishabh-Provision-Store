import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { UserRole } from "../types/roles";
import { sendError } from "../utils/response";

export const authorizeRoles = (...allowedRoles: (UserRole | string)[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return sendError({
        res,
        statusCode: 403,
        message: "Forbidden: You do not have privilege permissions to perform this operation.",
        errors: [{ requiredRoles: allowedRoles, userRole: req.user?.role }],
      });
    }
    next();
  };
};
