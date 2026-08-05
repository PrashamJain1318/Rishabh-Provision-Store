import { z } from "zod";

export const createSupplierSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  ownerName: z.string().optional(),
  gst: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format").optional().or(z.literal("")),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format").optional().or(z.literal("")),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  address: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),
  outstandingBalance: z.number().min(0).default(0),
  creditLimit: z.number().min(0).default(500000),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

export const updateSupplierSchema = createSupplierSchema.partial();
