import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  CircleDollarSign,
  ShoppingBag,
  Percent,
  Receipt,
  Wallet,
  Warehouse,
  AlertTriangle,
  Users,
  Truck,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  PackageCheck,
  RotateCcw,
  Plus,
  Package,
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
  LineChart,
  Line,
} from "recharts";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "@rishabh-store/ui";

// 1. Daily Sales Trend Data
const dailySalesData = [
  { day: "Mon", sales: 12400 },
  { day: "Tue", sales: 14800 },
  { day: "Wed", sales: 11200 },
  { day: "Thu", sales: 16500 },
  { day: "Fri", sales: 19800 },
  { day: "Sat", sales: 24500 },
  { day: "Sun", sales: 22100 },
];

// 2. Weekly Sales Breakdown Data
const weeklySalesData = [
  { week: "Week 1", sales: 98000, profit: 24500 },
  { week: "Week 2", sales: 112000, profit: 28000 },
  { week: "Week 3", sales: 125000, profit: 32000 },
  { week: "Week 4", sales: 150200, profit: 40000 },
];

// 3. Monthly Revenue Trajectory Data
const monthlyRevenueData = [
  { month: "Jan", revenue: 320000, profit: 80000 },
  { month: "Feb", revenue: 350000, profit: 89000 },
  { month: "Mar", revenue: 390000, profit: 102000 },
  { month: "Apr", revenue: 410000, profit: 108000 },
  { month: "May", revenue: 440000, profit: 115000 },
  { month: "Jun", revenue: 485200, profit: 124500 },
];

// 4. Profit Margin Trend Data
const profitMarginData = [
  { month: "Jan", margin: 25.0 },
  { month: "Feb", margin: 25.4 },
  { month: "Mar", margin: 26.1 },
  { month: "Apr", margin: 26.3 },
  { month: "May", margin: 26.1 },
  { month: "Jun", margin: 25.6 },
];

// 5. Order Volume Growth
const orderGrowthData = [
  { month: "Jan", orders: 840 },
  { month: "Feb", orders: 920 },
  { month: "Mar", orders: 1050 },
  { month: "Apr", orders: 1180 },
  { month: "May", orders: 1310 },
  { month: "Jun", orders: 1420 },
];

// 6. Customer Acquisition Growth
const customerGrowthData = [
  { month: "Jan", customers: 850 },
  { month: "Feb", customers: 940 },
  { month: "Mar", customers: 1050 },
  { month: "Apr", customers: 1120 },
  { month: "May", customers: 1210 },
  { month: "Jun", customers: 1280 },
];

// 7. Top Categories Revenue Share
const categoryShareData = [
  { name: "Atta & Flours", value: 142000, color: "#10b981" },
  { name: "Rice & Grains", value: 118000, color: "#3b82f6" },
  { name: "Edible Oils", value: 95000, color: "#f59e0b" },
  { name: "Masala & Spices", value: 65000, color: "#ef4444" },
  { name: "Dairy & Chilled", value: 65200, color: "#8b5cf6" },
];

// 8. Top 5 Best Selling Products
const topProductsData = [
  { name: "Aashirvaad Atta 5kg", sales: 184 },
  { name: "Fortune Mustard Oil 1L", sales: 142 },
  { name: "Amul Butter 500g", sales: 115 },
  { name: "India Gate Basmati 5kg", sales: 98 },
  { name: "Tata Salt 1kg", sales: 210 },
];

// 9. Payment Methods Breakdown
const paymentMethodsData = [
  { name: "UPI QR", value: 52, color: "#10b981" },
  { name: "Cash Counter", value: 32, color: "#3b82f6" },
  { name: "Credit/Debit Card", value: 12, color: "#f59e0b" },
  { name: "Store Wallet", value: 4, color: "#8b5cf6" },
];

// 10. Hourly Sales Peak Heatmap
const hourlyHeatmapData = [
  { hour: "9 AM", sales: 4200 },
  { hour: "11 AM", sales: 8900 },
  { hour: "1 PM", sales: 12400 },
  { hour: "3 PM", sales: 6500 },
  { hour: "5 PM", sales: 18400 },
  { hour: "7 PM", sales: 24500 },
  { hour: "9 PM", sales: 16200 },
];

export const InventoryDashboardPage: React.FC = () => {
  return (
    <DashboardLayout activeNavId="dashboard">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-emerald-600" />
              Executive BI & AI Analytics Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Power BI style actionable insights, sales forecasting, profit metrics, and Gemini AI business recommendations
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a href="/dashboard/purchases">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md">
                <Plus className="w-4 h-4" />
                Purchase Order
              </Button>
            </a>
            <a href="/dashboard/reports">
              <Button className="bg-slate-900 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md">
                <TrendingUp className="w-4 h-4" />
                Financial Reports
              </Button>
            </a>
          </div>
        </div>

        {/* 🤖 GEMINI AI RECOMMENDATIONS & INSIGHTS PANEL */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-2xl border border-indigo-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
            <h3 className="font-extrabold text-base text-indigo-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              Gemini AI Business Recommendations & Demand Forecasting
            </h3>
            <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-400/30">
              Live AI Model Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 space-y-1.5">
              <span className="text-amber-400 font-bold uppercase text-[10px] flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Reorder Forecast Alert
              </span>
              <p className="font-bold text-white text-sm">Stockout Warning for Aashirvaad Atta 5kg</p>
              <p className="text-slate-300 text-[11px]">
                Predicted stockout in <strong className="text-amber-300">4 days</strong> based on 7-day velocity. Recommended reorder: <strong className="text-emerald-400 font-mono">150 units</strong>.
              </p>
            </div>

            <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 space-y-1.5">
              <span className="text-emerald-400 font-bold uppercase text-[10px] flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Revenue Optimization
              </span>
              <p className="font-bold text-white text-sm">Bundle Discount Opportunity</p>
              <p className="text-slate-300 text-[11px]">
                78% of buyers purchasing <strong className="text-emerald-300">Fortune Oil 1L</strong> also buy <strong className="text-emerald-300">Tata Salt</strong>. Create bundle to boost AOV by <strong className="text-emerald-400">+14%</strong>.
              </p>
            </div>

            <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 space-y-1.5">
              <span className="text-blue-400 font-bold uppercase text-[10px] flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Customer Retention
              </span>
              <p className="font-bold text-white text-sm">VIP Customer Re-engagement</p>
              <p className="text-slate-300 text-[11px]">
                4 Gold Tier VIP customers haven't purchased in 14 days. Dispatch <strong className="text-blue-300">₹100 Wallet Cash Bonus</strong> offer SMS.
              </p>
            </div>
          </div>
        </div>

        {/* 10 KPI CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Today's Sales */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase">Today's Sales</p>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">₹18,450</h3>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
                <ArrowUpRight className="w-3 h-3" /> +14.2% vs yesterday
              </span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <CircleDollarSign className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2: Monthly Revenue */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Monthly Revenue</p>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">₹4.85L</h3>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
                <ArrowUpRight className="w-3 h-3" /> +10.3% MoM
              </span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          {/* Card 3: Total Orders */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Orders Fulfilled</p>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">1,420</h3>
              <span className="text-[10px] font-bold text-blue-600 font-mono">142 Today</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          {/* Card 4: Gross Profit */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase">Gross Profit</p>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">₹1.24L</h3>
              <span className="text-[10px] font-bold text-emerald-600">25.6% Gross Margin</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Percent className="w-5 h-5" />
            </div>
          </div>

          {/* Card 5: Expenses */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-rose-200 dark:border-rose-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-rose-600 text-xs font-semibold uppercase">Operating Expenses</p>
              <h3 className="text-2xl font-extrabold text-rose-600 mt-1">₹32,400</h3>
              <span className="text-[10px] font-bold text-rose-600">Rent, Power & Staff</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
          </div>

          {/* Card 6: Net Profit */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase">Net Profit</p>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">₹92,100</h3>
              <span className="text-[10px] font-bold text-emerald-600">19.0% Net Margin</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>

          {/* Card 7: Inventory Value */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Inventory Asset Value</p>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">₹4.85L</h3>
              <span className="text-[10px] font-bold text-purple-600">384 Active SKUs</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
              <Warehouse className="w-5 h-5" />
            </div>
          </div>

          {/* Card 8: Low Stock */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-xs font-semibold uppercase">Low Stock Alerts</p>
              <h3 className="text-2xl font-extrabold text-amber-600 mt-1">8</h3>
              <span className="text-[10px] font-bold text-amber-600">Reorder Required</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          {/* Card 9: Customers */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Total Customers</p>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">1,280</h3>
              <span className="text-[10px] font-bold text-emerald-600">+45 This Month</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          {/* Card 10: Suppliers */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Active Vendors</p>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">12</h3>
              <span className="text-[10px] font-bold text-blue-600">Supply Chain Partners</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 10 INTERACTIVE CHARTS ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: Daily Sales Trend */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Daily Sales Velocity (INR ₹)
              </h3>
              <p className="text-xs text-slate-500">7-Day revenue performance curve</p>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailySalesData}>
                  <defs>
                    <linearGradient id="dailyColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} fill="url(#dailyColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Weekly Sales Breakdown */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                Weekly Sales vs Profit
              </h3>
              <p className="text-xs text-slate-500">Weekly revenue vs net margin</p>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklySalesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="profit" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Monthly Revenue Trajectory */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <CircleDollarSign className="w-5 h-5 text-indigo-600" />
                Monthly Revenue Growth
              </h3>
              <p className="text-xs text-slate-500">6-Month cumulative store gross revenue</p>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 10 INTERACTIVE CHARTS ROW 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 7: Top Categories Revenue Share */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Warehouse className="w-5 h-5 text-emerald-600" />
                Categories Revenue Share
              </h3>
              <p className="text-xs text-slate-500">Sales breakdown by grocery category</p>
            </div>
            <div className="h-44 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryShareData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4} dataKey="value">
                    {categoryShareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 8: Top 5 Best Selling Products */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-600" />
                Top 5 Best Selling SKUs
              </h3>
              <p className="text-xs text-slate-500">Units sold in current month</p>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={topProductsData}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={120} />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8b5cf6" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 9: Payment Methods Breakdown */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-amber-500" />
                Payment Methods Distribution
              </h3>
              <p className="text-xs text-slate-500">Percentage share of payment modes</p>
            </div>
            <div className="h-44 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={paymentMethodsData} cx="50%" cy="50%" outerRadius={65} dataKey="value">
                    {paymentMethodsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InventoryDashboardPage;
