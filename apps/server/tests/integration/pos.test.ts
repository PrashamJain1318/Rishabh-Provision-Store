import { describe, it, expect } from "vitest";
import { api } from "../helpers/testApp";

describe("POS Integration Tests", () => {
  it("should process checkout and generate invoice document", async () => {
    const posPayload = {
      customerName: "Ramesh Kumar",
      customerPhone: "9876543210",
      paymentMethod: "Cash",
      items: [
        {
          productId: "P1",
          sku: "ATT-AASH-5KG",
          name: "Aashirvaad Chakki Atta 5kg",
          price: 245,
          qty: 2,
        },
      ],
      discount: 0,
    };

    const res = await api.post("/api/v1/pos/checkout").send(posPayload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("billNo");
  });
});
