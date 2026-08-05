import { z } from "zod";

export const createCustomerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  dob: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  gstNumber: z
    .string()
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format")
    .optional()
    .or(z.literal("")),
  membershipLevel: z.enum(["Bronze", "Silver", "Gold", "Platinum"]).default("Bronze"),
});

export const updateCustomerSchema = createCustomerSchema.partial().extend({
  status: z.enum(["Active", "Inactive", "Blocked"]).optional(),
  walletBalance: z.number().min(0).optional(),
  loyaltyPoints: z.number().min(0).optional(),
});

export const customerQuerySchema = z.object({
  search: z.string().optional(),
  membershipLevel: z.enum(["Bronze", "Silver", "Gold", "Platinum"]).optional(),
  status: z.enum(["Active", "Inactive", "Blocked"]).optional(),
});
