import mongoose, { Schema, Document } from "mongoose";
import { ISupplier } from "./supplier.types";

export interface ISupplierDocument extends ISupplier, Document {}

const supplierSchema = new Schema<ISupplierDocument>(
  {
    companyName: { type: String, required: true, trim: true, index: true },
    gst: { type: String, trim: true, index: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true, index: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true, index: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true },
    outstandingBalance: { type: Number, default: 0 },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active", index: true },
    isDeleted: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

export const SupplierModel = mongoose.model<ISupplierDocument>("Supplier", supplierSchema);
export default SupplierModel;
