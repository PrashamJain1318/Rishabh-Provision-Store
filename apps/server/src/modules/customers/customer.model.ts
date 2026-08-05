import mongoose, { Schema, Document } from "mongoose";
import { ICustomer } from "./customer.types";

export interface ICustomerDocument extends Omit<ICustomer, "id">, Document {}

const customerSchema = new Schema<ICustomerDocument>(
  {
    customerCode: { type: String, required: true, unique: true, index: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true, sparse: true, index: true },
    phone: { type: String, required: true, unique: true, trim: true, index: true },
    avatar: { type: String, trim: true },
    dob: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    gstNumber: { type: String, uppercase: true, trim: true },
    walletBalance: { type: Number, default: 0, min: 0 },
    loyaltyPoints: { type: Number, default: 0, min: 0 },
    membershipLevel: {
      type: String,
      enum: ["Bronze", "Silver", "Gold", "Platinum"],
      default: "Bronze",
      index: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Blocked"],
      default: "Active",
      index: true,
    },
    lastPurchase: { type: Date },
    totalOrders: { type: Number, default: 0, min: 0 },
    totalSpent: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

customerSchema.index({ firstName: "text", lastName: "text", email: "text", phone: "text" });

export const CustomerModel = mongoose.model<ICustomerDocument>("Customer", customerSchema);
export default CustomerModel;
