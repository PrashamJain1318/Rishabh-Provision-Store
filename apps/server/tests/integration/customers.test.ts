import { describe, it, expect } from "vitest";
import { api } from "../helpers/testApp";

describe("Customers Integration Tests", () => {
  it("should create a customer profile and list registered CRM records", async () => {
    const customerData = {
      name: "Suresh Sharma",
      phone: "9820011223",
      email: "suresh@example.com",
      address: "Flat 402, Dadar West, Mumbai",
    };

    const createRes = await api.post("/api/v1/customers").send(customerData);

    expect(createRes.status).toBe(201);
    expect(createRes.body.success).toBe(true);
    expect(createRes.body.data.name).toBe(customerData.name);

    const listRes = await api.get("/api/v1/customers");
    expect(listRes.status).toBe(200);
    expect(listRes.body.success).toBe(true);
  });
});
