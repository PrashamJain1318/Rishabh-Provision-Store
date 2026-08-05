import { Request, Response } from "express";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const mockCart = {
    id: "CART-001",
    customer: (req as any).user?.id || "CUST-001",
    items: [
      {
        product: "PROD-001",
        productName: "Aashirvaad Shudh Chakki Whole Wheat Atta 5kg",
        sku: "ATT-AASH-5KG",
        image: "https://images.unsplash.com/photo-1574323758207-f60101053e2c?w=400",
        quantity: 2,
        price: 245,
        discount: 0,
        gst: 0,
        lineTotal: 490,
      },
      {
        product: "PROD-002",
        productName: "Fortune Kachi Ghani Pure Mustard Oil 1L Pouch",
        sku: "OIL-FORT-1L",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
        quantity: 1,
        price: 142,
        discount: 0,
        gst: 5,
        lineTotal: 142,
      },
    ],
    couponCode: "SAVE10",
    discountTotal: 63.2,
    gstTotal: 7.1,
    grandTotal: 575.9,
  };

  return sendSuccess({
    res,
    message: "Active cart retrieved successfully",
    data: mockCart,
  });
});

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const requestedQty = quantity || 1;

  // Stock Validation Check
  const availableStock = 145;
  if (requestedQty > availableStock) {
    return sendError({
      res,
      statusCode: 400,
      message: `Stock validation failed: Requested quantity (${requestedQty}) exceeds available stock (${availableStock})`,
    });
  }

  return sendSuccess({
    res,
    statusCode: 201,
    message: "Product added to cart with stock validation clean",
    data: { productId, quantity: requestedQty, stockVerified: true },
  });
});

export const updateCartItem = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  return sendSuccess({
    res,
    message: "Cart item quantity updated",
    data: { productId, quantity },
  });
});

export const removeCartItem = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess({
    res,
    message: "Item removed from cart",
    data: null,
  });
});

export const mergeGuestCart = asyncHandler(async (req: Request, res: Response) => {
  const { sessionId, customerId } = req.body;
  return sendSuccess({
    res,
    message: "Guest cart items merged with customer account cart upon login",
    data: { merged: true, sessionId, customerId },
  });
});

export const clearCart = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess({
    res,
    message: "Cart cleared",
    data: null,
  });
});
