import { Request, Response, NextFunction } from "express";
import cacheService from "../services/cache.service";
import logger from "../utils/logger";

export const cacheMiddleware = (ttlSeconds: number = 1800, customPrefix?: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET") {
      return next();
    }

    const prefix = customPrefix || req.baseUrl.replace(/\/api\/v1\//, "");
    const cacheKey = `${prefix}:${req.originalUrl}`;
    const startTime = Date.now();

    try {
      const cachedData = await cacheService.get(cacheKey);
      if (cachedData !== null) {
        const responseTime = Date.now() - startTime;
        res.setHeader("X-Cache", "HIT");
        res.setHeader("X-Response-Time", `${responseTime}ms`);
        logger.info(`[CACHE HIT] Key: ${cacheKey} (${responseTime}ms)`);
        return res.status(200).json(cachedData);
      }
    } catch (err: any) {
      logger.warn(`Cache Middleware Read Error: ${err.message}`);
    }

    res.setHeader("X-Cache", "MISS");

    const originalJson = res.json.bind(res);
    res.json = (body: any): Response => {
      const responseTime = Date.now() - startTime;
      res.setHeader("X-Response-Time", `${responseTime}ms`);

      if (res.statusCode >= 200 && res.statusCode < 300) {
        cacheService.set(cacheKey, body, ttlSeconds).catch((err) => {
          logger.warn(`Cache Write Failure: ${err.message}`);
        });
      }

      logger.info(`[CACHE MISS] Key: ${cacheKey} (${responseTime}ms)`);
      return originalJson(body);
    };

    next();
  };
};
