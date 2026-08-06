import rateLimit from "express-rate-limit";
import { sendError } from "../utils/response";

// General API Rate Limiter (100 requests per 15 minutes per IP)
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return sendError({
      res,
      statusCode: 429,
      message: "Too many requests from this IP. Please try again after 15 minutes.",
      errors: [{ limit: 100, windowMs: "15m" }],
    });
  },
});

// Auth Endpoints Rate Limiter (10 sign-in / registration attempts per 15 minutes per IP)
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return sendError({
      res,
      statusCode: 429,
      message: "Too many authentication attempts. Please wait 15 minutes before trying again.",
      errors: [{ limit: 10, windowMs: "15m" }],
    });
  },
});

// AI Endpoints Rate Limiter (Maximum 20 requests per 1 minute per IP/User)
export const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return sendError({
      res,
      statusCode: 429,
      message: "AI Request Limit Exceeded: Maximum 20 requests allowed per minute per user.",
      errors: [{ limit: 20, windowMs: "1m" }],
    });
  },
});
