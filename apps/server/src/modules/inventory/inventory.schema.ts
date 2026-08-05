import { z } from "zod";

export const stockAdjustmentSchema = z.object({
  product: z.string().min(1, "Product selection is required"),
  type: z.enum([
    "Opening Stock",
    "Purchase",
    "Sale",
    "Damage",
    "Return",
    "Adjustment",
  ]),
  quantity: z.number().refine((val) => val !== 0, "Quantity change cannot be 0"),
  reason: z.string().min(5, "Mandatory audit reason must be at least 5 characters long"),
});

export const inventoryLogQuerySchema = z.object({
  search: z.string().optional(),
  type: z.enum([
    "Opening Stock",
    "Purchase",
    "Sale",
    "Damage",
    "Return",
    "Adjustment",
  ]).optional(),
  product: z.string().optional(),
});
