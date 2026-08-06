import { describe, it, expect } from "vitest";
import { loadRunner } from "../load/runner";
import { api } from "../helpers/testApp";

describe("Enterprise Load & Capacity Engineering Unit Tests", () => {
  it("should calculate percentile distribution and throughput accurately", async () => {
    const result = await loadRunner.runLoadTest("http://localhost:5001/api/v1/health", 10, 50);

    expect(result.virtualUsers).toBe(10);
    expect(result.totalRequests).toBe(50);
    expect(result.latencies).toHaveProperty("p50Ms");
    expect(result.latencies).toHaveProperty("p95Ms");
    expect(result.latencies).toHaveProperty("p99Ms");
  });

  it("should return load benchmark results from GET /api/v1/monitoring/load-benchmark", async () => {
    const res = await api.get("/api/v1/monitoring/load-benchmark?vu=100");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("requestsPerSecond");
    expect(res.body.data.latencies).toHaveProperty("p95Ms");
  });
});
