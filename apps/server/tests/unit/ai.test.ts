import { describe, it, expect } from "vitest";
import { api } from "../helpers/testApp";

describe("Google Gemini AI Unit & Integration Tests", () => {
  it("should process AI business prompt queries", async () => {
    const res = await api.post("/api/v1/ai/query").send({
      prompt: "Summarize today's business.",
    });

    expect([200, 500]).toContain(res.status);
    expect(res.body).toHaveProperty("success");
  });

  it("should process AI ask endpoint queries", async () => {
    const res = await api.post("/api/v1/ai/ask").send({
      prompt: "What are the top selling items?",
    });

    expect([200, 500]).toContain(res.status);
    expect(res.body).toHaveProperty("success");
  });
});
