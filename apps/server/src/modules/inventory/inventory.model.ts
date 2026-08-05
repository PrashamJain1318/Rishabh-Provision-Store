import mongoose, { Schema, Document } from "mongoose";
import { IInventoryLog } from "./inventory.types";

export interface IInventoryLogDocument extends Omit<IInventoryLog, "id">, Document {}

const inventoryLogSchema = new Schema<IInventoryLogDocument>(
  {
    product: { type: Schema.Types.ObjectId as any, ref: "Product", required: true, index: true },
    type: {
      type: String,
      enum: ["Opening Stock", "Purchase", "Sale", "Damage", "Return", "Adjustment"],
      required: true,
      index: true,
    },
    quantity: { type: Number, required: true },
    previousStock: { type: Number, required: true },
    newStock: { type: Number, required: true },
    reason: { type: String, required: true, trim: true },
    performedBy: { type: Schema.Types.ObjectId as any, ref: "User" },
  },
  { timestamps: true }
);

export const InventoryLogModel = mongoose.model<IInventoryLogDocument>("InventoryLog", inventoryLogSchema);
export default InventoryLogModel;
