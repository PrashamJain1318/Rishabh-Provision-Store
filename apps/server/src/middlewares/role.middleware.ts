import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { UserRole, UserRoleEnum } from "../types/roles";
import { sendError } from "../utils/response";

const roleAliasMap: Record<string, string> = {
  OWNER: UserRoleEnum.OWNER,
  MANAGER: UserRoleEnum.MANAGER,
  CASHIER: UserRoleEnum.CASHIER,
  EMPLOYEE: UserRoleEnum.EMPLOYEE,
  DELIVERY: UserRoleEnum.DELIVERY,
  CUSTOMER: UserRoleEnum.CUSTOMER,
};

export const authorize = (...allowedRoles: (UserRole | string)[]) => {
  const canonicalAllowedRoles = allowedRoles.map(
    (role) => (roleAliasMap[role.toUpperCase()] || role).toLowerCase()
  );

  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendError({
        res,
        statusCode: 401,
        message: "Unauthorized: Authentication required before checking role permissions.",
      });
    }

    const userRole = (req.user.role || "").toLowerCase();
    const isAuthorized = canonicalAllowedRoles.includes(userRole) || userRole === "owner" || userRole === "admin";

    if (!isAuthorized) {
      return sendError({
        res,
        statusCode: 403,
        message: `Forbidden: Access requires one of the following roles: [${allowedRoles.join(", ")}]. Your role is '${req.user.role}'.`,
        errors: [{ requiredRoles: allowedRoles, userRole: req.user.role }],
      });
    }

    next();
  };
};

export const authorizeRoles = authorize;
export default authorize;
