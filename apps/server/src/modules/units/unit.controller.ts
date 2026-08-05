import { Request, Response } from "express";
import { unitService } from "./unit.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const getUnits = asyncHandler(async (req: Request, res: Response) => {
  const units = await unitService.getAllUnits();
  return sendSuccess({
    res,
    message: "Units list retrieved successfully",
    data: units,
  });
});

export const getUnitById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const unit = await unitService.getUnitById(id);
  if (!unit) {
    return sendError({ res, statusCode: 404, message: "Unit not found" });
  }
  return sendSuccess({ res, message: "Unit retrieved successfully", data: unit });
});

export const createUnit = asyncHandler(async (req: Request, res: Response) => {
  const unit = await unitService.createUnit(req.body);
  return sendSuccess({
    res,
    statusCode: 201,
    message: "Unit created successfully",
    data: unit,
  });
});

export const updateUnit = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await unitService.updateUnit(id, req.body);
  if (!updated) {
    return sendError({ res, statusCode: 404, message: "Unit not found for update" });
  }
  return sendSuccess({ res, message: "Unit updated successfully", data: updated });
});

export const deleteUnit = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await unitService.deleteUnit(id);
  return sendSuccess({ res, message: "Unit deleted successfully", data: {} });
});
