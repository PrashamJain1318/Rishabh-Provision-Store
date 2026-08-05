import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "./logger";

const MAX_RETRIES = 5;
const INITIAL_RETRY_INTERVAL_MS = 2000;

export const connectDatabase = async (retryCount = 0): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      logger.info("MongoDB Connection already active.");
      return;
    }

    logger.info(`Attempting MongoDB Connection to: ${env.MONGO_URI.replace(/:([^@]+)@/, ":****@")}`);

    // Register Mongoose Connection Event Listeners
    mongoose.connection.on("connected", () => {
      logger.info("🟢 MongoDB Connection established successfully.");
    });

    mongoose.connection.on("error", (err) => {
      logger.error("🔴 MongoDB Connection Error event:", err);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("🟡 MongoDB Disconnected from cluster.");
    });

    mongoose.connection.on("reconnected", () => {
      logger.info("🟢 MongoDB Connection re-established.");
    });

    await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

  } catch (error) {
    logger.error(`MongoDB Connection Failure (Attempt ${retryCount + 1}/${MAX_RETRIES}):`, error);

    if (retryCount < MAX_RETRIES) {
      const nextDelay = INITIAL_RETRY_INTERVAL_MS * Math.pow(2, retryCount);
      logger.warn(`Retrying MongoDB connection in ${nextDelay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, nextDelay));
      return connectDatabase(retryCount + 1);
    }

    logger.error("❌ Exceeded maximum MongoDB retry attempts.");
    logger.warn("⚠️ Running in Standalone Mock Database mode for development testing.");
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      logger.info("🟢 MongoDB Disconnected gracefully.");
    }
  } catch (error) {
    logger.error("Error during MongoDB disconnection:", error);
  }
};

export default connectDatabase;
