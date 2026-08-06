import { Request, Response } from "express";
import { paymentService } from "./payment.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const createRazorpayOrder = asyncHandler(async (req: Request, res: Response) => {
  const { amount, currency, receipt, customerId } = req.body;
  
  if (!amount || typeof amount !== "number" || amount <= 0) {
    return sendError({ res, statusCode: 400, message: "Valid positive amount is required to create order." });
  }

  const userId = (req as any).user?.id;
  const result = await paymentService.createOrder({ amount, currency, receipt, customerId, userId });

  return sendSuccess({
    res,
    statusCode: 201,
    message: "Razorpay order created successfully",
    data: {
      orderId: result.orderId,
      amount: result.amount,
      currency: result.currency,
      keyId: result.keyId,
    },
  });
});

export const verifyPaymentSignature = asyncHandler(async (req: Request, res: Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, receipt, customerId, items } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return sendError({
      res,
      statusCode: 400,
      message: "Missing required Razorpay verification credentials (razorpay_order_id, razorpay_payment_id, razorpay_signature).",
    });
  }

  const userId = (req as any).user?.id;
  const verificationResult = await paymentService.verifyPayment({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    receipt,
    customerId,
    userId,
    items,
  });

  return sendSuccess({
    res,
    statusCode: 200,
    message: "Payment verified successfully",
    data: verificationResult,
  });
});

export const refundPayment = asyncHandler(async (req: Request, res: Response) => {
  const { paymentId, amount, reason } = req.body;

  if (!paymentId) {
    return sendError({ res, statusCode: 400, message: "Payment ID is required to process refund." });
  }

  const refundResult = await paymentService.refund({ paymentId, amount, reason });

  return sendSuccess({
    res,
    statusCode: 200,
    message: "Payment refund processed successfully via Razorpay",
    data: refundResult,
  });
});

export const getPaymentDetails = asyncHandler(async (req: Request, res: Response) => {
  const payment = await paymentService.getPaymentById(req.params.id as string);

  if (!payment) {
    return sendError({ res, statusCode: 404, message: "Payment transaction record not found." });
  }

  return sendSuccess({
    res,
    message: "Payment details retrieved successfully",
    data: payment,
  });
});

export const getPaymentHistoryList = asyncHandler(async (req: Request, res: Response) => {
  const history = await paymentService.getPaymentHistory(req.query);

  return sendSuccess({
    res,
    message: "Payment history retrieved successfully",
    data: history,
  });
});

export const handleRazorpayWebhook = asyncHandler(async (req: Request, res: Response) => {
  const signature = req.headers["x-razorpay-signature"] as string;
  await paymentService.handleWebhook(req.body, signature);

  return sendSuccess({
    res,
    message: "Razorpay webhook event processed successfully",
    data: { status: "OK" },
  });
});
