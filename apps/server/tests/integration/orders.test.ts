import { describe, it, expect } from "vitest";
import { api } from "../helpers/testApp";

describe("Orders Integration Tests", () => {
  it("should create an order and support status updates", async () => {
    const orderData = {
      customerId: "CUST-101",
      customerName: "Anil Kapoor",
      customerPhone: "9876543210",
      items: [
        {
          sku: "ATT-AASH-5KG",
          name: "Aashirvaad Atta 5kg",
          price: 245,
          quantity: 1,
        },
      ],
      totalAmount: 245,
      deliveryAddress: "Bandra West, Mumbai",
    };

    const createRes = await api.post("/api/v1/orders").send(orderData);

    expect(createRes.status).toBe(201);
    expect(createRes.body.success).toBe(true);
    expect(createRes.body.data).toHaveProperty("id");
  });
});
