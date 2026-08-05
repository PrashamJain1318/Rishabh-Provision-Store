import { InventoryLogModel, IInventoryLogDocument } from "./inventory.model";
import { IInventoryLog, InventoryMovementType } from "./inventory.types";
import { ProductModel } from "../products/product.model";

const mockInventoryLogs: IInventoryLog[] = [
  {
    id: "LOG-001",
    product: "PROD-001",
    productName: "Aashirvaad Shudh Chakki Whole Wheat Atta 5kg",
    productSku: "ATT-AASH-5KG",
    type: "Opening Stock",
    quantity: 150,
    previousStock: 0,
    newStock: 150,
    reason: "Initial warehouse inventory load during system setup",
    createdAt: new Date("2026-08-01T10:00:00Z"),
  },
  {
    id: "LOG-002",
    product: "PROD-001",
    productName: "Aashirvaad Shudh Chakki Whole Wheat Atta 5kg",
    productSku: "ATT-AASH-5KG",
    type: "Sale",
    quantity: -5,
    previousStock: 150,
    newStock: 145,
    reason: "POS Counter Checkout Bill #INV-10042",
    createdAt: new Date("2026-08-04T15:30:00Z"),
  },
  {
    id: "LOG-003",
    product: "PROD-002",
    productName: "Fortune Kachi Ghani Pure Mustard Oil 1L Pouch",
    productSku: "OIL-FORT-1L",
    type: "Damage",
    quantity: -3,
    previousStock: 85,
    newStock: 82,
    reason: "Container pouch leakage damage during pallet unboxing in Rack 3A",
    createdAt: new Date("2026-08-05T09:15:00Z"),
  },
  {
    id: "LOG-004",
    product: "PROD-003",
    productName: "Amul Pasteurised Pure Cow Butter 500g Pack",
    productSku: "BUT-AMUL-500G",
    type: "Purchase",
    quantity: 30,
    previousStock: 18,
    newStock: 48,
    reason: "Received wholesale purchase order shipment from Amul Anand Dairy (PO #PO-9821)",
    createdAt: new Date("2026-08-05T11:45:00Z"),
  },
];

export class InventoryRepository {
  async findAll(queryObj: any = {}): Promise<IInventoryLog[]> {
    try {
      const dbLogs = await InventoryLogModel.find().populate("product performedBy");
      if (dbLogs.length > 0) return dbLogs;
    } catch {}

    let filtered = mockInventoryLogs;
    if (queryObj.type) {
      filtered = filtered.filter((l) => l.type === queryObj.type);
    }
    if (queryObj.search) {
      const s = queryObj.search.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          (l.productName && l.productName.toLowerCase().includes(s)) ||
          (l.productSku && l.productSku.toLowerCase().includes(s)) ||
          l.reason.toLowerCase().includes(s)
      );
    }
    return filtered;
  }

  async createAdjustment(
    productId: string,
    type: InventoryMovementType,
    quantity: number,
    reason: string,
    performedBy?: string
  ): Promise<IInventoryLog> {
    let previousStock = 100;
    let newStock = 100 + quantity;

    try {
      const product = await ProductModel.findById(productId);
      if (product) {
        previousStock = product.stock;
        newStock = Math.max(0, previousStock + quantity);
        product.stock = newStock;
        if (newStock === 0) product.status = "Out of Stock";
        await product.save();
      }

      const newLog = new InventoryLogModel({
        product: productId,
        type,
        quantity,
        previousStock,
        newStock,
        reason,
        performedBy,
      });
      return await newLog.save();
    } catch {
      const mockLog: IInventoryLog = {
        id: `LOG-00${mockInventoryLogs.length + 1}`,
        product: productId,
        productName: "Grocery Catalog Item",
        productSku: "SKU-AUDIT",
        type,
        quantity,
        previousStock,
        newStock,
        reason,
        createdAt: new Date(),
      };
      mockInventoryLogs.unshift(mockLog);
      return mockLog;
    }
  }
}

export const inventoryRepository = new InventoryRepository();
