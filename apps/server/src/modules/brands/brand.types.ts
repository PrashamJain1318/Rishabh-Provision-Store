export type BrandStatus = "Active" | "Inactive";

export interface IBrand {
  id?: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  status: BrandStatus;
  productsCount?: number;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
