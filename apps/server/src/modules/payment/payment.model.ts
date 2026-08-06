import mongoose, { Schema, Document } from "mongoose";
import { IPayment } from "./payment.types";

export interface IPaymentDocument extends Omit<IPayment, "id">, Document {}

const paymentSchema = new Schema<IPaymentDocument>(
  {
    orderId: { type: String, required: true, index: true },
    paymentId: { type: String, index: true },
    receipt: { type: String, index: true },
    customerId: { type: String, index: true },
    userId: { type: String, index: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: ["PENDING", "AUTHORIZED", "CAPTURED", "FAILED", "REFUNDED"],
      default: "PENDING",
      index: true,
    },
    paymentMethod: { type: String, default: "UPI" },
    razorpaySignature: { type: String },
    invoiceId: { type: String },
    failureReason: { type: String },
    refundId: { type: String },
    refundAmount: { type: Number },
    refundReason: { type: String },
  },
  { timestamps: true }
);

export const PaymentModel = mongoose.model<IPaymentDocument>("Payment", paymentSchema);
export default PaymentModel;
