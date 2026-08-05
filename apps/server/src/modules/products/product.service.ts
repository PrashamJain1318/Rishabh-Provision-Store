import { productRepository } from "./product.repository";
import { IProduct } from "./product.types";

export class ProductService {
  async getAllProducts(queryObj: any): Promise<IProduct[]> {
    return await productRepository.findAll(queryObj);
  }

  async getProductById(id: string): Promise<IProduct | null> {
    return await productRepository.findById(id);
  }

  async createProduct(data: Partial<IProduct>): Promise<IProduct> {
    return await productRepository.create(data);
  }

  async updateProduct(id: string, updates: Partial<IProduct>): Promise<IProduct | null> {
    return await productRepository.update(id, updates);
  }

  async deleteProduct(id: string): Promise<boolean> {
    return await productRepository.delete(id);
  }
}

export const productService = new ProductService();
