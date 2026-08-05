import { Request, Response } from "express";
import { sendSuccess, sendError } from "../../utils/response";

const mockCatalog = [
  { id: "PROD-001", code: "890103001001", name: "Aashirvaad Shuddh Chakki Atta (5kg)", category: "Atta & Flours", price: 245, mrp: 275, stock: 45 },
  { id: "PROD-002", code: "890103002002", name: "Fortune Sunlite Sunflower Oil (1L)", category: "Edible Oils", price: 135, mrp: 155, stock: 8 },
  { id: "PROD-003", code: "890103003003", name: "Amul Butter Pasteurized (500g)", category: "Dairy & Chilled", price: 275, mrp: 275, stock: 18 },
  { id: "PROD-004", code: "890103004004", name: "Tata Salt Vacuum Evaporated (1kg)", category: "Salt & Sugar", price: 28, mrp: 28, stock: 120 },
];

export const getProducts = (req: Request, res: Response) => {
  return sendSuccess({
    res,
    message: "Product catalog retrieved successfully",
    data: mockCatalog,
  });
};

export const getProductByCode = (req: Request, res: Response) => {
  const { code } = req.params;
  const item = mockCatalog.find((p) => p.code === code || p.id === code);
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
};
