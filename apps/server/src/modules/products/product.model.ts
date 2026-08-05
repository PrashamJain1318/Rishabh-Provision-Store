import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./product.types";

export interface IProductDocument extends IProduct, Document {}

const productMongoSchema = new Schema<IProductDocument>(
  {
    code: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    unit: { type: String, required: true, default: "unit" },
    rating: { type: Number, default: 4.5 },
    image: { type: String },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<IProductDocument>("Product", productMongoSchema);
export default ProductModel;
