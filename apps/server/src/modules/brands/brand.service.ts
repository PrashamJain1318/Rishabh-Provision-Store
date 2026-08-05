import { brandRepository } from "./brand.repository";
import { IBrand } from "./brand.types";

export class BrandService {
  async getAllBrands(search?: string, status?: string): Promise<IBrand[]> {
    return await brandRepository.findAll(search, status);
  }

  async getBrandById(id: string): Promise<IBrand | null> {
    return await brandRepository.findById(id);
  }

  async createBrand(data: Partial<IBrand>): Promise<IBrand> {
    return await brandRepository.create(data);
  }

  async updateBrand(id: string, updates: Partial<IBrand>): Promise<IBrand | null> {
    return await brandRepository.update(id, updates);
  }

  async deleteBrand(id: string): Promise<boolean> {
    return await brandRepository.delete(id);
  }
}

export const brandService = new BrandService();
