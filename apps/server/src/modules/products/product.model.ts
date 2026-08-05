import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./product.types";

export interface IProductDocument extends IProduct, Document {}

const productSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    sku: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    barcode: { type: String, trim: true, index: true },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true, index: true },
    subcategory: { type: String, trim: true },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier" },
    unit: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    purchasePrice: { type: Number, required: true, min: 0 },
    sellingPrice: { type: Number, required: true, min: 0 },
    mrp: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    gst: { type: Number, required: true, default: 0, enum: [0, 5, 12, 18, 28] },
    stock: { type: Number, required: true, default: 0, min: 0 },
    minimumStock: { type: Number, default: 5, min: 0 },
    maximumStock: { type: Number, default: 500, min: 1 },
    expiryDate: { type: Date },
    batchNumber: { type: String, trim: true },
    images: [{ type: String }],
    status: { type: String, enum: ["Active", "Inactive", "Out of Stock"], default: "Active", index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

productSchema.pre<IProductDocument>("save", function (next) {
  if (this.isModified("name") && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }
  if (this.stock === 0) {
    this.status = "Out of Stock";
  }
  next();
});

export const ProductModel = mongoose.model<IProductDocument>("Product", productSchema);
export default ProductModel;
