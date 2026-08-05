import { Request, Response } from "express";
import { brandService } from "./brand.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const getBrands = asyncHandler(async (req: Request, res: Response) => {
  const { search, status } = req.query;
  const brands = await brandService.getAllBrands(search as string, status as string);
  return sendSuccess({
    res,
    message: "Brands fetched successfully",
    data: brands,
  });
});

export const getBrandById = asyncHandler(async (req: Request, res: Response) => {
  const brand = await brandService.getBrandById(req.params.id as string);
  if (!brand) return sendError({ res, statusCode: 404, message: "Brand not found" });
  return sendSuccess({
    res,
    message: "Brand retrieved successfully",
    data: brand,
  });
});

export const createBrand = asyncHandler(async (req: Request, res: Response) => {
  const brand = await brandService.createBrand(req.body, (req as any).user?.id);
  return sendSuccess({
    res,
    statusCode: 201,
    message: "Brand created successfully",
    data: brand,
  });
});

export const updateBrand = asyncHandler(async (req: Request, res: Response) => {
  const brand = await brandService.updateBrand(req.params.id as string, req.body);
  if (!brand) return sendError({ res, statusCode: 404, message: "Brand not found" });
  return sendSuccess({
    res,
    message: "Brand updated successfully",
    data: brand,
  });
});

export const deleteBrand = asyncHandler(async (req: Request, res: Response) => {
  const success = await brandService.deleteBrand(req.params.id as string);
  if (!success) return sendError({ res, statusCode: 404, message: "Brand not found" });
  return sendSuccess({
    res,
    message: "Brand deleted successfully",
    data: null,
  });
});
