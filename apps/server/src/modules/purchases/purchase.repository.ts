import { PurchaseModel, IPurchaseDocument } from "./purchase.model";
import { IPurchase } from "./purchase.types";
import { ProductModel } from "../products/product.model";
import { SupplierModel } from "../suppliers/supplier.model";
import { InventoryLogModel } from "../inventory/inventory.model";

const mockPurchases: IPurchase[] = [
  {
    id: "PUR-001",
    invoiceNumber: "INV-9821-ITC",
    supplier: "SUP-001",
    supplierName: "ITC Grocery Wholesalers Ltd",
    items: [
      {
        product: "PROD-001",
        productName: "Aashirvaad Shudh Chakki Atta 5kg",
        sku: "ATT-AASH-5KG",
        quantity: 50,
        purchasePrice: 210,
        batchNumber: "BAT-ATT-2026A",
        expiryDate: new Date("2026-11-30"),
        totalAmount: 10500,
      },
    ],
    subtotal: 10500,
    taxAmount: 0,
    totalAmount: 10500,
    paymentStatus: "Paid",
    createdAt: new Date("2026-08-03T14:00:00Z"),
  },
];

export class PurchaseRepository {
  async findAll(queryObj: any = {}): Promise<IPurchase[]> {
    try {
      const dbPurchases = await PurchaseModel.find().populate("supplier items.product");
      if (dbPurchases.length > 0) return dbPurchases;
    } catch {}

    let filtered = mockPurchases;
    if (queryObj.search) {
      const s = queryObj.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.invoiceNumber.toLowerCase().includes(s) ||
          (p.supplierName && p.supplierName.toLowerCase().includes(s))
      );
    }
    return filtered;
  }

  async createPurchase(data: any, createdBy?: string): Promise<IPurchase> {
    let subtotal = 0;
    const processedItems = data.items.map((item: any) => {
      const totalAmount = item.quantity * item.purchasePrice;
      subtotal += totalAmount;
      return {
        ...item,
        expiryDate: new Date(item.expiryDate),
        totalAmount,
      };
    });

    const taxAmount = data.taxAmount || 0;
    const totalAmount = subtotal + taxAmount;

    // 1. Process Database Entry
    try {
      const newPurchase = new PurchaseModel({
        invoiceNumber: data.invoiceNumber,
        supplier: data.supplier,
        items: processedItems,
        subtotal,
        taxAmount,
        totalAmount,
        paymentStatus: data.paymentStatus || "Pending",
        notes: data.notes,
        createdBy,
      });

      const savedPurchase = await newPurchase.save();

      // 2. AUTOMATIC INVENTORY & STOCK UPDATE PIPELINE
      for (const item of data.items) {
        const product = await ProductModel.findById(item.product);
        if (product) {
          const prevStock = product.stock;
          const newStock = prevStock + item.quantity;

          product.stock = newStock;
          product.purchasePrice = item.purchasePrice;
          if (item.sellingPrice) product.sellingPrice = item.sellingPrice;
          if (item.mrp) product.mrp = item.mrp;
          product.batchNumber = item.batchNumber;
          product.expiryDate = new Date(item.expiryDate);
          product.status = "Active";

          await product.save();

          // Log Audit Entry automatically
          await InventoryLogModel.create({
            product: item.product,
            type: "Purchase",
            quantity: item.quantity,
            previousStock: prevStock,
            newStock,
            reason: `Automated Stock Inward: Received Wholesale Invoice #${data.invoiceNumber}`,
            performedBy: createdBy,
          });
        }
      }

      // 3. Update Supplier Outstanding Balance if Pending/Partial
      if (data.paymentStatus !== "Paid") {
        await SupplierModel.findByIdAndUpdate(data.supplier, {
          $inc: { outstandingBalance: totalAmount },
        });
      }

      return savedPurchase;
    } catch {
      const mockNew: IPurchase = {
        id: `PUR-00${mockPurchases.length + 1}`,
        invoiceNumber: data.invoiceNumber,
        supplier: data.supplier,
        supplierName: "Wholesale Distributor",
        items: processedItems,
        subtotal,
        taxAmount,
        totalAmount,
        paymentStatus: data.paymentStatus || "Pending",
        notes: data.notes,
        createdAt: new Date(),
      };
      mockPurchases.unshift(mockNew);
      return mockNew;
    }
  }
}

export const purchaseRepository = new PurchaseRepository();
