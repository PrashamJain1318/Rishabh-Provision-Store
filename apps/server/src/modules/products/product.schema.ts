import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  sku: z.string().min(1, "SKU code is required"),
  barcode: z.string().optional(),
  brand: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().optional(),
  supplier: z.string().optional(),
  unit: z.string().min(1, "Unit of measurement is required"),
  description: z.string().optional(),
  purchasePrice: z.number().min(0, "Purchase price must be positive"),
  sellingPrice: z.number().min(0, "Selling price must be positive"),
  mrp: z.number().min(0, "MRP must be positive"),
  discount: z.number().min(0).max(100).optional().default(0),
  gst: z.number().min(0).max(28).default(0),
  stock: z.number().min(0, "Stock cannot be negative").default(0),
  minimumStock: z.number().min(0).default(5),
  maximumStock: z.number().min(1).default(500),
  expiryDate: z.string().optional(),
  batchNumber: z.string().optional(),
  images: z.array(z.string().url()).optional().default([]),
  status: z.enum(["Active", "Inactive", "Out of Stock"]).default("Active"),
});

export const updateProductSchema = createProductSchema.partial();

export const productQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  supplier: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  stockStatus: z.enum(["All", "in_stock", "low_stock", "out_of_stock"]).optional(),
  status: z.enum(["All", "Active", "Inactive", "Out of Stock"]).optional(),
  expiryStatus: z.enum(["All", "near_expiry", "expired", "fresh"]).optional(),
  gst: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});
