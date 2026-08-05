export interface IPurchaseItem {
  product: string;
  productName?: string;
  sku?: string;
  quantity: number;
  purchasePrice: number;
  sellingPrice?: number;
  mrp?: number;
  batchNumber: string;
  expiryDate: Date;
  totalAmount: number;
}

export interface IPurchase {
  id?: string;
  invoiceNumber: string;
  supplier: string;
  supplierName?: string;
  items: IPurchaseItem[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paymentStatus: "Paid" | "Pending" | "Partial";
  notes?: string;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
