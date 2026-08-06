import { describe, it, expect } from "vitest";
import { api } from "../helpers/testApp";

describe("Inventory Integration Tests", () => {
  it("should retrieve overall inventory log records", async () => {
    const res = await api.get("/api/v1/inventory/logs");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
