import { z } from "zod";

export const getProductParamSchema = z.object({
  code: z.string().min(1, "Product code or ID is required"),
});

export const getProductsQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});
