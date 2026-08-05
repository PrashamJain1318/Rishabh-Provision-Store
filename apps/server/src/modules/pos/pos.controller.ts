import { Request, Response } from "express";
import { sendSuccess } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const handleCartAction = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess({ res, message: "Cart item updated", data: req.body });
});

export const handleCheckout = asyncHandler(async (req: Request, res: Response) => {
  const billNo = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  return sendSuccess({
    res,
    statusCode: 201,
    message: "Checkout successful",
    data: { billNo, total: req.body.total || 394, status: "PAID" },
  });
});

export const handlePayment = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess({ res, message: "Payment processed successfully", data: { transactionId: `TXN-${Date.now()}`, ...req.body } });
});

export const handleHoldBill = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess({ res, message: "Bill parked on hold successfully", data: { holdId: `HOLD-${Date.now()}` } });
});

export const handleResumeBill = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess({ res, message: "Held bill resumed", data: { holdId: req.body.holdId } });
});

export const handleRefund = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess({ res, message: "Refund issued successfully", data: { refundId: `REF-${Date.now()}`, amount: req.body.amount || 245 } });
});

export const getInvoices = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess({
    res,
    message: "Invoices fetched successfully",
    data: [
      { id: "INV-2026-9821", date: new Date().toISOString(), customer: "Ramesh Kumar", total: 394, status: "PAID" },
      { id: "INV-2026-4412", date: new Date().toISOString(), customer: "Sita Sharma", total: 275, status: "PAID" },
    ],
  });
});

export const getInvoiceById = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess({
    res,
    message: "Invoice retrieved successfully",
    data: { id: req.params.id, date: new Date().toISOString(), customer: "Ramesh Kumar", total: 394, status: "PAID" },
  });
});
