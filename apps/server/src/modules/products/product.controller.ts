import { Request, Response } from "express";
import { productService } from "./product.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";
import cacheService from "../../services/cache.service";

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await productService.getAllProducts(req.query);
  return sendSuccess({
    res,
    message: "Products fetched successfully",
    data: products,
  });
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.getProductById(req.params.id as string);
  if (!product) return sendError({ res, statusCode: 404, message: "Product not found" });
  return sendSuccess({
    res,
    message: "Product retrieved successfully",
    data: product,
  });
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.createProduct({ ...req.body, createdBy: (req as any).user?.id });
  await cacheService.flushByPattern("products:*");
  return sendSuccess({
    res,
    statusCode: 201,
    message: "Product created successfully with generated barcode",
    data: product,
  });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.updateProduct(req.params.id as string, req.body);
  if (!product) return sendError({ res, statusCode: 404, message: "Product not found" });
  await cacheService.flushByPattern("products:*");
  return sendSuccess({
    res,
    message: "Product updated successfully",
    data: product,
  });
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const success = await productService.deleteProduct(req.params.id as string);
  if (!success) return sendError({ res, statusCode: 404, message: "Product not found" });
  await cacheService.flushByPattern("products:*");
  return sendSuccess({
    res,
    message: "Product deleted successfully",
    data: null,
  });
});
