import { supplierRepository } from "./supplier.repository";
import { ISupplier } from "./supplier.types";

export class SupplierService {
  async getAllSuppliers(search?: string, status?: string): Promise<ISupplier[]> {
    return await supplierRepository.findAll(search, status);
  }

  async getSupplierById(id: string): Promise<ISupplier | null> {
    return await supplierRepository.findById(id);
  }

  async createSupplier(data: Partial<ISupplier>): Promise<ISupplier> {
    return await supplierRepository.create(data);
  }

  async updateSupplier(id: string, updates: Partial<ISupplier>): Promise<ISupplier | null> {
    return await supplierRepository.update(id, updates);
  }

  async deleteSupplier(id: string): Promise<boolean> {
    return await supplierRepository.delete(id);
  }
}

export const supplierService = new SupplierService();
