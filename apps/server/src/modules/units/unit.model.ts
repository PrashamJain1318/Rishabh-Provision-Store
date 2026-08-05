import mongoose, { Schema, Document } from "mongoose";
import { IUnit } from "./unit.types";

export interface IUnitDocument extends Omit<IUnit, "id">, Document {}

const unitSchema = new Schema<IUnitDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true, index: true },
    shortName: { type: String, required: true, uppercase: true, trim: true, index: true },
    symbol: { type: String, required: true, trim: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active", index: true },
  },
  { timestamps: true }
);

export const UnitModel = mongoose.model<IUnitDocument>("Unit", unitSchema);
export default UnitModel;
