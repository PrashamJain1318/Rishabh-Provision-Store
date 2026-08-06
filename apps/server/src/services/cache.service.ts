import redisClient from "../config/redis";
import logger from "../utils/logger";

interface MemoryStoreItem {
  value: string;
  expiresAt: number | null;
}

class CacheService {
  private memoryStore: Map<string, MemoryStoreItem> = new Map();

  async get<T>(key: string): Promise<T | null> {
    try {
      if (redisClient && redisClient.status === "ready") {
        const val = await redisClient.get(key);
        return val ? JSON.parse(val) : null;
      }
    } catch (err: any) {
      logger.warn(`Redis GET Error for key ${key}: ${err.message}`);
    }

    // In-memory fallback
    const item = this.memoryStore.get(key);
    if (!item) return null;
    if (item.expiresAt && Date.now() > item.expiresAt) {
      this.memoryStore.delete(key);
      return null;
    }
    return JSON.parse(item.value);
  }

  async set(key: string, value: any, ttlSeconds?: number): Promise<boolean> {
    const stringVal = JSON.stringify(value);

    try {
      if (redisClient && redisClient.status === "ready") {
        if (ttlSeconds && ttlSeconds > 0) {
          await redisClient.set(key, stringVal, "EX", ttlSeconds);
        } else {
          await redisClient.set(key, stringVal);
        }
        return true;
      }
    } catch (err: any) {
      logger.warn(`Redis SET Error for key ${key}: ${err.message}`);
    }

    // In-memory fallback
    const expiresAt = ttlSeconds && ttlSeconds > 0 ? Date.now() + ttlSeconds * 1000 : null;
    this.memoryStore.set(key, { value: stringVal, expiresAt });
    return true;
  }

  async del(key: string): Promise<boolean> {
    try {
      if (redisClient && redisClient.status === "ready") {
        await redisClient.del(key);
      }
    } catch (err: any) {
      logger.warn(`Redis DEL Error for key ${key}: ${err.message}`);
    }
    this.memoryStore.delete(key);
    return true;
  }

  async exists(key: string): Promise<boolean> {
    const val = await this.get(key);
    return val !== null;
  }

  async expire(key: string, ttlSeconds: number): Promise<boolean> {
    try {
      if (redisClient && redisClient.status === "ready") {
        await redisClient.expire(key, ttlSeconds);
        return true;
      }
    } catch (err: any) {
      logger.warn(`Redis EXPIRE Error for key ${key}: ${err.message}`);
    }
    const item = this.memoryStore.get(key);
    if (item) {
      item.expiresAt = Date.now() + ttlSeconds * 1000;
      return true;
    }
    return false;
  }

  async ttl(key: string): Promise<number> {
    try {
      if (redisClient && redisClient.status === "ready") {
        return await redisClient.ttl(key);
      }
    } catch (err: any) {
      logger.warn(`Redis TTL Error for key ${key}: ${err.message}`);
    }
    const item = this.memoryStore.get(key);
    if (!item || !item.expiresAt) return -1;
    const remaining = Math.ceil((item.expiresAt - Date.now()) / 1000);
    return remaining > 0 ? remaining : -2;
  }

  async flushByPattern(pattern: string): Promise<void> {
    try {
      if (redisClient && redisClient.status === "ready") {
        const keys = await redisClient.keys(pattern);
        if (keys.length > 0) {
          await redisClient.del(...keys);
        }
      }
    } catch (err: any) {
      logger.warn(`Redis FLUSH Pattern Error for ${pattern}: ${err.message}`);
    }

    const regex = new RegExp("^" + pattern.replace(/\*/g, ".*") + "$");
    for (const k of this.memoryStore.keys()) {
      if (regex.test(k)) {
        this.memoryStore.delete(k);
      }
    }
  }

  clearMemoryStore(): void {
    this.memoryStore.clear();
  }
}

export const cacheService = new CacheService();
export default cacheService;
