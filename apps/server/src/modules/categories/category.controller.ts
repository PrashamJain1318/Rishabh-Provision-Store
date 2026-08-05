import { Request, Response } from "express";
import { categoryService } from "./category.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const { search, status } = req.query;
  const categories = await categoryService.getAllCategories(search as string, status as string);
  return sendSuccess({
    res,
    message: "Categories fetched successfully",
    data: categories,
  });
});

export const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const category = await categoryService.getCategoryById(req.params.id as string);
  if (!category) return sendError({ res, statusCode: 404, message: "Category not found" });
  return sendSuccess({
    res,
    message: "Category retrieved successfully",
    data: category,
  });
});

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await categoryService.createCategory(req.body, (req as any).user?.id);
  return sendSuccess({
    res,
    statusCode: 201,
    message: "Category created successfully",
    data: category,
  });
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await categoryService.updateCategory(req.params.id as string, req.body);
  if (!category) return sendError({ res, statusCode: 404, message: "Category not found" });
  return sendSuccess({
    res,
    message: "Category updated successfully",
    data: category,
  });
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const success = await categoryService.deleteCategory(req.params.id as string);
  if (!success) return sendError({ res, statusCode: 404, message: "Category not found" });
  return sendSuccess({
    res,
    message: "Category deleted successfully",
    data: null,
  });
});
