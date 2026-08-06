import { Request, Response } from "express";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

const mockWishlist = [
  {
    product: "PROD-001",
    productName: "Aashirvaad Shudh Chakki Whole Wheat Atta 5kg",
    sku: "ATT-AASH-5KG",
    price: 245,
    image: "https://images.unsplash.com/photo-1574323758207-f60101053e2c?w=400",
    inStock: true,
    addedAt: new Date().toISOString(),
  },
  {
    product: "PROD-003",
    productName: "Amul Pasteurised Cow Butter 500g Pack",
    sku: "BUT-AMUL-500G",
    price: 275,
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400",
    inStock: true,
    addedAt: new Date().toISOString(),
  },
];

export const getWishlist = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess({
    res,
    message: "Wishlist items fetched successfully",
    data: {
      customerId: (req as any).user?.id || "CUST-001",
      shareToken: "WISH-SHARE-9821-X",
      items: mockWishlist,
    },
  });
});

export const addToWishlist = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.body;
  return sendSuccess({
    res,
    statusCode: 201,
    message: "Product added to wishlist",
    data: { productId, added: true },
  });
});

export const removeFromWishlist = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;
  return sendSuccess({
    res,
    message: "Product removed from wishlist",
    data: { productId, removed: true },
  });
});

export const moveToCart = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.body;
  return sendSuccess({
    res,
    message: "Product moved from wishlist to active shopping cart!",
    data: { productId, movedToCart: true, removedFromWishlist: true },
  });
});

export const getSharedWishlist = asyncHandler(async (req: Request, res: Response) => {
  const { shareToken } = req.params;
  return sendSuccess({
    res,
    message: `Shared wishlist loaded for token ${shareToken}`,
    data: {
      ownerName: "Ramesh Kumar",
      shareToken,
      items: mockWishlist,
    },
  });
});
