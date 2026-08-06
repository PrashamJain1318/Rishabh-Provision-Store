export interface IGSTSettings {
  id?: string;
  gstin: string;
  pan: string;
  businessName: string;
  address: string;
  stateCode: string; // e.g. "27" for Maharashtra
  stateName: string;
  placeOfSupply: string;
  defaultGstRate: number; // e.g. 18
  taxInclusivePricing: boolean;
  invoicePrefix: string;
  updatedAt?: string;
}

export interface IGSTCalculationItem {
  productId?: string;
  productName: string;
  hsnCode: string;
  quantity: number;
  unitPrice: number;
  gstRate: number; // e.g. 5, 12, 18, 28
  cessRate?: number; // e.g. 12%
  discountAmount?: number;
  taxInclusive?: boolean;
}

export interface IGSTCalculationResultItem {
  productId?: string;
  productName: string;
  hsnCode: string;
  quantity: number;
  unitPrice: number;
  taxableValue: number;
  gstRate: number;
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
  igstRate: number;
  igstAmount: number;
  cessAmount: number;
  totalTax: number;
  totalAmount: number;
}

export interface IGSTCalculationResponse {
  isInterState: boolean;
  supplyStateCode: string;
  destinationStateCode: string;
  items: IGSTCalculationResultItem[];
  subtotal: number;
  totalDiscount: number;
  totalTaxableValue: number;
  totalCGST: number;
  totalSGST: number;
  totalIGST: number;
  totalCESS: number;
  totalTax: number;
  roundOff: number;
  grandTotal: number;
}

export interface IGSTReportFilter {
  type: "GSTR-1" | "GSTR-2" | "GSTR-3B" | "SALES_REGISTER" | "PURCHASE_REGISTER";
  month?: number;
  year?: number;
}
