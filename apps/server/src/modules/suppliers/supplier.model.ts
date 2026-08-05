import mongoose, { Schema, Document } from "mongoose";
import { ISupplier } from "./supplier.types";

export interface ISupplierDocument extends Omit<ISupplier, "id">, Document {}

const supplierSchema = new Schema<ISupplierDocument>(
  {
    companyName: { type: String, required: true, trim: true, index: true },
    gst: { type: String, uppercase: true, trim: true, index: true },
    email: { type: String, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true },
    outstandingBalance: { type: Number, default: 0, min: 0 },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active", index: true },
    createdBy: { type: Schema.Types.ObjectId as any, ref: "User" },
  },
  { timestamps: true }
);

export const SupplierModel = mongoose.model<ISupplierDocument>("Supplier", supplierSchema);
export default SupplierModel;
