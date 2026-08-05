import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
  icon: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

export const updateCategorySchema = createCategorySchema.partial();

export const categoryQuerySchema = z.object({
  search: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).optional(),
});
