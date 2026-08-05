export type InventoryMovementType =
  | "Opening Stock"
  | "Purchase"
  | "Sale"
  | "Damage"
  | "Return"
  | "Adjustment";

export interface IInventoryLog {
  id?: string;
  product: string;
  productName?: string;
  productSku?: string;
  type: InventoryMovementType;
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  performedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
