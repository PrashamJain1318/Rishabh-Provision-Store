import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./product.types";

export interface IProductDocument extends Omit<IProduct, "id">, Document {}

const productSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    sku: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    barcode: { type: String, trim: true, index: true },
    brand: { type: Schema.Types.Mixed, ref: "Brand", index: true },
    category: { type: Schema.Types.Mixed, ref: "Category", required: true, index: true },
    subcategory: { type: String, trim: true, index: true },
    supplier: { type: Schema.Types.Mixed, ref: "Supplier", index: true },
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
    cloudinaryPublicId: { type: String, trim: true },
    status: { type: String, enum: ["Active", "Inactive", "Out of Stock"], default: "Active", index: true },
    createdBy: { type: Schema.Types.Mixed, ref: "User" },
  },
  { timestamps: true }
);

productSchema.index(
  { name: "text", sku: "text", barcode: "text" },
  { weights: { name: 10, sku: 5, barcode: 5 }, name: "product_text_search_index" }
);

productSchema.index({ category: 1, brand: 1, status: 1 });
productSchema.index({ supplier: 1, status: 1 });

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
