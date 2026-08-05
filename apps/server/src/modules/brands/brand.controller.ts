import { Request, Response } from "express";
import { brandService } from "./brand.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const getBrands = asyncHandler(async (req: Request, res: Response) => {
  const { search, status } = req.query as { search?: string; status?: string };
  const brands = await brandService.getAllBrands(search, status);
  return sendSuccess({
    res,
    message: "Brands list retrieved successfully",
    data: brands,
  });
});

export const getBrandById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const brand = await brandService.getBrandById(id);
  if (!brand) {
    return sendError({ res, statusCode: 404, message: "Brand not found" });
  }
  return sendSuccess({ res, message: "Brand retrieved successfully", data: brand });
});

export const createBrand = asyncHandler(async (req: Request, res: Response) => {
  const brand = await brandService.createBrand(req.body);
  return sendSuccess({
    res,
    statusCode: 201,
    message: "Brand created successfully",
    data: brand,
  });
});

export const updateBrand = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await brandService.updateBrand(id, req.body);
  if (!updated) {
    return sendError({ res, statusCode: 404, message: "Brand not found for update" });
  }
  return sendSuccess({ res, message: "Brand updated successfully", data: updated });
});

export const deleteBrand = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await brandService.deleteBrand(id);
  return sendSuccess({ res, message: "Brand deleted successfully", data: {} });
});
