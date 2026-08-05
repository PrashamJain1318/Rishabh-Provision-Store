import { Request, Response } from "express";
import { inventoryService } from "./inventory.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const getInventoryLogs = asyncHandler(async (req: Request, res: Response) => {
  const logs = await inventoryService.getAllLogs(req.query);
  return sendSuccess({
    res,
    message: "Inventory movement audit trail logs retrieved successfully",
    data: logs,
  });
});

export const adjustStock = asyncHandler(async (req: Request, res: Response) => {
  const { product, type, quantity, reason } = req.body;

  if (!reason || reason.trim().length < 5) {
    return sendError({
      res,
      statusCode: 400,
      message: "Mandatory audit reason required. Stock should never be edited without recording a valid reason.",
    });
  }

  const log = await inventoryService.adjustStock(
    product,
    type,
    quantity,
    reason,
    (req as any).user?.id
  );

  return sendSuccess({
    res,
    statusCode: 201,
    message: "Stock adjustment recorded in audit ledger successfully",
    data: log,
  });
});
