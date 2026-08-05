import { Request, Response } from "express";
import { productService } from "./product.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await productService.getAllProducts(req.query);
  return sendSuccess({
    res,
    message: "Product catalog list retrieved successfully",
    data: products,
  });
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  if (!product) {
    return sendError({ res, statusCode: 404, message: "Product not found" });
  }
  return sendSuccess({ res, message: "Product details retrieved successfully", data: product });
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.createProduct(req.body);
  return sendSuccess({
    res,
    statusCode: 201,
    message: "Product created successfully",
    data: product,
  });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await productService.updateProduct(id, req.body);
  if (!updated) {
    return sendError({ res, statusCode: 404, message: "Product not found for update" });
  }
  return sendSuccess({ res, message: "Product updated successfully", data: updated });
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await productService.deleteProduct(id);
  return sendSuccess({ res, message: "Product deleted successfully", data: {} });
});
