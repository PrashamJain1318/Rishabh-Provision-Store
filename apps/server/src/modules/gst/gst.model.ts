import mongoose, { Schema, Document } from "mongoose";

export interface IGSTSettingsDoc extends Document {
  gstin: string;
  pan: string;
  businessName: string;
  address: string;
  stateCode: string;
  stateName: string;
  placeOfSupply: string;
  defaultGstRate: number;
  taxInclusivePricing: boolean;
  invoicePrefix: string;
}

const GSTSettingsSchema = new Schema<IGSTSettingsDoc>(
  {
    gstin: { type: String, required: true, uppercase: true, trim: true },
    pan: { type: String, required: true, uppercase: true, trim: true },
    businessName: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    stateCode: { type: String, required: true },
    stateName: { type: String, required: true },
    placeOfSupply: { type: String, required: true },
    defaultGstRate: { type: Number, default: 18 },
    taxInclusivePricing: { type: Boolean, default: false },
    invoicePrefix: { type: String, default: "RPS/2026/" },
  },
  { timestamps: true }
);

export const GSTSettingsModel = mongoose.model<IGSTSettingsDoc>("GSTSettings", GSTSettingsSchema);

export interface IGSTTransactionDoc extends Document {
  invoiceNumber: string;
  orderId?: string;
  customerGstin?: string;
  isInterState: boolean;
  stateCode: string;
  subtotal: number;
  totalTaxableValue: number;
  totalCGST: number;
  totalSGST: number;
  totalIGST: number;
  totalCESS: number;
  totalTax: number;
  grandTotal: number;
  date: Date;
}

const GSTTransactionSchema = new Schema<IGSTTransactionDoc>(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    orderId: { type: String },
    customerGstin: { type: String },
    isInterState: { type: Boolean, required: true },
    stateCode: { type: String, required: true },
    subtotal: { type: Number, required: true },
    totalTaxableValue: { type: Number, required: true },
    totalCGST: { type: Number, default: 0 },
    totalSGST: { type: Number, default: 0 },
    totalIGST: { type: Number, default: 0 },
    totalCESS: { type: Number, default: 0 },
    totalTax: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const GSTTransactionModel = mongoose.model<IGSTTransactionDoc>("GSTTransaction", GSTTransactionSchema);
