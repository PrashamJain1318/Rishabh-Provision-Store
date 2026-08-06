import { Router } from "express";
import {
  createRazorpayOrder,
  verifyPaymentSignature,
  refundPayment,
  getPaymentDetails,
  getPaymentHistoryList,
  handleRazorpayWebhook,
} from "./payment.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import { createOrderSchema, verifyPaymentSchema, refundSchema } from "./payment.schema";

const router = Router();

router.post("/create-order", validateBody(createOrderSchema), createRazorpayOrder);
router.post("/verify", validateBody(verifyPaymentSchema), verifyPaymentSignature);
router.post("/refund", validateBody(refundSchema), refundPayment);
router.post("/webhook", handleRazorpayWebhook);
router.get("/history", getPaymentHistoryList);
router.get("/:id", getPaymentDetails);

export default router;
