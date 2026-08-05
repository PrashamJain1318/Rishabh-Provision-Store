export type CategoryStatus = "Active" | "Inactive";

export interface ICategory {
  id?: string;
  name: string;
  slug: string;
  image?: string;
  icon?: string;
  description?: string;
  status: CategoryStatus;
  itemsCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
