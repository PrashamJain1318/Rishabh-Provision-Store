import { inventoryRepository } from "./inventory.repository";
import { IInventoryLog, InventoryMovementType } from "./inventory.types";

export class InventoryService {
  async getAllLogs(queryObj: any): Promise<IInventoryLog[]> {
    return await inventoryRepository.findAll(queryObj);
  }

  async adjustStock(
    productId: string,
    type: InventoryMovementType,
    quantity: number,
    reason: string,
    performedBy?: string
  ): Promise<IInventoryLog> {
    return await inventoryRepository.createAdjustment(
      productId,
      type,
      quantity,
      reason,
      performedBy
    );
  }
}

export const inventoryService = new InventoryService();
