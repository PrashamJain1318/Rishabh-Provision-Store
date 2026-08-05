import mongoose, { Schema, Document } from "mongoose";
import { ICart } from "./cart.types";

export interface ICartDocument extends Omit<ICart, "id">, Document {}

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId as any, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0 },
  gst: { type: Number, default: 0, min: 0 },
  lineTotal: { type: Number, required: true, min: 0 },
});

const cartSchema = new Schema<ICartDocument>(
  {
    customer: { type: Schema.Types.ObjectId as any, ref: "Customer", index: true },
    sessionId: { type: String, index: true },
    items: [cartItemSchema],
    couponCode: { type: String, uppercase: true, trim: true },
    discountTotal: { type: Number, default: 0, min: 0 },
    gstTotal: { type: Number, default: 0, min: 0 },
    grandTotal: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export const CartModel = mongoose.model<ICartDocument>("Cart", cartSchema);
export default CartModel;
