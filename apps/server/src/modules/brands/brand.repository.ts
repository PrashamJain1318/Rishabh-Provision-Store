import { BrandModel, IBrandDocument } from "./brand.model";
import { IBrand } from "./brand.types";

const mockBrands: IBrand[] = [
  {
    id: "BRD-001",
    name: "Aashirvaad",
    slug: "aashirvaad",
    logo: "https://images.unsplash.com/photo-1574323758207-f60101053e2c?w=100",
    description: "ITC Premium Whole Wheat Atta & Spices",
    status: "Active",
    productsCount: 42,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "BRD-002",
    name: "Fortune",
    slug: "fortune",
    logo: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100",
    description: "Adani Wilmar Edible Oils & Pulses",
    status: "Active",
    productsCount: 35,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "BRD-003",
    name: "Amul",
    slug: "amul",
    logo: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100",
    description: "The Taste of India Dairy Products",
    status: "Active",
    productsCount: 68,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "BRD-004",
    name: "Tata Consumer",
    slug: "tata-consumer",
    logo: "https://images.unsplash.com/photo-1563822249510-04678c78fa85?w=100",
    description: "Tata Salt, Sampann Pulses & Tea",
    status: "Active",
    productsCount: 51,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class BrandRepository {
  async findAll(search?: string, status?: string): Promise<IBrand[]> {
    try {
      const query: any = {};
      if (search) {
        query.name = { $regex: search, $options: "i" };
      }
      if (status) {
        query.status = status;
      }
      const dbBrands = await BrandModel.find(query);
      if (dbBrands.length > 0) return dbBrands;
    } catch {}

    let filtered = mockBrands;
    if (search) {
      filtered = filtered.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (status) {
      filtered = filtered.filter((b) => b.status === status);
    }
    return filtered;
  }

  async findById(id: string): Promise<IBrand | null> {
    try {
      const dbBrand = await BrandModel.findById(id);
      if (dbBrand) return dbBrand;
    } catch {}
    return mockBrands.find((b) => b.id === id || b.slug === id) || null;
  }

  async create(data: Partial<IBrand>): Promise<IBrand> {
    const slug = data.slug || data.name!.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    try {
      const newBrand = new BrandModel({ ...data, slug });
      return await newBrand.save();
    } catch {
      const mockNew: IBrand = {
        id: `BRD-${Math.floor(1000 + Math.random() * 9000)}`,
        name: data.name!,
        slug,
        logo: data.logo || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100",
        description: data.description,
        status: data.status || "Active",
        productsCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockBrands.unshift(mockNew);
      return mockNew;
    }
  }

  async update(id: string, updates: Partial<IBrand>): Promise<IBrand | null> {
    try {
      const dbBrand = await BrandModel.findByIdAndUpdate(id, updates, { new: true });
      if (dbBrand) return dbBrand;
    } catch {}
    const index = mockBrands.findIndex((b) => b.id === id);
    if (index !== -1) {
      mockBrands[index] = { ...mockBrands[index], ...updates, updatedAt: new Date() };
      return mockBrands[index];
    }
    return null;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await BrandModel.findByIdAndDelete(id);
    } catch {}
    const index = mockBrands.findIndex((b) => b.id === id);
    if (index !== -1) {
      mockBrands.splice(index, 1);
      return true;
    }
    return true;
  }
}

export const brandRepository = new BrandRepository();
