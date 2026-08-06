import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import env from "./config/env";
import { API_PREFIX } from "./config/constants";
import { swaggerSpec } from "./config/swagger";
import { getRedisStatus } from "./config/redis";
import { sendSuccess } from "./utils/response";
import { requestIdMiddleware } from "./middlewares/requestId.middleware";
import { requestLogger } from "./middlewares/logger.middleware";
import { globalRateLimiter, authRateLimiter } from "./middlewares/rateLimiter.middleware";
import { notFoundHandler } from "./middlewares/notFound.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import authRouter from "./modules/auth/auth.router";
import { productRouter } from "./modules/products";
import { userRouter } from "./modules/users";
import { brandRouter } from "./modules/brands";
import { unitRouter } from "./modules/units";
import { categoryRouter } from "./modules/categories";
import { supplierRouter } from "./modules/suppliers";
import { inventoryRouter } from "./modules/inventory";
import { purchaseRouter } from "./modules/purchases";
import { barcodeRouter } from "./modules/barcode";
import { uploadRouter } from "./modules/upload";
import billingRouter from "./modules/billing/billing.router";
import posRouter from "./modules/pos/pos.router";
import { customerRouter } from "./modules/customers";
import { cartRouter } from "./modules/cart";
import checkoutRouter from "./modules/checkout/checkout.routes";
import { orderRouter } from "./modules/orders";
import { deliveryRouter } from "./modules/delivery";
import loyaltyRouter from "./modules/loyalty/loyalty.routes";
import couponRouter from "./modules/coupons/coupon.routes";
import wishlistRouter from "./modules/wishlist/wishlist.routes";
import notificationRouter from "./modules/notifications/notification.routes";
import backupRouter from "./modules/backup/backup.router";
import aiRouter from "./modules/ai/ai.router";
import { paymentRouter } from "./modules/payment";
import { mapsRouter } from "./modules/maps";
import jobsRouter from "./jobs/jobs.routes";
import monitoringRouter from "./monitoring/monitoring.routes";
import { getInvoices, getInvoiceById } from "./modules/pos/pos.controller";

export const createApp = (): Application => {
  const app: Application = express();

  app.use(requestIdMiddleware);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "https://maps.googleapis.com"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://res.cloudinary.com", "https://maps.googleapis.com", "https://*.gstatic.com"],
        },
      },
      crossOriginEmbedderPolicy: false,
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    })
  );

  app.use(
    cors({
      origin: env.CORS_ORIGIN || "*",
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Request-Id"],
    })
  );

  app.use(API_PREFIX, globalRateLimiter);
  app.use(compression());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.use(cookieParser());
  app.use(requestLogger);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get(`${API_PREFIX}/health`, (req: Request, res: Response) => {
    return sendSuccess({
      res,
      message: "Server API health check operational",
      data: {
        status: "UP",
        service: "Rishabh Provision Store Server API",
        timestamp: new Date().toISOString(),
        version: "1.0.0",
      },
    });
  });

  app.get(`${API_PREFIX}/health/redis`, async (req: Request, res: Response) => {
    const redisHealth = await getRedisStatus();
    return sendSuccess({
      res,
      message: "Redis cache status operational",
      data: redisHealth,
    });
  });

  app.use(`${API_PREFIX}/health`, monitoringRouter);
  app.use(`${API_PREFIX}/monitoring`, monitoringRouter);

  // REST API Routes
  app.use(`${API_PREFIX}/auth`, authRateLimiter, authRouter);
  app.use(`${API_PREFIX}/users`, userRouter);
  app.use(`${API_PREFIX}/customers`, customerRouter);
  app.use(`${API_PREFIX}/cart`, cartRouter);
  app.use(`${API_PREFIX}/checkout`, checkoutRouter);
  app.use(`${API_PREFIX}/orders`, orderRouter);
  app.use(`${API_PREFIX}/delivery`, deliveryRouter);
  app.use(`${API_PREFIX}/loyalty`, loyaltyRouter);
  app.use(`${API_PREFIX}/coupons`, couponRouter);
  app.use(`${API_PREFIX}/wishlist`, wishlistRouter);
  app.use(`${API_PREFIX}/notifications`, notificationRouter);
  app.use(`${API_PREFIX}/backup`, backupRouter);
  app.use(`${API_PREFIX}/ai`, aiRouter);
  app.use(`${API_PREFIX}/payment`, paymentRouter);
  app.use(`${API_PREFIX}/maps`, mapsRouter);
  app.use(`${API_PREFIX}/jobs`, jobsRouter);
  app.use(`${API_PREFIX}/brands`, brandRouter);
  app.use(`${API_PREFIX}/units`, unitRouter);
  app.use(`${API_PREFIX}/categories`, categoryRouter);
  app.use(`${API_PREFIX}/suppliers`, supplierRouter);
  app.use(`${API_PREFIX}/products`, productRouter);
  app.use(`${API_PREFIX}/inventory`, inventoryRouter);
  app.use(`${API_PREFIX}/purchases`, purchaseRouter);
  app.use(`${API_PREFIX}/barcode`, barcodeRouter);
  app.use(`${API_PREFIX}/upload`, uploadRouter);
  app.use(`${API_PREFIX}/billing`, billingRouter);
  app.use(`${API_PREFIX}/pos`, posRouter);

  // Invoices routes
  app.get(`${API_PREFIX}/invoices`, getInvoices);
  app.get(`${API_PREFIX}/invoices/:id`, getInvoiceById);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
