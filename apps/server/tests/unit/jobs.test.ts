import { describe, it, expect } from "vitest";
import { addJobToQueue, getQueueMetrics, QUEUE_NAMES } from "../../src/jobs/queues/queue.manager";
import { api } from "../helpers/testApp";

describe("BullMQ Distributed Queue & Worker Unit Tests", () => {
  it("should enqueue job payload into background queue", async () => {
    const res = await addJobToQueue(QUEUE_NAMES.EMAIL, "SEND_EMAIL", {
      to: "customer@example.com",
      subject: "Order Confirmation #INV-101",
    });

    expect(res.success).toBe(true);
    expect(res).toHaveProperty("jobId");
  });

  it("should return metrics for all 7 BullMQ queues", async () => {
    const metrics = await getQueueMetrics();

    expect(metrics).toHaveProperty(QUEUE_NAMES.INVOICE);
    expect(metrics).toHaveProperty(QUEUE_NAMES.EMAIL);
    expect(metrics).toHaveProperty(QUEUE_NAMES.NOTIFICATION);
    expect(metrics).toHaveProperty(QUEUE_NAMES.AI);
    expect(metrics).toHaveProperty(QUEUE_NAMES.CLOUDINARY);
    expect(metrics).toHaveProperty(QUEUE_NAMES.BACKUP);
    expect(metrics).toHaveProperty(QUEUE_NAMES.ANALYTICS);
  });

  it("should return job status metrics from GET /api/v1/jobs/status", async () => {
    const res = await api.get("/api/v1/jobs/status");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("queues");
  });
});
