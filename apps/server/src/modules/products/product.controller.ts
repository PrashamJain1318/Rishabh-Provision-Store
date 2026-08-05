import { Request, Response } from "express";
import { productService } from "./product.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await productService.getAllProducts();
  return sendSuccess({
    res,
    message: "Product catalog retrieved successfully",
    data: products,
  });
});

export const getProductByCode = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.params;
  const item = await productService.getProductByCode(code);
  if (!item) {
    return sendError({
      res,
      statusCode: 404,
      message: "Product not found",
      errors: [],
    });
  }
  return sendSuccess({
    res,
    message: "Product retrieved successfully",
    data: item,
  });
});
