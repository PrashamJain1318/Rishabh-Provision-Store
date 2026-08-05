export type CategoryStatus = "Active" | "Inactive";

export interface ISubcategory {
  id?: string;
  name: string;
  slug: string;
  itemsCount?: number;
}

export interface ICategory {
  id?: string;
  name: string;
  slug: string;
  image?: string;
  icon?: string;
  description?: string;
  parentCategoryId?: string;
  subcategories?: ISubcategory[];
  status: CategoryStatus;
  itemsCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
