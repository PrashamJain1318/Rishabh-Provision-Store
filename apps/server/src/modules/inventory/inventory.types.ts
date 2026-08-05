export type InventoryMovementType =
  | "Opening"
  | "Purchase"
  | "Sale"
  | "Return"
  | "Damage"
  | "Adjustment"
  | "Transfer";

export interface IInventoryLog {
  id?: string;
  product: string;
  productName?: string;
  sku?: string;
  type: InventoryMovementType;
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  performedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IStockAdjustmentInput {
  product: string;
  type: InventoryMovementType;
  quantity: number;
  reason: string;
}
