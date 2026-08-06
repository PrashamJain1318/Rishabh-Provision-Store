import Redis from "ioredis";
import env from "./env";
import logger from "../utils/logger";

let redisClient: Redis | null = null;
let isConnected = false;

const redisUrl = process.env.REDIS_URL || env.REDIS_URL;
const redisHost = process.env.REDIS_HOST || env.REDIS_HOST || "localhost";
const redisPort = Number(process.env.REDIS_PORT || env.REDIS_PORT || 6379);
const redisPassword = process.env.REDIS_PASSWORD || env.REDIS_PASSWORD || undefined;

try {
  if (redisUrl) {
    redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      retryStrategy(times) {
        if (times > 1) return null;
        return null;
      },
      lazyConnect: true,
    });
  } else {
    redisClient = new Redis({
      host: redisHost,
      port: redisPort,
      password: redisPassword,
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      retryStrategy(times) {
        if (times > 1) return null;
        return null;
      },
      lazyConnect: true,
    });
  }

  redisClient.on("connect", () => {
    isConnected = true;
    logger.info("⚡ Redis Client Connected Successfully");
  });

  redisClient.on("error", () => {
    isConnected = false;
  });
} catch (err: any) {
  logger.warn(`Redis Initialization Warning: ${err.message}. Operating in fallback cache mode.`);
}

export const getRedisStatus = async () => {
  if (redisClient && isConnected) {
    try {
      const ping = await redisClient.ping();
      const info = await redisClient.info("memory");
      return {
        status: "UP",
        ping,
        info,
      };
    } catch (e: any) {
      return { status: "DEGRADED", error: e.message };
    }
  }
  return { status: "FALLBACK_MEMORY", mode: "In-Memory LRU Cache active" };
};

export { isConnected };
export default redisClient;
