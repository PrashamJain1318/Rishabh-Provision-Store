import { IProduct } from "./product.types";

const mockCatalog: IProduct[] = [
  { id: "PROD-001", code: "890103001001", name: "Aashirvaad Shuddh Chakki Atta (5kg)", category: "Atta & Flours", price: 245, mrp: 275, stock: 45, unit: "bag", rating: 4.8, inStock: true },
  { id: "PROD-002", code: "890103002002", name: "Fortune Sunlite Sunflower Oil (1L)", category: "Edible Oils", price: 135, mrp: 155, stock: 8, unit: "pouch", rating: 4.6, inStock: true },
  { id: "PROD-003", code: "890103003003", name: "Amul Butter Pasteurized (500g)", category: "Dairy & Chilled", price: 275, mrp: 275, stock: 18, unit: "pack", rating: 4.9, inStock: true },
  { id: "PROD-004", code: "890103004004", name: "Tata Salt Vacuum Evaporated (1kg)", category: "Salt & Sugar", price: 28, mrp: 28, stock: 120, unit: "pkt", rating: 4.7, inStock: true },
];

export class ProductRepository {
  async findAll(): Promise<IProduct[]> {
    return mockCatalog;
  }

  async findByCode(code: string): Promise<IProduct | null> {
    const found = mockCatalog.find((p) => p.code === code || p.id === code);
    return found || null;
  }
}

export const productRepository = new ProductRepository();
