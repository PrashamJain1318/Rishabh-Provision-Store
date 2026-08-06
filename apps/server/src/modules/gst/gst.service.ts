import { gstRepository } from "./gst.repository";
import {
  IGSTCalculationItem,
  IGSTCalculationResponse,
  IGSTCalculationResultItem,
  IGSTSettings,
} from "./gst.types";
import { GSTINRegex, PANRegex, HSNRegex } from "./gst.schema";

export class GSTService {
  async getSettings(): Promise<IGSTSettings> {
    return gstRepository.getSettings();
  }

  async updateSettings(payload: Partial<IGSTSettings>): Promise<IGSTSettings> {
    return gstRepository.updateSettings(payload);
  }

  async calculateTax(
    destinationStateCode: string = "27",
    items: IGSTCalculationItem[]
  ): Promise<IGSTCalculationResponse> {
    const settings = await gstRepository.getSettings();
    const supplyStateCode = settings.stateCode;
    const isInterState = supplyStateCode !== destinationStateCode;

    let subtotal = 0;
    let totalDiscount = 0;
    let totalTaxableValue = 0;
    let totalCGST = 0;
    let totalSGST = 0;
    let totalIGST = 0;
    let totalCESS = 0;

    const resultItems: IGSTCalculationResultItem[] = items.map((item) => {
      const grossAmount = item.quantity * item.unitPrice;
      const discount = item.discountAmount || 0;
      const netAmount = Math.max(0, grossAmount - discount);

      let taxableValue = netAmount;
      if (item.taxInclusive) {
        taxableValue = Number((netAmount / (1 + item.gstRate / 100)).toFixed(2));
      }

      let cgstRate = 0,
        cgstAmount = 0;
      let sgstRate = 0,
        sgstAmount = 0;
      let igstRate = 0,
        igstAmount = 0;

      if (isInterState) {
        igstRate = item.gstRate;
        igstAmount = Number(((taxableValue * igstRate) / 100).toFixed(2));
      } else {
        cgstRate = item.gstRate / 2;
        cgstAmount = Number(((taxableValue * cgstRate) / 100).toFixed(2));
        sgstRate = item.gstRate / 2;
        sgstAmount = Number(((taxableValue * sgstRate) / 100).toFixed(2));
      }

      const cessRate = item.cessRate || 0;
      const cessAmount = Number(((taxableValue * cessRate) / 100).toFixed(2));

      const itemTotalTax = Number((cgstAmount + sgstAmount + igstAmount + cessAmount).toFixed(2));
      const itemTotalAmount = Number((taxableValue + itemTotalTax).toFixed(2));

      subtotal += grossAmount;
      totalDiscount += discount;
      totalTaxableValue += taxableValue;
      totalCGST += cgstAmount;
      totalSGST += sgstAmount;
      totalIGST += igstAmount;
      totalCESS += cessAmount;

      return {
        productId: item.productId,
        productName: item.productName,
        hsnCode: item.hsnCode,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        taxableValue,
        gstRate: item.gstRate,
        cgstRate,
        cgstAmount,
        sgstRate,
        sgstAmount,
        igstRate,
        igstAmount,
        cessAmount,
        totalTax: itemTotalTax,
        totalAmount: itemTotalAmount,
      };
    });

    const rawTotalTax = totalCGST + totalSGST + totalIGST + totalCESS;
    const rawGrandTotal = totalTaxableValue + rawTotalTax;
    const grandTotal = Math.round(rawGrandTotal);
    const roundOff = Number((grandTotal - rawGrandTotal).toFixed(2));

    return {
      isInterState,
      supplyStateCode,
      destinationStateCode,
      items: resultItems,
      subtotal: Number(subtotal.toFixed(2)),
      totalDiscount: Number(totalDiscount.toFixed(2)),
      totalTaxableValue: Number(totalTaxableValue.toFixed(2)),
      totalCGST: Number(totalCGST.toFixed(2)),
      totalSGST: Number(totalSGST.toFixed(2)),
      totalIGST: Number(totalIGST.toFixed(2)),
      totalCESS: Number(totalCESS.toFixed(2)),
      totalTax: Number(rawTotalTax.toFixed(2)),
      roundOff,
      grandTotal,
    };
  }

  async getGSTSummary() {
    const settings = await gstRepository.getSettings();
    return {
      gstin: settings.gstin,
      pan: settings.pan,
      businessName: settings.businessName,
      stateCode: settings.stateCode,
      monthlyCollected: 142850.5,
      monthlyLiability: 142850.5,
      inputTaxCredit: 34200.0,
      netTaxPayable: 108650.5,
      totalTransactions: 428,
    };
  }

  async generateReport(type: string = "GSTR-1") {
    const settings = await gstRepository.getSettings();
    return {
      reportType: type,
      financialYear: "2026-2027",
      gstin: settings.gstin,
      legalName: settings.businessName,
      totalOutwardTaxableSupplies: 845000.0,
      totalIGST: 45000.0,
      totalCGST: 72000.0,
      totalSGST: 72000.0,
      totalCess: 4800.0,
      generatedAt: new Date().toISOString(),
    };
  }

  async validateCode(payload: { gstin?: string; pan?: string; hsnCode?: string; stateCode?: string }) {
    const results: any = {};
    if (payload.gstin) results.gstinValid = GSTINRegex.test(payload.gstin);
    if (payload.pan) results.panValid = PANRegex.test(payload.pan);
    if (payload.hsnCode) results.hsnValid = HSNRegex.test(payload.hsnCode);
    if (payload.stateCode) results.stateCodeValid = payload.stateCode.length === 2 && !isNaN(Number(payload.stateCode));
    return results;
  }
}

export const gstService = new GSTService();
