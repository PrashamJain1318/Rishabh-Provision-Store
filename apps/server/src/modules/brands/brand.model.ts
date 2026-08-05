import mongoose, { Schema, Document } from "mongoose";
import { IBrand } from "./brand.types";

export interface IBrandDocument extends Omit<IBrand, "id">, Document {}

const brandSchema = new Schema<IBrandDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    logo: { type: String, trim: true },
    description: { type: String, trim: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active", index: true },
    productsCount: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId as any, ref: "User" },
  },
  { timestamps: true }
);

brandSchema.pre<IBrandDocument>("save", function (next) {
  if (this.isModified("name") && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }
  next();
});

export const BrandModel = mongoose.model<IBrandDocument>("Brand", brandSchema);
export default BrandModel;
