import { z } from "zod";

export const stockAdjustmentSchema = z.object({
  product: z.string().min(1, "Product is required"),
  type: z.enum(["Opening", "Purchase", "Sale", "Return", "Damage", "Adjustment", "Transfer"]),
  quantity: z.number().refine((val) => val !== 0, "Quantity change cannot be zero"),
  reason: z
    .string()
    .min(5, "⚠️ Mandatory Audit Rule: A detailed reason (min 5 chars) must be recorded for any stock change."),
});

export const inventoryLogQuerySchema = z.object({
  product: z.string().optional(),
  type: z.enum(["Opening", "Purchase", "Sale", "Return", "Damage", "Adjustment", "Transfer"]).optional(),
  search: z.string().optional(),
});
