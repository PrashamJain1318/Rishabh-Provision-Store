import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import env from "./config/env";
import { API_PREFIX } from "./config/constants";
import { swaggerSpec } from "./config/swagger";
import { sendSuccess } from "./utils/response";
import { requestIdMiddleware } from "./middlewares/requestId.middleware";
import { requestLogger } from "./middlewares/logger.middleware";
import { globalRateLimiter, authRateLimiter } from "./middlewares/rateLimiter.middleware";
import { notFoundHandler } from "./middlewares/notFound.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import authRouter from "./modules/auth/auth.router";
import { productRouter } from "./modules/products";
import billingRouter from "./modules/billing/billing.router";

export const createApp = (): Application => {
  const app: Application = express();

  // 1. Request ID Tracking Middleware
  app.use(requestIdMiddleware);

  // 2. Helmet Security Headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
        },
      },
      crossOriginEmbedderPolicy: false,
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    })
  );

  // 3. CORS Configuration
  app.use(
    cors({
      origin: env.CORS_ORIGIN || "*",
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Request-Id"],
    })
  );

  // 4. Rate Limiting Middleware
  app.use(API_PREFIX, globalRateLimiter);

  // 5. Gzip Response Compression
  app.use(compression());

  // 6. JSON & URL-Encoded Parsers
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // 7. Cookie Parser Middleware
  app.use(cookieParser());

  // 8. Morgan / Winston HTTP Request Logger Stream
  app.use(requestLogger);

  // 9. Interactive Swagger OpenAPI UI Documentation Endpoint
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Health Check Endpoint
  app.get(`${API_PREFIX}/health`, (req: Request, res: Response) => {
    return sendSuccess({
      res,
      message: "Server API health check operational",
      data: {
        status: "UP",
        service: "Rishabh Provision Store Server API",
        timestamp: new Date().toISOString(),
        version: "1.0.0",
        environment: env.NODE_ENV,
        swaggerDocs: "http://localhost:5001/api-docs",
      },
    });
  });

  // REST API Routes
  app.use(`${API_PREFIX}/auth`, authRateLimiter, authRouter);
  app.use(`${API_PREFIX}/products`, productRouter);
  app.use(`${API_PREFIX}/billing`, billingRouter);

  // Fallbacks
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
