import { describe, it, expect, beforeEach } from "vitest";
import cacheService from "../../src/services/cache.service";
import { api } from "../helpers/testApp";

describe("Redis Cache Service & Middleware Unit Tests", () => {
  beforeEach(async () => {
    await cacheService.flushByPattern("*");
  });

  it("should store and retrieve data from CacheService", async () => {
    const key = "test:product:101";
    const payload = { id: "101", name: "Fortune Oil 1L", price: 155 };

    await cacheService.set(key, payload, 60);
    const cached = await cacheService.get<typeof payload>(key);

    expect(cached).not.toBeNull();
    expect(cached?.name).toBe(payload.name);
  });

  it("should check key existence and remaining TTL", async () => {
    const key = "test:ttl:key";
    await cacheService.set(key, "data", 120);

    const exists = await cacheService.exists(key);
    const ttl = await cacheService.ttl(key);

    expect(exists).toBe(true);
    expect(ttl).toBeGreaterThan(0);
  });

  it("should delete key and flush by pattern", async () => {
    await cacheService.set("products:1", { name: "P1" }, 60);
    await cacheService.set("products:2", { name: "P2" }, 60);

    await cacheService.flushByPattern("products:*");

    const p1 = await cacheService.get("products:1");
    const p2 = await cacheService.get("products:2");

    expect(p1).toBeNull();
    expect(p2).toBeNull();
  });

  it("should return Redis health status endpoint", async () => {
    const res = await api.get("/api/v1/health/redis");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("status");
  });

  it("should attach X-Cache MISS on initial request and X-Cache HIT on second request", async () => {
    const firstRes = await api.get("/api/v1/products");
    expect(firstRes.headers["x-cache"]).toBe("MISS");

    const secondRes = await api.get("/api/v1/products");
    expect(secondRes.headers["x-cache"]).toBe("HIT");
  });
});
