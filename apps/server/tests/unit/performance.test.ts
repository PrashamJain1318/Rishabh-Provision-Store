import { describe, it, expect } from "vitest";
import { api } from "../helpers/testApp";

describe("Performance Optimization Unit & Integration Tests", () => {
  it("should attach Server-Timing header to API response", async () => {
    const res = await api.get("/api/v1/health");

    expect(res.status).toBe(200);
    expect(res.headers).toHaveProperty("server-timing");
    expect(res.headers["server-timing"]).toContain("dur=");
  });

  it("should return API responses in under 100ms when cached", async () => {
    // Initial fetch to populate cache
    await api.get("/api/v1/products");

    // Second fetch hits Redis/memory cache
    const start = Date.now();
    const res = await api.get("/api/v1/products");
    const duration = Date.now() - start;

    expect(res.status).toBe(200);
    expect(duration).toBeLessThan(100);
    expect(res.headers["x-cache"]).toBe("HIT");
  });
});
