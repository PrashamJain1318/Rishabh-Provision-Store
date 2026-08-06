import { Request, Response } from "express";
import { sendSuccess } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";

export const getSecurityStatus = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess({
    res,
    message: "Enterprise Zero-Trust security posture audit status",
    data: {
      owaspCompliance: "OWASP ASVS Level 2",
      jwt: {
        algorithm: "HS256",
        accessTokenExpiry: "15m",
        refreshTokenExpiry: "7d",
        rotationEnabled: true,
      },
      rbac: {
        enforcedRoles: ["OWNER", "MANAGER", "CASHIER", "EMPLOYEE", "CUSTOMER", "DELIVERY_PARTNER"],
        policy: "Strict Least-Privilege Role Authorization Middleware",
      },
      rateLimiting: {
        globalLimiter: "100 req/15min",
        authLimiter: "10 req/15min",
      },
      headers: {
        hsts: "max-age=31536000; includeSubDomains",
        xFrameOptions: "DENY",
        xContentTypeOptions: "nosniff",
        contentSecurityPolicy: "Active",
      },
      uploadSecurity: {
        whitelistedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
        maxFileSizeMb: 5,
        magicByteValidation: "Enabled",
      },
      accountLockout: {
        maxFailedAttempts: 5,
        lockoutWindowMinutes: 15,
      },
      timestamp: new Date().toISOString(),
    },
  });
});
