import { describe, it, expect } from "vitest";
import { gstService } from "../../src/modules/gst/gst.service";
import { api } from "../helpers/testApp";

describe("Enterprise GST & Tax Engine Unit & Integration Tests", () => {
  it("should calculate CGST (50%) and SGST (50%) for Intra-State sales", async () => {
    const calculation = await gstService.calculateTax("27", [
      {
        productName: "Fortune Sunlite Refined Oil 1L",
        hsnCode: "1512",
        quantity: 2,
        unitPrice: 100,
        gstRate: 18,
        taxInclusive: false,
      },
    ]);

    expect(calculation.isInterState).toBe(false);
    expect(calculation.totalTaxableValue).toBe(200);
    expect(calculation.totalCGST).toBe(18); // 9% of 200
    expect(calculation.totalSGST).toBe(18); // 9% of 200
    expect(calculation.totalIGST).toBe(0);
    expect(calculation.grandTotal).toBe(236);
  });

  it("should calculate IGST (100%) for Inter-State sales", async () => {
    const calculation = await gstService.calculateTax("07", [
      {
        productName: "Basmati Rice 5kg",
        hsnCode: "1006",
        quantity: 1,
        unitPrice: 500,
        gstRate: 5,
        taxInclusive: false,
      },
    ]);

    expect(calculation.isInterState).toBe(true);
    expect(calculation.totalTaxableValue).toBe(500);
    expect(calculation.totalCGST).toBe(0);
    expect(calculation.totalSGST).toBe(0);
    expect(calculation.totalIGST).toBe(25); // 5% of 500
    expect(calculation.grandTotal).toBe(525);
  });

  it("should validate GSTIN and PAN format patterns", async () => {
    const validation = await gstService.validateCode({
      gstin: "27AAACR1234A1Z5",
      pan: "AAACR1234A",
      hsnCode: "1512",
      stateCode: "27",
    });

    expect(validation.gstinValid).toBe(true);
    expect(validation.panValid).toBe(true);
    expect(validation.hsnValid).toBe(true);
    expect(validation.stateCodeValid).toBe(true);
  });

  it("should return GST settings from GET /api/v1/gst/settings", async () => {
    const res = await api.get("/api/v1/gst/settings");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("gstin");
    expect(res.body.data).toHaveProperty("stateCode");
  });

  it("should calculate tax breakdown from POST /api/v1/gst/calculate", async () => {
    const res = await api.post("/api/v1/gst/calculate").send({
      destinationStateCode: "27",
      items: [
        { productName: "Atta 5kg", hsnCode: "1101", quantity: 2, unitPrice: 200, gstRate: 5 },
      ],
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.totalCGST).toBe(10);
    expect(res.body.data.totalSGST).toBe(10);
  });
});
