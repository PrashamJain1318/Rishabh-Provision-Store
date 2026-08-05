import React from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardCard, Table, Column } from "@rishabh-store/ui";

interface InventoryBatch {
  batchNo: string;
  productName: string;
  quantity: number;
  expiryDate: string;
  daysRemaining: number;
}

const mockBatches: InventoryBatch[] = [
  { batchNo: "BATCH-2026-08A", productName: "Amul Butter Pasteurized (500g)", quantity: 18, expiryDate: "2026-08-28", daysRemaining: 23 },
  { batchNo: "BATCH-2026-07F", productName: "Fortune Sunlite Oil (1L)", quantity: 8, expiryDate: "2026-08-12", daysRemaining: 7 },
  { batchNo: "BATCH-2026-06C", productName: "Mother Dairy Toned Milk (500ml)", quantity: 30, expiryDate: "2026-08-06", daysRemaining: 1 },
];

const columns: Column<InventoryBatch>[] = [
  { key: "batchNo", header: "Batch Code" },
  { key: "productName", header: "Product Item" },
  { key: "quantity", header: "Stock Quantity" },
  { key: "expiryDate", header: "Expiry Date" },
  {
    key: "daysRemaining",
    header: "Expiry Status",
    render: (row) => (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        row.daysRemaining <= 3 ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" :
        row.daysRemaining <= 10 ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" :
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
      }`}>
        {row.daysRemaining <= 0 ? "Expired" : `${row.daysRemaining} days remaining`}
      </span>
    ),
  },
];

export const InventoryPage: React.FC = () => {
  return (
    <DashboardLayout activeNavId="inventory">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-section-title text-slate-900 dark:text-slate-100 font-bold">Inventory & Expiry Audit</h1>
          <p className="text-sm text-slate-500">Track batch numbers, inward stock movement, and perishable expiry dates.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <DashboardCard title="Total SKU Count" value="384 SKUs" subtitle="Active stock items" icon="📦" />
          <DashboardCard title="Near Expiry (< 7 Days)" value="2 Batches" subtitle="Action required" icon="⏰" trend={{ value: "Urgent", positive: false }} />
          <DashboardCard title="Out of Stock Items" value="4 Items" subtitle="Generate PO suggest" icon="🚫" />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft-sm">
          <h3 className="text-card-title font-bold text-slate-900 dark:text-slate-100 mb-4">Batch Expiry Alert Monitor</h3>
          <Table columns={columns} data={mockBatches} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InventoryPage;
