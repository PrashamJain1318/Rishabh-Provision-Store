import { z } from "zod";

export const productSchema = z.object({
  code: z.string().min(1, "Product SKU / Barcode is required"),
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().positive("Selling price must be greater than zero"),
  mrp: z.number().positive("MRP must be greater than zero"),
  stock: z.number().int().min(0, "Stock quantity cannot be negative"),
  unit: z.string().default("unit"),
});

export const productQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});
