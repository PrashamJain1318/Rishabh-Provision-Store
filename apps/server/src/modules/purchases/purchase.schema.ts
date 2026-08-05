import { z } from "zod";

export const purchaseItemSchema = z.object({
  product: z.string().min(1, "Product is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  purchasePrice: z.number().min(0, "Purchase price must be non-negative"),
  sellingPrice: z.number().min(0).optional(),
  mrp: z.number().min(0).optional(),
  batchNumber: z.string().min(1, "Batch number is required for inward stock tracking"),
  expiryDate: z.string().min(1, "Expiry date is required for batch tracking"),
});

export const createPurchaseSchema = z.object({
  supplier: z.string().min(1, "Supplier selection is required"),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  items: z.array(purchaseItemSchema).min(1, "At least one product item is required"),
  taxAmount: z.number().min(0).default(0),
  paymentStatus: z.enum(["Paid", "Pending", "Partial"]).default("Pending"),
  notes: z.string().optional(),
});

export const purchaseQuerySchema = z.object({
  search: z.string().optional(),
  supplier: z.string().optional(),
  paymentStatus: z.enum(["Paid", "Pending", "Partial"]).optional(),
});
