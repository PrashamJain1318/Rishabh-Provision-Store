import { Request, Response } from "express";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

const LOYALTY_TIERS = [
  {
    level: "Bronze",
    minSpend: 0,
    pointMultiplier: 1.0,
    benefits: ["Earn 1 Point per ₹100 spent", "Standard delivery"],
  },
  {
    level: "Silver",
    minSpend: 10000,
    pointMultiplier: 1.25,
    benefits: ["Earn 1.25 Points per ₹100 spent", "₹50 discount on orders above ₹500"],
  },
  {
    level: "Gold",
    minSpend: 25000,
    pointMultiplier: 1.5,
    benefits: ["Earn 1.5 Points per ₹100 spent", "Free Standard Delivery on all orders", "5% Extra Member Discount"],
  },
  {
    level: "Platinum",
    minSpend: 50000,
    pointMultiplier: 2.0,
    benefits: ["Earn 2.0 Points per ₹100 spent", "Free Express 10-Min Delivery", "10% VIP Discount", "Early Flash Sale Access"],
  },
];

export const getLoyaltyTiers = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess({
    res,
    message: "Loyalty tiers and membership benefits fetched successfully",
    data: LOYALTY_TIERS,
  });
});

export const earnLoyaltyPoints = asyncHandler(async (req: Request, res: Response) => {
  const { customerId, orderAmount, currentTier } = req.body;
  const amount = orderAmount || 1000;
  const tier = LOYALTY_TIERS.find((t) => t.level === currentTier) || LOYALTY_TIERS[0];

  const basePoints = Math.floor(amount / 100);
  const earnedPoints = Math.round(basePoints * tier.pointMultiplier);

  return sendSuccess({
    res,
    statusCode: 200,
    message: `Earned ${earnedPoints} loyalty points on ₹${amount} purchase!`,
    data: {
      customerId: customerId || "CUST-001",
      orderAmount: amount,
      tier: tier.level,
      multiplier: tier.pointMultiplier,
      earnedPoints,
    },
  });
});

export const redeemLoyaltyPoints = asyncHandler(async (req: Request, res: Response) => {
  const { customerId, pointsToRedeem } = req.body;
  const points = pointsToRedeem || 100;
  const cashValue = points; // 1 Point = ₹1.00

  return sendSuccess({
    res,
    statusCode: 200,
    message: `Redeemed ${points} points for ₹${cashValue} store wallet balance!`,
    data: {
      customerId: customerId || "CUST-001",
      pointsRedeemed: points,
      walletCredited: cashValue,
    },
  });
});
