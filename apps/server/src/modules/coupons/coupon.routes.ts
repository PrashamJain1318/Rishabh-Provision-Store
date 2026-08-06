import { Router } from "express";
import { getCoupons, createCoupon, validateCoupon } from "./coupon.controller";

const router = Router();

router.get("/", getCoupons);
router.post("/", createCoupon);
router.post("/validate", validateCoupon);

export default router;
