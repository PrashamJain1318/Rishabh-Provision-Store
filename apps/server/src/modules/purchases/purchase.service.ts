import { purchaseRepository } from "./purchase.repository";
import { IPurchase } from "./purchase.types";

export class PurchaseService {
  async getAllPurchases(queryObj: any): Promise<IPurchase[]> {
    return await purchaseRepository.findAll(queryObj);
  }

  async createPurchase(data: any, createdBy?: string): Promise<IPurchase> {
    return await purchaseRepository.createPurchase(data, createdBy);
  }
}

export const purchaseService = new PurchaseService();
