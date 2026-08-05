export interface IProduct {
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  stock: number;
  unit: string;
  rating?: number;
  image?: string;
  inStock?: boolean;
}
