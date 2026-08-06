import { describe, it, expect } from "vitest";
import { healthService } from "../../src/monitoring/health/health.service";
import { metricsService } from "../../src/monitoring/metrics/metrics.service";
import { alertEngine } from "../../src/monitoring/alerts/alert.engine";
import { api } from "../helpers/testApp";

describe("Enterprise Observability & Health Platform Unit Tests", () => {
  it("should return process liveness status from GET /api/v1/health/live", async () => {
    const res = await api.get("/api/v1/health/live");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("ALIVE");
  });

  it("should return readiness status from GET /api/v1/health/ready", async () => {
    const res = await api.get("/api/v1/health/ready");

    expect([200, 503]).toContain(res.status);
    expect(res.body.data).toHaveProperty("ready");
  });

  it("should collect process CPU & RAM metrics", () => {
    const metrics = metricsService.getSystemMetrics();

    expect(metrics).toHaveProperty("cpuUsage");
    expect(metrics).toHaveProperty("memory");
    expect(metrics.memory).toHaveProperty("usedMb");
    expect(metrics.memory).toHaveProperty("totalMb");
  });

  it("should probe all 8 backend service dependencies", async () => {
    const dependencies = await healthService.getAllDependencies();

    expect(dependencies).toHaveProperty("mongoDB");
    expect(dependencies).toHaveProperty("redis");
    expect(dependencies).toHaveProperty("bullMQ");
    expect(dependencies).toHaveProperty("cloudinary");
    expect(dependencies).toHaveProperty("gemini");
    expect(dependencies).toHaveProperty("firebase");
    expect(dependencies).toHaveProperty("maps");
    expect(dependencies).toHaveProperty("razorpay");
  });

  it("should evaluate alert thresholds", async () => {
    const alerts = await alertEngine.evaluateAlerts();
    expect(Array.isArray(alerts)).toBe(true);
  });

  it("should return complete dashboard payload from GET /api/v1/monitoring/dashboard", async () => {
    const res = await api.get("/api/v1/monitoring/dashboard");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("metrics");
    expect(res.body.data).toHaveProperty("dependencies");
    expect(res.body.data).toHaveProperty("alerts");
  });
});
