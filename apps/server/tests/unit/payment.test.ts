import { describe, it, expect } from "vitest";
import crypto from "crypto";
import { api } from "../helpers/testApp";

describe("Razorpay Payment Unit & Integration Tests", () => {
  const testSecret = "HWY7A0VwxEOKk7ki30MmhmRy";

  it("should create a Razorpay order converting ₹ to paise", async () => {
    const res = await api.post("/api/v1/payment/create-order").send({
      amount: 500,
      currency: "INR",
      receipt: "INV-TEST-001",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.amount).toBe(50000);
    expect(res.body.data).toHaveProperty("orderId");
  });

  it("should verify valid HMAC SHA-256 Razorpay payment signature", async () => {
    const orderId = "order_test_12345";
    const paymentId = "pay_test_67890";
    const signature = crypto
      .createHmac("sha256", testSecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const res = await api.post("/api/v1/payment/verify").send({
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
      receipt: "INV-TEST-001",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.payment.status).toBe("CAPTURED");
  });

  it("should reject invalid forged payment signatures", async () => {
    const res = await api.post("/api/v1/payment/verify").send({
      razorpay_order_id: "order_test_12345",
      razorpay_payment_id: "pay_test_67890",
      razorpay_signature: "invalid_forged_signature",
    });

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });

  it("should process payment refund", async () => {
    const orderId = "order_test_refund_123";
    const paymentId = "pay_test_refund_456";
    const signature = crypto
      .createHmac("sha256", testSecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    await api.post("/api/v1/payment/verify").send({
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    });

    const refundRes = await api.post("/api/v1/payment/refund").send({
      paymentId,
      amount: 500,
      reason: "Customer order cancellation",
    });

    expect(refundRes.status).toBe(200);
    expect(refundRes.body.success).toBe(true);
    expect(refundRes.body.data.status).toBe("REFUNDED");
  });

  it("should retrieve payment history logs", async () => {
    const res = await api.get("/api/v1/payment/history?page=1&limit=10");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("payments");
  });
});
