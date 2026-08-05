export type ProductStatus = "Active" | "Inactive" | "Out of Stock";

export interface IProduct {
  id?: string;
  name: string;
  slug: string;
  sku: string;
  barcode?: string;
  brand?: string;
  category: string;
  subcategory?: string;
  supplier?: string;
  unit: string;
  description?: string;
  purchasePrice: number;
  sellingPrice: number;
  mrp: number;
  discount?: number;
  gst: number;
  stock: number;
  minimumStock: number;
  maximumStock: number;
  expiryDate?: Date;
  batchNumber?: string;
  images: string[];
  status: ProductStatus;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
