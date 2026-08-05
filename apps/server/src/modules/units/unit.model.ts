import mongoose, { Schema, Document } from "mongoose";
import { IUnit } from "./unit.types";

export interface IUnitDocument extends IUnit, Document {}

const unitSchema = new Schema<IUnitDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true, index: true },
    shortName: { type: String, required: true, trim: true },
    symbol: { type: String, required: true, trim: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active", index: true },
  },
  { timestamps: true }
);

export const UnitModel = mongoose.model<IUnitDocument>("Unit", unitSchema);
export default UnitModel;
