export type SupplierStatus = "Active" | "Inactive";

export interface ISupplier {
  id?: string;
  companyName: string;
  ownerName?: string;
  gst?: string;
  pan?: string;
  phone: string;
  email?: string;
  address?: string;
  state?: string;
  city?: string;
  pincode?: string;
  outstandingBalance: number;
  creditLimit: number;
  status: SupplierStatus;
  totalPurchases?: number;
  pendingPaymentsCount?: number;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
