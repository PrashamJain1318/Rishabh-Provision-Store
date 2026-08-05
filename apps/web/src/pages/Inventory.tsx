import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Warehouse,
  Plus,
  Search,
  CheckCircle,
  AlertTriangle,
  FileText,
  X,
  ArrowUpRight,
  ArrowDownRight,
  ShieldAlert,
  Clock,
  Box,
  TrendingUp,
  RefreshCw,
  AlertOctagon,
  CircleDollarSign,
  ArrowLeftRight,
} from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "@rishabh-store/ui";

interface InventoryLogItem {
  id: string;
  productName: string;
  sku: string;
  type: "Opening" | "Purchase" | "Sale" | "Return" | "Damage" | "Adjustment" | "Transfer";
  quantity: number;
  previousStock: number;
  balance: number;
  remarks: string;
  date: string;
}

const initialLogsData: InventoryLogItem[] = [
  {
    id: "LOG-001",
    productName: "Aashirvaad Shudh Chakki Atta 5kg",
    sku: "ATT-AASH-5KG",
    type: "Opening",
    quantity: 100,
    previousStock: 0,
    balance: 100,
    remarks: "Initial warehouse inventory load during system setup",
    date: "2026-08-01 10:00 AM",
  },
  {
    id: "LOG-002",
    productName: "Aashirvaad Shudh Chakki Atta 5kg",
    sku: "ATT-AASH-5KG",
    type: "Purchase",
    quantity: 50,
    previousStock: 100,
    balance: 150,
    remarks: "Received wholesale shipment PO #PO-9821 from ITC Wholesalers",
    date: "2026-08-03 02:15 PM",
  },
  {
    id: "LOG-003",
    productName: "Fortune Kachi Ghani Mustard Oil 1L",
    sku: "OIL-FORT-1L",
    type: "Damage",
    quantity: -3,
    previousStock: 85,
    balance: 82,
    remarks: "Pouch leakage damage during shelf unboxing in Rack 3A",
    date: "2026-08-05 09:30 AM",
  },
  {
    id: "LOG-004",
    productName: "Amul Pasteurised Cow Butter 500g",
    sku: "BUT-AMUL-500G",
    type: "Transfer",
    quantity: -10,
    previousStock: 58,
    balance: 48,
    remarks: "Transferred 10 units to Front Counter Display Chiller #2",
    date: "2026-08-05 11:00 AM",
  },
];

export const InventoryPage: React.FC = () => {
  const [logsList, setLogsList] = useState<InventoryLogItem[]>(initialLogsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [selectedSku, setSelectedSku] = useState("ATT-AASH-5KG");
  const [movementType, setMovementType] = useState<
    "Opening" | "Purchase" | "Sale" | "Return" | "Damage" | "Adjustment" | "Transfer"
  >("Damage");
  const [qtyChange, setQtyChange] = useState("-1");
  const [remarks, setRemarks] = useState("");
  const [reasonError, setReasonError] = useState("");

  const handleAdjustStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remarks.trim() || remarks.trim().length < 5) {
      setReasonError("⚠️ Mandatory Audit Rule: Detailed remarks (min 5 chars) must be recorded for any stock change.");
      return;
    }

    setReasonError("");
    const changeVal = parseInt(qtyChange) || 0;
    const prevStock = 145;
    const newBalance = Math.max(0, prevStock + changeVal);

    const newLog: InventoryLogItem = {
      id: `LOG-00${logsList.length + 1}`,
      productName: selectedSku === "ATT-AASH-5KG" ? "Aashirvaad Shudh Chakki Atta 5kg" : "Fortune Mustard Oil 1L",
      sku: selectedSku,
      type: movementType,
      quantity: changeVal,
      previousStock: prevStock,
      balance: newBalance,
      remarks: remarks.trim(),
      date: new Date().toLocaleString("en-IN"),
    };

    setLogsList([newLog, ...logsList]);
    setRemarks("");
    setQtyChange("-1");
    setIsModalOpen(false);
  };

  const filteredLogs = logsList.filter(
    (l) =>
      l.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.remarks.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout activeNavId="inventory">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <Warehouse className="w-8 h-8 text-emerald-600" />
              Inventory Stock Ledger & Movement Audit
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Real-time movement audit across Opening, Purchase, Sale, Return, Damage, Adjustment, & Transfer
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Stock Adjustment Audit
          </Button>
        </div>

        {/* 5 INVENTORY DASHBOARD METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Total Stock */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Total Stock Units</span>
              <Box className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">24,850</h3>
              <p className="text-[10px] text-emerald-600 font-bold mt-0.5">Across 384 SKUs</p>
            </div>
          </div>

          {/* Card 2: Inventory Value */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Inventory Value</span>
              <CircleDollarSign className="w-4 h-4 text-blue-600" />
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">₹4,85,200</h3>
              <p className="text-[10px] text-blue-600 font-bold mt-0.5">Asset Valuation</p>
            </div>
          </div>

          {/* Card 3: Low Stock */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-600 text-xs font-semibold">
              <span>Low Stock</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-extrabold text-amber-600">8 Items</h3>
              <p className="text-[10px] text-amber-600 font-bold mt-0.5">Below Threshold</p>
            </div>
          </div>

          {/* Card 4: Out of Stock */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-rose-200 dark:border-rose-900/50 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-rose-600 text-xs font-semibold">
              <span>Out Of Stock</span>
              <AlertOctagon className="w-4 h-4 text-rose-600" />
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-extrabold text-rose-600">4 Items</h3>
              <p className="text-[10px] text-rose-600 font-bold mt-0.5">PO Required</p>
            </div>
          </div>

          {/* Card 5: Expiring Soon */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-orange-200 dark:border-orange-900/50 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-orange-600 text-xs font-semibold">
              <span>Expiring Soon</span>
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-extrabold text-orange-600">3 Batches</h3>
              <p className="text-[10px] text-orange-600 font-bold mt-0.5">&lt; 30 Days</p>
            </div>
          </div>
        </div>

        {/* IMMUTABLE STOCK LEDGER TABLE */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              Stock Movement Audit Ledger
            </h3>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search ledger by SKU, type, or remarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Product Item & SKU</th>
                  <th className="py-3.5 px-4">Stock Type</th>
                  <th className="py-3.5 px-4 text-center">Quantity (±)</th>
                  <th className="py-3.5 px-4 text-center font-extrabold bg-slate-100 dark:bg-slate-800">Closing Balance</th>
                  <th className="py-3.5 px-4">Audit Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors font-medium">
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">{log.date}</td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900 dark:text-slate-100">{log.productName}</p>
                      <span className="font-mono text-[10px] text-slate-400">{log.sku}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          log.type === "Opening" ? "bg-slate-100 text-slate-800" :
                          log.type === "Purchase" ? "bg-emerald-100 text-emerald-800" :
                          log.type === "Sale" ? "bg-blue-100 text-blue-800" :
                          log.type === "Damage" ? "bg-rose-100 text-rose-800" :
                          log.type === "Return" ? "bg-indigo-100 text-indigo-800" :
                          log.type === "Transfer" ? "bg-purple-100 text-purple-800" :
                          "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {log.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-extrabold text-sm">
                      <span className={log.quantity > 0 ? "text-emerald-600" : "text-rose-600"}>
                        {log.quantity > 0 ? `+${log.quantity}` : log.quantity}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-extrabold text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                      {log.balance} Units
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 italic max-w-xs truncate">
                      "{log.remarks}"
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock Adjustment Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-emerald-600" />
                    Record Stock Movement Entry
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAdjustStock} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Select Target Product *
                    </label>
                    <select
                      value={selectedSku}
                      onChange={(e) => setSelectedSku(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
                    >
                      <option value="ATT-AASH-5KG">Aashirvaad Shudh Chakki Atta 5kg (ATT-AASH-5KG)</option>
                      <option value="OIL-FORT-1L">Fortune Kachi Ghani Mustard Oil 1L (OIL-FORT-1L)</option>
                      <option value="BUT-AMUL-500G">Amul Pasteurised Cow Butter 500g (BUT-AMUL-500G)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Stock Movement Type *
                      </label>
                      <select
                        value={movementType}
                        onChange={(e) => setMovementType(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                      >
                        <option value="Opening">Opening</option>
                        <option value="Purchase">Purchase</option>
                        <option value="Sale">Sale</option>
                        <option value="Return">Return</option>
                        <option value="Damage">Damage</option>
                        <option value="Adjustment">Adjustment</option>
                        <option value="Transfer">Transfer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Quantity Change *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="-1 or +10"
                        value={qtyChange}
                        onChange={(e) => setQtyChange(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Audit Remarks * (Mandatory)
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="e.g. Rack breakage damage / Inter-shelf rack 2B transfer..."
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                    />
                    {reasonError && (
                      <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {reasonError}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-5 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl font-semibold shadow-lg shadow-emerald-500/20"
                    >
                      Record Stock Entry
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default InventoryPage;
