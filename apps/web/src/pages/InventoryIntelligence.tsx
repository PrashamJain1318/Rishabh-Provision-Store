import React from "react";
import {
  Warehouse,
  AlertTriangle,
  Zap,
  Clock,
  TrendingDown,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  Package,
  Plus,
  CheckCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "@rishabh-store/ui";

// 1. Stock Aging Breakdown Data
const stockAgingData = [
  { bracket: "0-30 Days", value: 310000, count: 245, color: "#10b981" },
  { bracket: "31-60 Days", value: 98000, count: 85, color: "#3b82f6" },
  { bracket: "61-90 Days", value: 38700, count: 40, color: "#f59e0b" },
  { bracket: "90+ Days (Deadstock)", value: 38500, count: 14, color: "#ef4444" },
];

// 2. Reorder Suggestions Data
const reorderSuggestionsData = [
  { sku: "ATT-AASH-5KG", name: "Aashirvaad Atta 5kg", stock: 12, minStock: 25, suggestQty: 150, vendor: "ITC Limited", urgency: "CRITICAL" },
  { sku: "OIL-FORT-1L", name: "Fortune Mustard Oil 1L", stock: 18, minStock: 30, suggestQty: 100, vendor: "Adani Wilmar", urgency: "HIGH" },
  { sku: "BUT-AMUL-500G", name: "Amul Cow Butter 500g", stock: 8, minStock: 20, suggestQty: 80, vendor: "Amul Dairy", urgency: "HIGH" },
  { sku: "SLT-TATA-1KG", name: "Tata Salt Vacuum Evaporated 1kg", stock: 24, minStock: 50, suggestQty: 200, vendor: "Tata Consumer", urgency: "MEDIUM" },
];

// 3. Expiring Soon Products Data
const expiringSoonData = [
  { name: "Amul Pasteurised Butter 500g", expiryDate: "2026-08-09", daysRemaining: 3, batchNo: "BAT-9821", stock: 8 },
  { name: "Mother Dairy Toned Milk 1L", expiryDate: "2026-08-07", daysRemaining: 1, batchNo: "BAT-4412", stock: 15 },
  { name: "Britannia Bread Family Pack", expiryDate: "2026-08-08", daysRemaining: 2, batchNo: "BAT-3390", stock: 10 },
];

export const InventoryIntelligencePage: React.FC = () => {
  return (
    <DashboardLayout activeNavId="inventory">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <Warehouse className="w-8 h-8 text-emerald-600" />
              Inventory Intelligence & Stock Aging Analytics
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Stock valuation, deadstock detection, fast/slow moving SKUs, expiry tracking, and AI automated reorder suggestions
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Total Asset Value: ₹4,85,200</span>
          </div>
        </div>

        {/* 7 INVENTORY INTELLIGENCE METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {/* Card 1: Inventory Valuation */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 shadow-sm flex flex-col justify-between">
            <p className="text-emerald-700 text-xs font-semibold uppercase">Total Valuation</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">₹4.85L</h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5">384 Active SKUs</span>
          </div>

          {/* Card 2: Fast Moving */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <p className="text-slate-500 text-xs font-semibold uppercase">Fast Moving</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">42 SKUs</h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5">&gt; 15 units/day</span>
          </div>

          {/* Card 3: Slow Moving */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <p className="text-slate-500 text-xs font-semibold uppercase">Slow Moving</p>
            <h3 className="text-2xl font-extrabold text-blue-600 mt-1">28 SKUs</h3>
            <span className="text-[10px] text-blue-600 font-bold mt-0.5">&lt; 2 units/week</span>
          </div>

          {/* Card 4: Dead Stock */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-rose-200 dark:border-rose-900/50 shadow-sm flex flex-col justify-between">
            <p className="text-rose-600 text-xs font-semibold uppercase">Dead Stock (90d+)</p>
            <h3 className="text-2xl font-extrabold text-rose-600 mt-1">14 SKUs</h3>
            <span className="text-[10px] text-rose-600 font-bold mt-0.5">₹38,500 Locked</span>
          </div>

          {/* Card 5: Expiring Soon */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-orange-200 dark:border-orange-900/50 shadow-sm flex flex-col justify-between">
            <p className="text-orange-600 text-xs font-semibold uppercase">Expiring (&lt;30d)</p>
            <h3 className="text-2xl font-extrabold text-orange-600 mt-1">3 Batches</h3>
            <span className="text-[10px] text-orange-600 font-bold mt-0.5">Clearance Sale</span>
          </div>

          {/* Card 6: Reorder Threshold */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 shadow-sm flex flex-col justify-between">
            <p className="text-amber-600 text-xs font-semibold uppercase">Reorder Alerts</p>
            <h3 className="text-2xl font-extrabold text-amber-600 mt-1">4 SKUs</h3>
            <span className="text-[10px] text-amber-600 font-bold mt-0.5">Below Threshold</span>
          </div>

          {/* Card 7: Average Stock Age */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-purple-200 dark:border-purple-900/50 shadow-sm flex flex-col justify-between">
            <p className="text-purple-600 text-xs font-semibold uppercase">Avg Stock Age</p>
            <h3 className="text-2xl font-extrabold text-purple-600 mt-1">22 Days</h3>
            <span className="text-[10px] text-purple-600 font-bold mt-0.5">Healthy Velocity</span>
          </div>
        </div>

        {/* CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: Stock Aging Breakdown */}
          <div className="lg:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                Stock Aging Valuation Distribution
              </h3>
              <p className="text-xs text-slate-500">Asset value locked by inventory age brackets (INR ₹)</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockAgingData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="bracket" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {stockAgingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Expiring Soon Alert Box */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-orange-200 dark:border-orange-900/50 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-base text-orange-600 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Near Expiry Batches (&lt; 7 Days)
              </h3>
              <p className="text-xs text-slate-500">Action required: Discount clearance</p>
            </div>

            <div className="space-y-3">
              {expiringSoonData.map((item) => (
                <div key={item.batchNo} className="p-3 bg-orange-50 dark:bg-orange-950/40 rounded-xl border border-orange-200 dark:border-orange-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900 dark:text-slate-100 text-xs">{item.name}</p>
                    <span className="px-2 py-0.5 bg-rose-600 text-white text-[10px] font-black rounded-full">
                      {item.daysRemaining} DAY{item.daysRemaining > 1 ? "S" : ""} LEFT
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>Batch: {item.batchNo}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{item.stock} Units left</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI REORDER SUGGESTIONS TABLE */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Automated AI Reorder Suggestions & Reorder Thresholds
            </h3>
            <span className="text-xs text-emerald-600 font-bold">1-Click Purchase Order Dispatch</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 uppercase font-bold tracking-wider">
                  <th className="py-3 px-4">SKU & Product Name</th>
                  <th className="py-3 px-4">Current Stock</th>
                  <th className="py-3 px-4">Min Threshold</th>
                  <th className="py-3 px-4">AI Suggested Reorder</th>
                  <th className="py-3 px-4">Primary Vendor</th>
                  <th className="py-3 px-4">Urgency</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {reorderSuggestionsData.map((r) => (
                  <tr key={r.sku} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900 dark:text-slate-100">{r.name}</p>
                      <span className="text-[10px] text-slate-400 font-mono">{r.sku}</span>
                    </td>
                    <td className="py-3 px-4 font-bold text-rose-600">{r.stock} Units</td>
                    <td className="py-3 px-4 text-slate-400">{r.minStock} Units</td>
                    <td className="py-3 px-4 font-black text-emerald-600">+{r.suggestQty} Units</td>
                    <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">{r.vendor}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          r.urgency === "CRITICAL" ? "bg-rose-100 text-rose-800" :
                          r.urgency === "HIGH" ? "bg-amber-100 text-amber-800" :
                          "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {r.urgency}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-3 py-1 rounded-lg">
                        + Create PO
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InventoryIntelligencePage;
