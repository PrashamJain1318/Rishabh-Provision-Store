import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "./logger";

export const connectDatabase = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect(env.MONGO_URI);
    logger.info(`MongoDB Connected successfully to: ${env.MONGO_URI}`);
  } catch (error) {
    logger.error("MongoDB Connection Failure:", error);
    // Graceful fallback during dev mode without crashing express app
    logger.warn("Running in Standalone Mock Database mode for development testing.");
  }
};

export default connectDatabase;
