import { InventoryLogModel, IInventoryLogDocument } from "./inventory.model";
import { IInventoryLog, IStockAdjustmentInput } from "./inventory.types";
import { ProductModel } from "../products/product.model";

export class InventoryRepository {
  async getLogs(queryObj: any = {}): Promise<IInventoryLog[]> {
    const filter: any = {};
    if (queryObj.product) filter.product = queryObj.product;
    if (queryObj.type) filter.type = queryObj.type;

    return await InventoryLogModel.find(filter).populate("product performedBy");
  }

  async adjustStock(input: IStockAdjustmentInput, performedBy?: string): Promise<IInventoryLog> {
    const product = await ProductModel.findById(input.product);
    if (!product) throw new Error("Product not found");

    const previousStock = product.stock;
    const newStock = Math.max(0, previousStock + input.quantity);

    product.stock = newStock;
    if (newStock === 0) product.status = "Out of Stock";
    await product.save();

    const newLog = new InventoryLogModel({
      product: input.product,
      type: input.type,
      quantity: input.quantity,
      previousStock,
      newStock,
      reason: input.reason,
      performedBy,
    });

    return await newLog.save();
  }
}

export const inventoryRepository = new InventoryRepository();
