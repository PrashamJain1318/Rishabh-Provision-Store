import { z } from "zod";

export const createOrderSchema = z.object({
  amount: z.number().positive("Amount must be greater than zero"),
  currency: z.string().optional().default("INR"),
  receipt: z.string().optional(),
  customerId: z.string().optional(),
});

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1, "Razorpay Order ID is required"),
  razorpay_payment_id: z.string().min(1, "Razorpay Payment ID is required"),
  razorpay_signature: z.string().min(1, "Razorpay Signature is required"),
  receipt: z.string().optional(),
  customerId: z.string().optional(),
  items: z.array(z.any()).optional(),
});

export const refundSchema = z.object({
  paymentId: z.string().min(1, "Payment ID is required"),
  amount: z.number().positive().optional(),
  reason: z.string().optional(),
});
