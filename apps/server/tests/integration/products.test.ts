import { describe, it, expect, beforeEach } from "vitest";
import { api } from "../helpers/testApp";

describe("Products Integration Tests", () => {
  let authToken = "";

  beforeEach(async () => {
    const regRes = await api.post("/api/v1/auth/register").send({
      firstName: "Product",
      lastName: "Manager",
      email: `prod.mgr.${Date.now()}@rishabhstore.com`,
      password: "Password123@",
      phone: "9876543210",
      role: "Owner",
    });
    authToken = regRes.body.data?.accessToken || "";
  });

  const testProduct = {
    name: "Fortune Kachi Ghani Mustard Oil 1L",
    sku: "OIL-FORT-1L",
    barcode: "8906007280054",
    brand: "Fortune",
    category: "Edible Oils",
    unit: "L",
    purchasePrice: 130,
    sellingPrice: 155,
    mrp: 170,
    stock: 50,
    minStockLevel: 10,
    images: ["https://res.cloudinary.com/demo/image/upload/v1/sample.png"],
    cloudinaryPublicId: "sample_public_id",
  };

  it("should create a new product item", async () => {
    const res = await api
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${authToken}`)
      .send(testProduct);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.sku).toBe(testProduct.sku);
    expect(res.body.data.cloudinaryPublicId).toBe(testProduct.cloudinaryPublicId);
  });

  it("should list products with pagination and category filtering", async () => {
    await api.post("/api/v1/products").set("Authorization", `Bearer ${authToken}`).send(testProduct);

    const listRes = await api.get("/api/v1/products?category=Edible%20Oils&page=1&limit=10");

    expect(listRes.status).toBe(200);
    expect(listRes.body.success).toBe(true);
    expect(Array.isArray(listRes.body.data)).toBe(true);
    expect(listRes.body.data.length).toBeGreaterThan(0);
  });

  it("should retrieve single product by ID", async () => {
    const createRes = await api.post("/api/v1/products").set("Authorization", `Bearer ${authToken}`).send(testProduct);
    const prodId = createRes.body.data.id || createRes.body.data._id;

    const getRes = await api.get(`/api/v1/products/${prodId}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.success).toBe(true);
    expect(getRes.body.data.name).toBe(testProduct.name);
  });

  it("should update product stock and selling price", async () => {
    const createRes = await api.post("/api/v1/products").set("Authorization", `Bearer ${authToken}`).send(testProduct);
    const prodId = createRes.body.data.id || createRes.body.data._id;

    const updateRes = await api
      .put(`/api/v1/products/${prodId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ sellingPrice: 160, stock: 75 });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.success).toBe(true);
    expect(updateRes.body.data.sellingPrice).toBe(160);
    expect(updateRes.body.data.stock).toBe(75);
  });

  it("should delete a product", async () => {
    const createRes = await api.post("/api/v1/products").set("Authorization", `Bearer ${authToken}`).send(testProduct);
    const prodId = createRes.body.data.id || createRes.body.data._id;

    const delRes = await api
      .delete(`/api/v1/products/${prodId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(delRes.status).toBe(200);
    expect(delRes.body.success).toBe(true);
  });
});
