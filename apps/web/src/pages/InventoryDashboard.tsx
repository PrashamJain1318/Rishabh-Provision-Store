import React from "react";
import { motion } from "framer-motion";
import {
  Package,
  Layers,
  Truck,
  AlertOctagon,
  AlertTriangle,
  Clock,
  CircleDollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  PlusCircle,
  Eye,
  Warehouse,
} from "lucide-react";
import {
  AreaChart,
  Area,
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

// Mock Analytics Data
const stockTrendData = [
  { month: "Jan", valuation: 320000, items: 310 },
  { month: "Feb", valuation: 350000, items: 330 },
  { month: "Mar", valuation: 390000, items: 345 },
  { month: "Apr", valuation: 410000, items: 360 },
  { month: "May", valuation: 440000, items: 372 },
  { month: "Jun", valuation: 485200, items: 384 },
];

const purchaseTrendData = [
  { month: "Jan", inwardCost: 120000, poCount: 8 },
  { month: "Feb", inwardCost: 145000, poCount: 10 },
  { month: "Mar", inwardCost: 130000, poCount: 9 },
  { month: "Apr", inwardCost: 175000, poCount: 12 },
  { month: "May", inwardCost: 160000, poCount: 11 },
  { month: "Jun", inwardCost: 195000, poCount: 14 },
];

const categoryDistributionData = [
  { name: "Atta & Flours", value: 42, color: "#10b981" },
  { name: "Rice & Grains", value: 38, color: "#3b82f6" },
  { name: "Edible Oils", value: 29, color: "#f59e0b" },
  { name: "Masala & Spices", value: 75, color: "#ef4444" },
  { name: "Dairy & Chilled", value: 22, color: "#8b5cf6" },
  { name: "Beverages", value: 54, color: "#06b6d4" },
];

export const InventoryDashboardPage: React.FC = () => {
  return (
    <DashboardLayout activeNavId="dashboard">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <Warehouse className="w-8 h-8 text-emerald-600" />
              Inventory & Analytics Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Real-time store stock valuation, inward purchase trends, and category distribution
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a href="/dashboard/purchases">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md">
                <Plus className="w-4 h-4" />
                Purchase Inward
              </Button>
            </a>
            <a href="/dashboard/products">
              <Button className="bg-slate-900 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md">
                <Package className="w-4 h-4" />
                Manage Products
              </Button>
            </a>
          </div>
        </div>

        {/* 7 METRIC CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {/* Card 1: Total Products */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Total Products</span>
              <Package className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">384</h3>
              <p className="text-[10px] text-emerald-600 font-bold mt-0.5">Active SKUs</p>
            </div>
          </motion.div>

          {/* Card 2: Categories */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Categories</span>
              <Layers className="w-4 h-4 text-blue-600" />
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">9</h3>
              <p className="text-[10px] text-blue-600 font-bold mt-0.5">Grocery Taxonomy</p>
            </div>
          </motion.div>

          {/* Card 3: Suppliers */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Suppliers</span>
              <Truck className="w-4 h-4 text-purple-600" />
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">12</h3>
              <p className="text-[10px] text-purple-600 font-bold mt-0.5">Active Vendors</p>
            </div>
          </motion.div>

          {/* Card 4: Out of Stock */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-rose-200 dark:border-rose-900/50 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-rose-600 text-xs font-semibold">
              <span>Out of Stock</span>
              <AlertOctagon className="w-4 h-4 text-rose-600" />
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-extrabold text-rose-600">4</h3>
              <p className="text-[10px] text-rose-600 font-bold mt-0.5">PO Required</p>
            </div>
          </motion.div>

          {/* Card 5: Low Stock */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-amber-600 text-xs font-semibold">
              <span>Low Stock</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-extrabold text-amber-600">8</h3>
              <p className="text-[10px] text-amber-600 font-bold mt-0.5">Below Threshold</p>
            </div>
          </motion.div>

          {/* Card 6: Expiring Soon */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-orange-200 dark:border-orange-900/50 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-orange-600 text-xs font-semibold">
              <span>Expiring Soon</span>
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-extrabold text-orange-600">3</h3>
              <p className="text-[10px] text-orange-600 font-bold mt-0.5">&lt; 30 Days</p>
            </div>
          </motion.div>

          {/* Card 7: Inventory Value */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
              <span>Inventory Valuation</span>
              <CircleDollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">₹4.85L</h3>
              <p className="text-[10px] text-emerald-600 font-bold mt-0.5">+12.4% vs last mo</p>
            </div>
          </motion.div>
        </div>

        {/* CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: Stock Trend (Area Chart) */}
          <div className="lg:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Stock Valuation Trend (INR ₹)
                </h3>
                <p className="text-xs text-slate-500">6-Month inventory asset valuation trajectory</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200">
                Current: ₹4,85,200
              </span>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stockTrendData}>
                  <defs>
                    <linearGradient id="colorValuation" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="valuation" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValuation)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Top Categories Distribution (Donut Chart) */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                Top Categories Breakdown
              </h3>
              <p className="text-xs text-slate-500">SKU count per grocery taxonomy</p>
            </div>

            <div className="h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryDistributionData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                    {categoryDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {categoryDistributionData.map((cat) => (
                <div key={cat.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="truncate text-slate-600 dark:text-slate-400 font-semibold">{cat.name}:</span>
                  <strong className="text-slate-900 dark:text-slate-100">{cat.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 2: Purchase Inward Trend (Bar Chart) */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Truck className="w-5 h-5 text-purple-600" />
                Wholesale Purchase Inward Volume Trend
              </h3>
              <p className="text-xs text-slate-500">Monthly inward purchase order expenditure (INR ₹)</p>
            </div>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={purchaseTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="inwardCost" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* UI PAGES NAVIGATION SITEMAP CARDS */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Complete Inventory Module Sitemap & Page Shortcuts
            </h3>
            <span className="text-xs text-slate-400">11 Full Application Pages</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs font-semibold">
            <a href="/dashboard" className="p-3 bg-slate-800/80 hover:bg-emerald-600 rounded-xl transition-all border border-slate-700">
              1. Inventory Dashboard
            </a>
            <a href="/dashboard/brands" className="p-3 bg-slate-800/80 hover:bg-emerald-600 rounded-xl transition-all border border-slate-700">
              2. Brands Management
            </a>
            <a href="/dashboard/units" className="p-3 bg-slate-800/80 hover:bg-emerald-600 rounded-xl transition-all border border-slate-700">
              3. Units Taxonomy
            </a>
            <a href="/dashboard/categories" className="p-3 bg-slate-800/80 hover:bg-emerald-600 rounded-xl transition-all border border-slate-700">
              4. Categories & Subcategories
            </a>
            <a href="/dashboard/suppliers" className="p-3 bg-slate-800/80 hover:bg-emerald-600 rounded-xl transition-all border border-slate-700">
              5. Suppliers Directory
            </a>
            <a href="/dashboard/products" className="p-3 bg-slate-800/80 hover:bg-emerald-600 rounded-xl transition-all border border-slate-700">
              6. Master Products Catalog
            </a>
            <a href="/dashboard/products" className="p-3 bg-slate-800/80 hover:bg-emerald-600 rounded-xl transition-all border border-slate-700">
              7. Product Details View
            </a>
            <a href="/dashboard/products" className="p-3 bg-slate-800/80 hover:bg-emerald-600 rounded-xl transition-all border border-slate-700">
              8. Add Product Wizard
            </a>
            <a href="/dashboard/products" className="p-3 bg-slate-800/80 hover:bg-emerald-600 rounded-xl transition-all border border-slate-700">
              9. Edit Product Form
            </a>
            <a href="/dashboard/inventory" className="p-3 bg-slate-800/80 hover:bg-emerald-600 rounded-xl transition-all border border-slate-700">
              10. Inventory Ledger
            </a>
            <a href="/dashboard/purchases" className="p-3 bg-slate-800/80 hover:bg-emerald-600 rounded-xl transition-all border border-slate-700">
              11. Purchase Entry
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InventoryDashboardPage;
