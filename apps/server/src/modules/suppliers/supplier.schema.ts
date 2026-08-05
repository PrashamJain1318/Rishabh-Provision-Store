import { z } from "zod";

export const createSupplierSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  gst: z
    .string()
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid 15-digit GSTIN number")
    .optional()
    .or(z.literal("")),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  outstandingBalance: z.number().default(0),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

export const updateSupplierSchema = createSupplierSchema.partial();

export const supplierQuerySchema = z.object({
  search: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).optional(),
});
