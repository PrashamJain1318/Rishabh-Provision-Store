import dotenv from "dotenv";
dotenv.config();

import { Server } from "http";
import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { connectDatabase, disconnectDatabase } from "./config/database";
import { seedOwnerAccount } from "./jobs/seedOwner";

let server: Server;

// 1. Process Signal & Uncaught Exception Handlers
process.on("uncaughtException", (error: Error) => {
  logger.error("Uncaught Exception caught! Shutting down server gracefully...", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  logger.error("Unhandled Promise Rejection caught! Shutting down server gracefully...", reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// 2. Server Bootstrapper & Initialization
const startServer = async (): Promise<void> => {
  // Load environment & connect database
  await connectDatabase();

  // Auto-seed primary Owner account if missing
  await seedOwnerAccount();

  const app = createApp();

  server = app.listen(env.PORT, () => {
    logger.info(`==========================================================`);
    logger.info(`🚀 Rishabh Provision Store Server API listening on Port ${env.PORT}`);
    logger.info(`🌐 Environment: ${env.NODE_ENV}`);
    logger.info(`🏥 Health check: http://localhost:${env.PORT}/api/v1/health`);
    logger.info(`==========================================================`);
  });
};

// 3. Graceful Shutdown Handlers for SIGTERM & SIGINT
const gracefulShutdown = (signal: string) => {
  logger.info(`${signal} signal received. Initiating graceful shutdown sequence...`);

  if (server) {
    server.close(async () => {
      logger.info("HTTP Server closed successfully.");
      try {
        await disconnectDatabase();
      } catch (err) {
        logger.error("Error closing MongoDB connection:", err);
      } finally {
        logger.info("Graceful shutdown completed. Exiting process.");
        process.exit(0);
      }
    });
  } else {
    process.exit(0);
  }
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

startServer().catch((error) => {
  logger.error("Fatal error during server startup:", error);
  process.exit(1);
});
