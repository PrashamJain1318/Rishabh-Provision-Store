import { categoryRepository } from "./category.repository";
import { ICategory } from "./category.types";

export class CategoryService {
  async getAllCategories(search?: string, status?: string): Promise<ICategory[]> {
    return await categoryRepository.findAll(search, status);
  }

  async getCategoryById(id: string): Promise<ICategory | null> {
    return await categoryRepository.findById(id);
  }

  async createCategory(data: Partial<ICategory>): Promise<ICategory> {
    return await categoryRepository.create(data);
  }

  async updateCategory(id: string, updates: Partial<ICategory>): Promise<ICategory | null> {
    return await categoryRepository.update(id, updates);
  }

  async deleteCategory(id: string): Promise<boolean> {
    return await categoryRepository.delete(id);
  }
}

export const categoryService = new CategoryService();
