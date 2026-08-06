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
  }, 10000);

  it("should process AI ask endpoint queries", async () => {
    const res = await api.post("/api/v1/ai/ask").send({
      prompt: "What are the top selling items?",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("response");
  }, 10000);
});
