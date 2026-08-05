import { Request, Response } from "express";
import { sendSuccess } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const generateBarcode = asyncHandler(async (req: Request, res: Response) => {
  const { value, type, productName, price } = req.body;
  return sendSuccess({
    res,
    message: "Barcode generated successfully",
    data: {
      value: value || "8901058000123",
      type: type || "EAN13",
      productName: productName || "Sample Product",
      price: price || 245,
      barcodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(value || "8901058000123")}`,
    },
  });
});

export const printBulkBarcodes = asyncHandler(async (req: Request, res: Response) => {
  const { barcodes, format } = req.body;
  return sendSuccess({
    res,
    message: `Bulk printable ${format || "PDF"} sheet generated for ${barcodes?.length || 1} items`,
    data: {
      downloadUrl: "http://localhost:5001/api/v1/barcode/download-sheet.pdf",
      totalLabels: barcodes?.length || 1,
    },
  });
});
