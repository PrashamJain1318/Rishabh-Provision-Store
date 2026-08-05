import { Request, Response } from "express";
import { categoryService } from "./category.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const { search, status } = req.query as { search?: string; status?: string };
  const categories = await categoryService.getAllCategories(search, status);
  return sendSuccess({
    res,
    message: "Category taxonomy retrieved successfully",
    data: categories,
  });
});

export const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await categoryService.getCategoryById(id);
  if (!category) {
    return sendError({ res, statusCode: 404, message: "Category not found" });
  }
  return sendSuccess({ res, message: "Category retrieved successfully", data: category });
});

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await categoryService.createCategory(req.body);
  return sendSuccess({
    res,
    statusCode: 201,
    message: "Category created successfully",
    data: category,
  });
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await categoryService.updateCategory(id, req.body);
  if (!updated) {
    return sendError({ res, statusCode: 404, message: "Category not found for update" });
  }
  return sendSuccess({ res, message: "Category updated successfully", data: updated });
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await categoryService.deleteCategory(id);
  return sendSuccess({ res, message: "Category deleted successfully", data: {} });
});
