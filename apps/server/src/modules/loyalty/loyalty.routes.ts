import { Router } from "express";
import {
  getLoyaltyTiers,
  earnLoyaltyPoints,
  redeemLoyaltyPoints,
} from "./loyalty.controller";

const router = Router();

router.get("/tiers", getLoyaltyTiers);
router.post("/earn", earnLoyaltyPoints);
router.post("/redeem", redeemLoyaltyPoints);

export default router;
