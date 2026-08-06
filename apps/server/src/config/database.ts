import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "./logger";

const MAX_RETRIES = 5;
const INITIAL_RETRY_INTERVAL_MS = 2000;

export const connectDatabase = async (retryCount = 0): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI || env.MONGODB_URI;

  if (!mongoUri || mongoUri.includes("<I WILL PASTE")) {
    const missingErr = new Error("MONGODB_URI is not set or contains placeholder value in environment variables.");
    console.error("❌ MongoDB Atlas Connection Error:", missingErr);
    logger.error("❌ MongoDB Atlas Connection Error:", missingErr);
    return;
  }

  try {
    if (mongoose.connection.readyState === 1) {
      console.log("✅ MongoDB Atlas Connected Successfully");
      logger.info("✅ MongoDB Atlas Connected Successfully");
      return;
    }

    const sanitizedUri = mongoUri.replace(/:([^@]+)@/, ":****@");
    logger.info(`Attempting MongoDB Atlas Connection to: ${sanitizedUri}`);

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB Atlas Connected Successfully");
    logger.info("✅ MongoDB Atlas Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Atlas Connection Error:", error);
    logger.error(`MongoDB Connection Failure (Attempt ${retryCount + 1}/${MAX_RETRIES}):`, error);

    if (retryCount < MAX_RETRIES) {
      const nextDelay = INITIAL_RETRY_INTERVAL_MS * Math.pow(2, retryCount);
      logger.warn(`Retrying MongoDB connection in ${nextDelay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, nextDelay));
      return connectDatabase(retryCount + 1);
    }

    logger.error("❌ Exceeded maximum MongoDB Atlas retry attempts.");
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
