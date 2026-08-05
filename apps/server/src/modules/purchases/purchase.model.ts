import mongoose, { Schema, Document } from "mongoose";
import { IPurchase } from "./purchase.types";

export interface IPurchaseDocument extends Omit<IPurchase, "id">, Document {}

const purchaseItemMongoSchema = new Schema({
  product: { type: Schema.Types.ObjectId as any, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  purchasePrice: { type: Number, required: true, min: 0 },
  sellingPrice: { type: Number },
  mrp: { type: Number },
  batchNumber: { type: String, required: true, trim: true },
  expiryDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
});

const purchaseSchema = new Schema<IPurchaseDocument>(
  {
    invoiceNumber: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    supplier: { type: Schema.Types.ObjectId as any, ref: "Supplier", required: true, index: true },
    items: [purchaseItemMongoSchema],
    subtotal: { type: Number, required: true },
    taxAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["Paid", "Pending", "Partial"], default: "Pending", index: true },
    notes: { type: String, trim: true },
    createdBy: { type: Schema.Types.ObjectId as any, ref: "User" },
  },
  { timestamps: true }
);

export const PurchaseModel = mongoose.model<IPurchaseDocument>("Purchase", purchaseSchema);
export default PurchaseModel;
