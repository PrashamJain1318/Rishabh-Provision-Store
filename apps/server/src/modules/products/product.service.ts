import { productRepository } from "./product.repository";
import { IProduct } from "./product.types";

export class ProductService {
  async getAllProducts(): Promise<IProduct[]> {
    return await productRepository.findAll();
  }

  async getProductByCode(code: string): Promise<IProduct | null> {
    return await productRepository.findByCode(code);
  }
}

export const productService = new ProductService();
