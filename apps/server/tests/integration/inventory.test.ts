import { describe, it, expect, beforeEach } from "vitest";
import { api } from "../helpers/testApp";

describe("Inventory Integration Tests", () => {
  let authToken = "";

  beforeEach(async () => {
    const regRes = await api.post("/api/v1/auth/register").send({
      firstName: "Inventory",
      lastName: "Auditor",
      email: `inv.auditor.${Date.now()}@rishabhstore.com`,
      password: "Password123@",
      phone: "9876543210",
      role: "Owner",
    });
    authToken = regRes.body.data?.accessToken || "";

    await api.post("/api/v1/products").set("Authorization", `Bearer ${authToken}`).send({
      name: "Tata Salt Vacuum Evaporated 1kg",
      sku: "SALT-TATA-1KG",
      barcode: "8901058000555",
      brand: "Tata",
      category: "Spices & Masala",
      unit: "pkt",
      purchasePrice: 20,
      sellingPrice: 28,
      mrp: 30,
      stock: 4,
      minStockLevel: 15,
    });
  });

  it("should retrieve overall inventory stock summary", async () => {
    const res = await api.get("/api/v1/inventory/summary");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("totalProducts");
  });

  it("should identify low-stock items below threshold", async () => {
    const res = await api.get("/api/v1/inventory/low-stock");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
