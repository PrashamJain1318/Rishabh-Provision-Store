import mongoose, { Schema, Document } from "mongoose";
import { ICustomerAddress } from "./address.types";

export interface ICustomerAddressDocument extends Omit<ICustomerAddress, "id">, Document {}

const customerAddressSchema = new Schema<ICustomerAddressDocument>(
  {
    customer: { type: Schema.Types.ObjectId as any, ref: "Customer", required: true, index: true },
    type: { type: String, enum: ["Home", "Office", "Other"], default: "Home" },
    house: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
    landmark: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, default: "India", trim: true },
    pincode: { type: String, required: true, trim: true, index: true },
    latitude: { type: Number },
    longitude: { type: Number },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const CustomerAddressModel = mongoose.model<ICustomerAddressDocument>("CustomerAddress", customerAddressSchema);
export default CustomerAddressModel;
