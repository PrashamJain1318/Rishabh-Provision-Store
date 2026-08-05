import mongoose, { Schema, Document } from "mongoose";
import { IDeliveryDriver } from "./delivery.types";

export interface IDeliveryDriverDocument extends Omit<IDeliveryDriver, "id">, Document {}

const deliveryDriverSchema = new Schema<IDeliveryDriverDocument>(
  {
    driverCode: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true, index: true },
    vehicle: { type: String, required: true, trim: true },
    currentOrders: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: ["Available", "Busy", "Offline"],
      default: "Available",
      index: true,
    },
    currentLocation: { type: String, default: "Store Hub #1", trim: true },
  },
  { timestamps: true }
);

export const DeliveryDriverModel = mongoose.model<IDeliveryDriverDocument>("DeliveryDriver", deliveryDriverSchema);
export default DeliveryDriverModel;
