export type SupplierStatus = "Active" | "Inactive";

export interface ISupplier {
  id?: string;
  companyName: string;
  gst?: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  outstandingBalance: number;
  status: SupplierStatus;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
