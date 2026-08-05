import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import env from "./config/env";
import { API_PREFIX } from "./config/constants";
import { requestIdMiddleware } from "./middlewares/requestId.middleware";
import { requestLogger } from "./middlewares/logger.middleware";
import { notFoundHandler } from "./middlewares/notFound.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import productRouter from "./modules/products/product.router";
import billingRouter from "./modules/billing/billing.router";

export const createApp = (): Application => {
  const app: Application = express();

  // 1. Request ID Tracking Middleware (Attaches X-Request-Id header to all requests & responses)
  app.use(requestIdMiddleware);

  // 2. Helmet Security Headers
  app.use(helmet());

  // 3. CORS Configuration
  app.use(
    cors({
      origin: env.CORS_ORIGIN || "*",
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Request-Id"],
    })
  );

  // 4. Gzip Response Compression
  app.use(compression());

  // 5. JSON & URL-Encoded Parsers (10MB Payload Limit)
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // 6. Cookie Parser Middleware
  app.use(cookieParser());

  // 7. Morgan / Winston HTTP Request Logger Stream Integration
  app.use(requestLogger);

  // Health Check Endpoint
  app.get(`${API_PREFIX}/health`, (req: Request, res: Response) => {
    res.json({
      status: "UP",
      service: "Rishabh Provision Store Server API",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      environment: env.NODE_ENV,
    });
  });

  // REST API Routes
  app.use(`${API_PREFIX}/products`, productRouter);
  app.use(`${API_PREFIX}/billing`, billingRouter);

  // Fallbacks
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
