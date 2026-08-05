import { Request, Response } from "express";
import { purchaseService } from "./purchase.service";
import { sendSuccess } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const getPurchases = asyncHandler(async (req: Request, res: Response) => {
  const purchases = await purchaseService.getAllPurchases(req.query);
  return sendSuccess({
    res,
    message: "Purchase order inward history retrieved successfully",
    data: purchases,
  });
});

export const createPurchase = asyncHandler(async (req: Request, res: Response) => {
  const purchase = await purchaseService.createPurchase(req.body, (req as any).user?.id);
  return sendSuccess({
    res,
    statusCode: 201,
    message: "Purchase invoice processed successfully. Inventory stock, batch numbers, and expiry dates updated automatically.",
    data: purchase,
  });
});
