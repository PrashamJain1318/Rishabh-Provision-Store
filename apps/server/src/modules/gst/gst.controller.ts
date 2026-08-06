import { Request, Response } from "express";
import { gstService } from "./gst.service";
import { updateGSTSettingsSchema, calculateGSTSchema, validateGSTSchema } from "./gst.schema";
import { sendSuccess } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const getGSTSettings = asyncHandler(async (req: Request, res: Response) => {
  const settings = await gstService.getSettings();
  return sendSuccess({
    res,
    message: "GST Settings retrieved successfully",
    data: settings,
  });
});

export const updateGSTSettings = asyncHandler(async (req: Request, res: Response) => {
  const validated = updateGSTSettingsSchema.parse(req.body);
  const updated = await gstService.updateSettings(validated);
  return sendSuccess({
    res,
    message: "GST Settings updated successfully",
    data: updated,
  });
});

export const calculateTax = asyncHandler(async (req: Request, res: Response) => {
  const validated = calculateGSTSchema.parse(req.body);
  const result = await gstService.calculateTax(validated.destinationStateCode, validated.items as any);
  return sendSuccess({
    res,
    message: "GST Tax calculation completed successfully",
    data: result,
  });
});

export const getGSTSummary = asyncHandler(async (req: Request, res: Response) => {
  const summary = await gstService.getGSTSummary();
  return sendSuccess({
    res,
    message: "GST Tax Summary retrieved successfully",
    data: summary,
  });
});

export const getGSTReport = asyncHandler(async (req: Request, res: Response) => {
  const reportType = String(req.query.type || "GSTR-1");
  const report = await gstService.generateReport(reportType);
  return sendSuccess({
    res,
    message: `${reportType} report generated successfully`,
    data: report,
  });
});

export const validateGST = asyncHandler(async (req: Request, res: Response) => {
  const validated = validateGSTSchema.parse(req.body);
  const result = await gstService.validateCode(validated);
  return sendSuccess({
    res,
    message: "GST Code validation processed",
    data: result,
  });
});

export const getGSTInvoice = asyncHandler(async (req: Request, res: Response) => {
  const invoiceId = req.params.id;
  const settings = await gstService.getSettings();
  return sendSuccess({
    res,
    message: `GST Invoice ${invoiceId} generated`,
    data: {
      invoiceNumber: `${settings.invoicePrefix}${invoiceId}`,
      date: new Date().toISOString(),
      storeGstin: settings.gstin,
      businessName: settings.businessName,
      address: settings.address,
      stateCode: settings.stateCode,
      placeOfSupply: settings.placeOfSupply,
      items: [
        { productName: "Fortune Sunlite Refined Oil 1L", hsnCode: "1512", qty: 2, price: 160, taxable: 320, cgst: 8, sgst: 8, total: 336 },
        { productName: "Aashirvaad Shuddh Chakki Atta 5kg", hsnCode: "1101", qty: 1, price: 280, taxable: 280, cgst: 0, sgst: 0, total: 280 },
      ],
      subtotal: 600,
      totalTaxable: 600,
      totalCGST: 8,
      totalSGST: 8,
      totalIGST: 0,
      grandTotal: 616,
    },
  });
});
