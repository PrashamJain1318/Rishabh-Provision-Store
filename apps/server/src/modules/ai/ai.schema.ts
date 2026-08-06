import { z } from "zod";

export const aiQuerySchema = z.object({
  prompt: z.string().min(2, "Prompt must be at least 2 characters long"),
  context: z.string().optional(),
});

export const inventoryAdviceSchema = z.object({
  category: z.string().optional(),
  includeDeadStock: z.boolean().optional().default(true),
});

export const salesForecastSchema = z.object({
  days: z.number().optional().default(30),
  category: z.string().optional(),
});
