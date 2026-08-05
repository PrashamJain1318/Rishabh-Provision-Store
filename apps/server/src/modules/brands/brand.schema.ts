import { z } from "zod";

export const createBrandSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
  logo: z.string().url("Invalid logo URL").optional().or(z.literal("")),
  description: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

export const updateBrandSchema = createBrandSchema.partial();

export const brandQuerySchema = z.object({
  search: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).optional(),
});
