import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "./category.types";

export interface ICategoryDocument extends ICategory, Document {}

const subcategoryMongoSchema = new Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, lowercase: true, trim: true },
  itemsCount: { type: Number, default: 0 },
});

const categorySchema = new Schema<ICategoryDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    image: { type: String, default: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=150" },
    icon: { type: String, default: "layers" },
    description: { type: String },
    parentCategoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    subcategories: [subcategoryMongoSchema],
    status: { type: String, enum: ["Active", "Inactive"], default: "Active", index: true },
  },
  { timestamps: true }
);

categorySchema.pre<ICategoryDocument>("save", function (next) {
  if (this.isModified("name") && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }
  next();
});

export const CategoryModel = mongoose.model<ICategoryDocument>("Category", categorySchema);
export default CategoryModel;
