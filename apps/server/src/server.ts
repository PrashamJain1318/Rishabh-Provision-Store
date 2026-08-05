import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { connectDatabase } from "./config/database";

const startServer = async () => {
  await connectDatabase();

  const app = createApp();

  app.listen(env.PORT, () => {
    logger.info(`Rishabh Provision Store Server API running on port ${env.PORT}`);
    logger.info(`Health check endpoint: http://localhost:${env.PORT}/api/v1/health`);
  });
};

startServer().catch((error) => {
  logger.error("Failed to start server:", error);
});
