import { Request, Response } from "express";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

const mockCoupons = [
  {
    code: "SAVE10",
    type: "Percentage",
    discountValue: 10,
    maxDiscount: 200,
    minOrderValue: 499,
    expiryDate: "2026-12-31",
    usageLimit: 1000,
    usedCount: 142,
    applicableCategories: ["Atta & Flours", "Edible Oils", "Spices & Masalas"],
    description: "10% OFF on Grocery essentials above ₹499",
  },
  {
    code: "FLAT50",
    type: "Flat Discount",
    discountValue: 50,
    minOrderValue: 299,
    expiryDate: "2026-12-31",
    usageLimit: 500,
    usedCount: 89,
    applicableCategories: ["All"],
    description: "Flat ₹50 OFF on orders above ₹299",
  },
  {
    code: "BUY2GET1",
    type: "Buy X Get Y",
    discountValue: 100,
    minOrderValue: 300,
    expiryDate: "2026-12-31",
    usageLimit: 200,
    usedCount: 45,
    applicableCategories: ["Snacks & Munchies", "Dairy & Bakery"],
    description: "Buy 2 Get 1 Free on Snacks & Beverages",
  },
  {
    code: "WELCOME100",
    type: "First Order",
    discountValue: 100,
    minOrderValue: 399,
    expiryDate: "2026-12-31",
    usageLimit: 1,
    usedCount: 0,
    applicableCategories: ["All"],
    description: "₹100 OFF on your first grocery purchase",
  },
  {
    code: "DIWALI20",
    type: "Festival Offers",
    discountValue: 20,
    maxDiscount: 500,
    minOrderValue: 999,
    expiryDate: "2026-11-15",
    usageLimit: 2000,
    usedCount: 120,
    applicableCategories: ["Dry Fruits & Sweets", "Pooja Needs"],
    description: "Diwali Special 20% OFF on Sweets & Dry Fruits",
  },
];

export const getCoupons = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess({
    res,
    message: "Active promotional coupons fetched successfully",
    data: mockCoupons,
  });
});

export const createCoupon = asyncHandler(async (req: Request, res: Response) => {
  const newCoupon = {
    code: (req.body.code || "FESTIVAL10").toUpperCase(),
    type: req.body.type || "Percentage",
    discountValue: req.body.discountValue || 10,
    minOrderValue: req.body.minOrderValue || 499,
    expiryDate: req.body.expiryDate || "2026-12-31",
    usageLimit: req.body.usageLimit || 500,
    usedCount: 0,
    applicableCategories: req.body.applicableCategories || ["All"],
    description: req.body.description || "Special promotional offer",
  };

  mockCoupons.push(newCoupon);
  return sendSuccess({
    res,
    statusCode: 201,
    message: "Coupon created successfully",
    data: newCoupon,
  });
});

export const validateCoupon = asyncHandler(async (req: Request, res: Response) => {
  const { code, cartTotal } = req.body;
  const coupon = mockCoupons.find((c) => c.code.toUpperCase() === (code || "").toUpperCase());

  if (!coupon) {
    return sendError({ res, statusCode: 404, message: "Invalid coupon code" });
  }

  const currentCartTotal = cartTotal || 599;
  if (currentCartTotal < coupon.minOrderValue) {
    return sendError({
      res,
      statusCode: 400,
      message: `Minimum order value of ₹${coupon.minOrderValue} required for coupon ${coupon.code}`,
    });
  }

  let discountAmount = 0;
  if (coupon.type === "Percentage" || coupon.type === "Festival Offers") {
    discountAmount = (currentCartTotal * coupon.discountValue) / 100;
    if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
      discountAmount = coupon.maxDiscount;
    }
  } else {
    discountAmount = coupon.discountValue;
  }

  return sendSuccess({
    res,
    message: `Coupon ${coupon.code} applied successfully! You saved ₹${discountAmount.toFixed(2)}`,
    data: {
      code: coupon.code,
      type: coupon.type,
      discountAmount,
      finalTotal: currentCartTotal - discountAmount,
    },
  });
});
