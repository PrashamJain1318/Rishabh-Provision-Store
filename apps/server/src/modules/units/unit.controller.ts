import { Request, Response } from "express";
import { unitService } from "./unit.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const getUnits = asyncHandler(async (req: Request, res: Response) => {
  const units = await unitService.getAllUnits();
  return sendSuccess({
    res,
    message: "Measurement units fetched successfully",
    data: units,
  });
});

export const getUnitById = asyncHandler(async (req: Request, res: Response) => {
  const unit = await unitService.getUnitById(req.params.id as string);
  if (!unit) return sendError({ res, statusCode: 404, message: "Unit not found" });
  return sendSuccess({
    res,
    message: "Unit retrieved successfully",
    data: unit,
  });
});

export const createUnit = asyncHandler(async (req: Request, res: Response) => {
  const unit = await unitService.createUnit(req.body);
  return sendSuccess({
    res,
    statusCode: 201,
    message: "Measurement unit created successfully",
    data: unit,
  });
});

export const updateUnit = asyncHandler(async (req: Request, res: Response) => {
  const unit = await unitService.updateUnit(req.params.id as string, req.body);
  if (!unit) return sendError({ res, statusCode: 404, message: "Unit not found" });
  return sendSuccess({
    res,
    message: "Unit updated successfully",
    data: unit,
  });
});

export const deleteUnit = asyncHandler(async (req: Request, res: Response) => {
  const success = await unitService.deleteUnit(req.params.id as string);
  if (!success) return sendError({ res, statusCode: 404, message: "Unit not found" });
  return sendSuccess({
    res,
    message: "Unit deleted successfully",
    data: null,
  });
});
