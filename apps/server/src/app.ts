import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { API_PREFIX } from "./config/constants";
import { notFoundHandler } from "./middlewares/notFound.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import productRouter from "./modules/products/product.router";
import billingRouter from "./modules/billing/billing.router";

export const createApp = (): Application => {
  const app: Application = express();

  // Middlewares
  app.use(helmet());
  app.use(cors({ origin: "*", credentials: true }));
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));

  // Health Check Endpoint
  app.get(`${API_PREFIX}/health`, (req: Request, res: Response) => {
    res.json({
      status: "UP",
      service: "Rishabh Provision Store Server API",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
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
