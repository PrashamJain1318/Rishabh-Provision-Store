export type PaymentStatus = "PENDING" | "AUTHORIZED" | "CAPTURED" | "FAILED" | "REFUNDED";

export interface IPayment {
  id?: string;
  orderId: string;
  paymentId?: string;
  receipt?: string;
  customerId?: string;
  userId?: string;
  amount: number; // In Paise or INR
  currency: string; // Default 'INR'
  status: PaymentStatus;
  paymentMethod?: string;
  razorpaySignature?: string;
  invoiceId?: string;
  failureReason?: string;
  refundId?: string;
  refundAmount?: number;
  refundReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateOrderInput {
  amount: number; // ₹ amount from client (e.g. 500)
  currency?: string;
  receipt?: string;
  customerId?: string;
  userId?: string;
}

export interface IVerifyPaymentInput {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  receipt?: string;
  customerId?: string;
  userId?: string;
  items?: any[];
}

export interface IRefundInput {
  paymentId: string;
  amount?: number;
  reason?: string;
}
