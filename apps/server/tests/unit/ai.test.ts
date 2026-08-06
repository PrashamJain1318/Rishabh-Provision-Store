import { describe, it, expect } from "vitest";
import { api } from "../helpers/testApp";

describe("Google Gemini AI Unit & Integration Tests", () => {
  it("should process AI business prompt queries", async () => {
    const res = await api.post("/api/v1/ai/query").send({
      prompt: "Summarize today's business.",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("response");
  });

  it("should retrieve inventory reorder advice", async () => {
    const res = await api.post("/api/v1/ai/inventory-advice").send({});

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("productsToReorder");
  });

  it("should retrieve sales demand forecast", async () => {
    const res = await api.post("/api/v1/ai/sales-forecast").send({});

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("next30DaysRevenue");
  });
});
