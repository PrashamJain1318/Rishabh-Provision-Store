import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "./category.types";

export interface ICategoryDocument extends Omit<ICategory, "id">, Document {}

const subcategorySchema = new Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, lowercase: true, trim: true },
  itemsCount: { type: Number, default: 0 },
});

const categorySchema = new Schema<ICategoryDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    image: { type: String, trim: true },
    icon: { type: String, trim: true },
    description: { type: String, trim: true },
    parentCategoryId: { type: Schema.Types.ObjectId as any, ref: "Category" },
    subcategories: [subcategorySchema],
    status: { type: String, enum: ["Active", "Inactive"], default: "Active", index: true },
    itemsCount: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId as any, ref: "User" },
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
