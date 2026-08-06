import { z } from "zod";

export const GSTINRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
export const PANRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
export const HSNRegex = /^[0-9]{4,8}$/;

export const updateGSTSettingsSchema = z.object({
  gstin: z.string().regex(GSTINRegex, "Invalid 15-character GSTIN format (e.g. 27AAAAA0000A1Z5)"),
  pan: z.string().regex(PANRegex, "Invalid 10-character PAN format (e.g. ABCDE1234F)"),
  businessName: z.string().min(2, "Business name is required"),
  address: z.string().min(5, "Address is required"),
  stateCode: z.string().length(2, "State Code must be 2 digits (e.g. 27 for Maharashtra)"),
  stateName: z.string().min(2, "State name is required"),
  placeOfSupply: z.string().min(2, "Place of supply is required"),
  defaultGstRate: z.number().min(0).max(28).default(18),
  taxInclusivePricing: z.boolean().default(false),
  invoicePrefix: z.string().min(1).default("RPS/2026/"),
});

export const calculateGSTSchema = z.object({
  destinationStateCode: z.string().length(2).default("27"),
  items: z.array(
    z.object({
      productId: z.string().optional(),
      productName: z.string().min(1),
      hsnCode: z.string().default("1901"),
      quantity: z.number().positive(),
      unitPrice: z.number().positive(),
      gstRate: z.number().min(0).max(28).default(18),
      cessRate: z.number().min(0).default(0),
      discountAmount: z.number().min(0).default(0),
      taxInclusive: z.boolean().default(false),
    })
  ).min(1, "At least one item is required for tax calculation"),
});

export const validateGSTSchema = z.object({
  gstin: z.string().optional(),
  pan: z.string().optional(),
  hsnCode: z.string().optional(),
  stateCode: z.string().optional(),
});
