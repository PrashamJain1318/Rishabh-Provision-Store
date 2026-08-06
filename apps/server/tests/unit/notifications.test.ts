import { describe, it, expect } from "vitest";
import { api } from "../helpers/testApp";

describe("Firebase Cloud Messaging Unit & Integration Tests", () => {
  const testToken = "test_fcm_device_token_web_123456789";

  it("should register a device token", async () => {
    const res = await api.post("/api/v1/notifications/register-device").send({
      userId: "USR-101",
      token: testToken,
      platform: "WEB",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBe(testToken);
  });

  it("should dispatch push notification and record log history", async () => {
    const res = await api.post("/api/v1/notifications/send").send({
      userId: "USR-101",
      title: "🛒 Order Confirmed",
      body: "Your order #INV-102 is being packed.",
      type: "ORDER_CONFIRMED",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("messageId");
  });

  it("should retrieve notification audit history", async () => {
    const res = await api.get("/api/v1/notifications/history?page=1&limit=10");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("history");
  });

  it("should unregister device token", async () => {
    const res = await api.delete(`/api/v1/notifications/device/${encodeURIComponent(testToken)}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
