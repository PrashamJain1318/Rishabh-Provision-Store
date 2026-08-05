import { z } from "zod";

export const createUnitSchema = z.object({
  name: z.string().min(1, "Unit name is required"),
  shortName: z.string().min(1, "Short name is required"),
  symbol: z.string().min(1, "Symbol is required"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

export const updateUnitSchema = createUnitSchema.partial();
