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
} from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "@rishabh-store/ui";

interface InventoryAuditSummary {
  sku: string;
  name: string;
  openingStock: number;
  purchase: number;
  sale: number;
  damage: number;
  returns: number;
  adjustment: number;
  closingStock: number;
  unit: string;
}

interface InventoryLogItem {
  id: string;
  productName: string;
  sku: string;
  type: "Opening Stock" | "Purchase" | "Sale" | "Damage" | "Return" | "Adjustment";
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  timestamp: string;
}

const initialSummaryData: InventoryAuditSummary[] = [
  {
    sku: "ATT-AASH-5KG",
    name: "Aashirvaad Shudh Chakki Atta 5kg",
    openingStock: 100,
    purchase: 50,
    sale: -2,
    damage: 0,
    returns: 0,
    adjustment: -3,
    closingStock: 145,
    unit: "kg",
  },
  {
    sku: "OIL-FORT-1L",
    name: "Fortune Kachi Ghani Mustard Oil 1L",
    openingStock: 90,
    purchase: 0,
    sale: -5,
    damage: -3,
    returns: 0,
    adjustment: 0,
    closingStock: 82,
    unit: "L",
  },
  {
    sku: "BUT-AMUL-500G",
    name: "Amul Pasteurised Cow Butter 500g",
    openingStock: 20,
    purchase: 30,
    sale: -2,
    damage: 0,
    returns: 0,
    adjustment: 0,
    closingStock: 48,
    unit: "pkt",
  },
];

const initialLogsData: InventoryLogItem[] = [
  {
    id: "LOG-001",
    productName: "Aashirvaad Shudh Chakki Atta 5kg",
    sku: "ATT-AASH-5KG",
    type: "Opening Stock",
    quantity: 100,
    previousStock: 0,
    newStock: 100,
    reason: "Initial warehouse inventory load during system setup",
    timestamp: "2026-08-01 10:00 AM",
  },
  {
    id: "LOG-002",
    productName: "Aashirvaad Shudh Chakki Atta 5kg",
    sku: "ATT-AASH-5KG",
    type: "Purchase",
    quantity: 50,
    previousStock: 100,
    newStock: 150,
    reason: "Received wholesale shipment PO #PO-9821 from ITC Wholesalers",
    timestamp: "2026-08-03 02:15 PM",
  },
  {
    id: "LOG-003",
    productName: "Fortune Kachi Ghani Mustard Oil 1L",
    sku: "OIL-FORT-1L",
    type: "Damage",
    quantity: -3,
    previousStock: 85,
    newStock: 82,
    reason: "Pouch leakage damage during shelf unboxing in Rack 3A",
    timestamp: "2026-08-05 09:30 AM",
  },
];

export const InventoryPage: React.FC = () => {
  const [summaryList, setSummaryList] = useState<InventoryAuditSummary[]>(initialSummaryData);
  const [logsList, setLogsList] = useState<InventoryLogItem[]>(initialLogsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for Mandatory Reason Audit Adjustment
  const [selectedSku, setSelectedSku] = useState("ATT-AASH-5KG");
  const [movementType, setMovementType] = useState<
    "Purchase" | "Damage" | "Return" | "Adjustment"
  >("Damage");
  const [qtyChange, setQtyChange] = useState("-1");
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");

  const handleAdjustStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim() || reason.trim().length < 5) {
      setReasonError("⚠️ Stock should never be edited manually without recording a valid audit reason (min 5 chars).");
      return;
    }

    setReasonError("");
    const targetProduct = summaryList.find((s) => s.sku === selectedSku);
    if (!targetProduct) return;

    const changeVal = parseInt(qtyChange) || 0;
    const prevStock = targetProduct.closingStock;
    const newStock = Math.max(0, prevStock + changeVal);

    // Update Summary
    setSummaryList(
      summaryList.map((item) => {
        if (item.sku === selectedSku) {
          const updatedItem = { ...item, closingStock: newStock };
          if (movementType === "Purchase") updatedItem.purchase += Math.abs(changeVal);
          if (movementType === "Damage") updatedItem.damage += changeVal;
          if (movementType === "Return") updatedItem.returns += changeVal;
          if (movementType === "Adjustment") updatedItem.adjustment += changeVal;
          return updatedItem;
        }
        return item;
      })
    );

    // Add Audit Log Entry
    const newLog: InventoryLogItem = {
      id: `LOG-00${logsList.length + 1}`,
      productName: targetProduct.name,
      sku: targetProduct.sku,
      type: movementType,
      quantity: changeVal,
      previousStock: prevStock,
      newStock,
      reason: reason.trim(),
      timestamp: new Date().toLocaleString("en-IN"),
    };

    setLogsList([newLog, ...logsList]);
    setReason("");
    setQtyChange("-1");
    setIsModalOpen(false);
  };

  const filteredLogs = logsList.filter(
    (l) =>
      l.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout activeNavId="inventory">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <Warehouse className="w-8 h-8 text-emerald-600" />
              Stock Movement & Audit Ledger
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Audit log breakdown: Opening Stock ➔ Purchase ➔ Sale ➔ Damage ➔ Return ➔ Adjustment ➔ Closing Stock
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

        {/* Audit Policy Banner */}
        <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-800 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-800 dark:text-amber-300">
            <strong className="font-bold">Strict Audit Requirement:</strong> Stock levels cannot be edited manually without recording a valid justification reason. All changes are immutably logged with timestamp and user ID.
          </div>
        </div>

        {/* Master Stock Summary Matrix Table */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="p-4 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Box className="w-4 h-4 text-emerald-600" />
              Product Inventory Ledger Summary
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              Live Real-Time Calculations
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/30 text-slate-500 uppercase font-bold tracking-wider">
                  <th className="py-3.5 px-4">Item SKU & Name</th>
                  <th className="py-3.5 px-4 text-center">Opening Stock</th>
                  <th className="py-3.5 px-4 text-center text-emerald-600">Purchase (+)</th>
                  <th className="py-3.5 px-4 text-center text-blue-600">Sale (-)</th>
                  <th className="py-3.5 px-4 text-center text-rose-600">Damage (-)</th>
                  <th className="py-3.5 px-4 text-center text-indigo-600">Return (±)</th>
                  <th className="py-3.5 px-4 text-center text-amber-600">Adjustment (±)</th>
                  <th className="py-3.5 px-4 text-center font-extrabold bg-slate-100 dark:bg-slate-800">Closing Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {summaryList.map((item) => (
                  <tr key={item.sku} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors font-medium">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900 dark:text-slate-100">{item.name}</p>
                      <span className="font-mono text-[10px] text-slate-400">{item.sku}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-600">{item.openingStock} {item.unit}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-emerald-600">+{item.purchase}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-blue-600">{item.sale}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-rose-600">{item.damage}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-indigo-600">{item.returns}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-amber-600">{item.adjustment}</td>
                    <td className="py-3.5 px-4 text-center font-extrabold text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                      {item.closingStock} {item.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Log Movement History */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              Immutable Audit Log Trail
            </h3>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search audit logs by SKU or reason..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-bold uppercase">
                  <th className="py-3 px-4">Log ID</th>
                  <th className="py-3 px-4">Product Item</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4 text-center">Prev Stock ➔ New Stock</th>
                  <th className="py-3 px-4">Audit Justification Reason</th>
                  <th className="py-3 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600">{log.id}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900 dark:text-slate-100">{log.productName}</p>
                      <span className="font-mono text-[10px] text-slate-400">{log.sku}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          log.type === "Opening Stock" ? "bg-slate-100 text-slate-800" :
                          log.type === "Purchase" ? "bg-emerald-100 text-emerald-800" :
                          log.type === "Sale" ? "bg-blue-100 text-blue-800" :
                          log.type === "Damage" ? "bg-rose-100 text-rose-800" :
                          "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {log.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-semibold">
                      {log.previousStock} ➔ <strong className="text-emerald-600">{log.newStock}</strong> ({log.quantity > 0 ? `+${log.quantity}` : log.quantity})
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300 italic max-w-xs truncate">
                      "{log.reason}"
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-400">{log.timestamp}</td>
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
                    Record Stock Movement Audit
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
                      Select Target Product SKU *
                    </label>
                    <select
                      value={selectedSku}
                      onChange={(e) => setSelectedSku(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
                    >
                      {summaryList.map((item) => (
                        <option key={item.sku} value={item.sku}>
                          {item.name} ({item.sku}) - Current: {item.closingStock} {item.unit}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Movement Type *
                      </label>
                      <select
                        value={movementType}
                        onChange={(e) => setMovementType(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                      >
                        <option value="Purchase">Purchase (+)</option>
                        <option value="Damage">Damage (-)</option>
                        <option value="Return">Return (±)</option>
                        <option value="Adjustment">Adjustment (±)</option>
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

                  {/* Mandatory Reason Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Audit Justification Reason * (Mandatory)
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="e.g. Water leak damage on lower shelf 4B / Received supplier credit note #CR-104..."
                      value={reason}
                      onChange={(e) => {
                        setReason(e.target.value);
                        if (e.target.value.trim().length >= 5) setReasonError("");
                      }}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
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
                      Record Audit Entry
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
