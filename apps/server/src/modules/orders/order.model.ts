import mongoose, { Schema, Document } from "mongoose";
import { IOrder } from "./order.types";

export interface IOrderDocument extends Omit<IOrder, "id">, Document {}

const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId as any, ref: "Product", required: true },
  productName: { type: String, required: true },
  sku: { type: String },
  image: { type: String },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0 },
  gst: { type: Number, default: 0 },
  lineTotal: { type: Number, required: true },
});

const orderTimelineSchema = new Schema({
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  note: { type: String },
  performedBy: { type: String },
});

const orderSchema = new Schema<IOrderDocument>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customer: { type: Schema.Types.ObjectId as any, ref: "Customer", required: true, index: true },
    items: [orderItemSchema],
    payment: {
      method: { type: String, required: true },
      status: { type: String, default: "Completed" },
      transactionId: { type: String },
      amount: { type: Number, required: true },
    },
    delivery: {
      address: { type: String, required: true },
      pincode: { type: String, required: true },
      latitude: { type: Number },
      longitude: { type: Number },
      deliverySlot: { type: String },
      driverName: { type: String },
      driverPhone: { type: String },
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Packed",
        "Ready",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
        "Returned",
        "Refunded",
      ],
      default: "Pending",
      index: true,
    },
    invoiceNumber: { type: String, index: true },
    timeline: [orderTimelineSchema],
    notes: { type: String },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<IOrderDocument>("Order", orderSchema);
export default OrderModel;
