import { Router } from "express";
import {
  handleCartAction,
  handleCheckout,
  handlePayment,
  handleHoldBill,
  handleResumeBill,
  handleRefund,
  getInvoices,
  getInvoiceById,
} from "./pos.controller";

const router = Router();

router.post("/cart", handleCartAction);
router.post("/checkout", handleCheckout);
router.post("/payment", handlePayment);
router.post("/hold", handleHoldBill);
router.post("/resume", handleResumeBill);
router.post("/refund", handleRefund);

export default router;
