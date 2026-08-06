import React from "react";
import {
  TrendingUp,
  Sparkles,
  Calendar,
  Package,
  Truck,
  ArrowUpRight,
  Sun,
  Flame,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
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

// 1. Next Month Revenue Forecast (Moving Averages + Trend Projections)
const revenueForecastData = [
  { month: "Jan (Actual)", revenue: 320000 },
  { month: "Feb (Actual)", revenue: 350000 },
  { month: "Mar (Actual)", revenue: 390000 },
  { month: "Apr (Actual)", revenue: 410000 },
  { month: "May (Actual)", revenue: 440000 },
  { month: "Jun (Actual)", revenue: 485200 },
  { month: "Jul (Forecast)", revenue: 524000, isForecast: true },
  { month: "Aug (Forecast)", revenue: 568000, isForecast: true },
];

// 2. Next Week Sales Forecast (7-Day Moving Average)
const nextWeekSalesData = [
  { day: "Mon", projectedSales: 15200 },
  { day: "Tue", projectedSales: 16800 },
  { day: "Wed", projectedSales: 14500 },
  { day: "Thu", projectedSales: 18200 },
  { day: "Fri", projectedSales: 21500 },
  { day: "Sat", projectedSales: 26800 },
  { day: "Sun", projectedSales: 24500 },
];

// 3. Supplier Purchase Recommendations
const supplierRecommendations = [
  { vendor: "ITC Limited", brand: "Aashirvaad Atta", currentStock: 12, predicted30dDemand: 380, recommendPOQty: 400, estPOAmount: 98000, status: "Urgent" },
  { vendor: "Adani Wilmar", brand: "Fortune Oils", currentStock: 18, predicted30dDemand: 240, recommendPOQty: 250, estPOAmount: 35500, status: "High" },
  { vendor: "Amul Dairy", brand: "Amul Dairy Products", currentStock: 8, predicted30dDemand: 180, recommendPOQty: 200, estPOAmount: 55000, status: "High" },
  { vendor: "Tata Consumer", brand: "Tata Salt & Pulses", currentStock: 24, predicted30dDemand: 450, recommendPOQty: 500, estPOAmount: 14000, status: "Normal" },
];

export const AIForecastingPage: React.FC = () => {
  return (
    <DashboardLayout activeNavId="dashboard">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-emerald-600 animate-pulse" />
              AI Sales & Demand Forecasting Engine
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Statistical moving averages, exponential trend modeling, seasonal demand spikes, and supplier PO recommendations
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Next Month Forecast: ₹5,24,000 (+8.0%)</span>
          </div>
        </div>

        {/* 4 FORECASTING SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Next Week Sales */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-emerald-700 text-xs font-semibold uppercase">Next Week Sales Forecast</p>
              <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">₹1,37,500</h3>
              <span className="text-xs font-bold text-emerald-600">7-Day Moving Average</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Next Month Revenue */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-xs font-semibold uppercase">Next Month Revenue</p>
              <h3 className="text-3xl font-extrabold text-blue-600 mt-1">₹5.24L</h3>
              <span className="text-xs font-bold text-blue-600">+8.0% Growth Trend</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Seasonal Surge Spike */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-amber-200 dark:border-amber-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-xs font-semibold uppercase">Diwali Festival Surge</p>
              <h3 className="text-3xl font-extrabold text-amber-600 mt-1">+350%</h3>
              <span className="text-xs font-bold text-amber-600">Dry Fruits & Sweets Surge</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Recommended PO Outlay */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-purple-200 dark:border-purple-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-xs font-semibold uppercase">Recommended PO Budget</p>
              <h3 className="text-3xl font-extrabold text-purple-600 mt-1">₹2,02,500</h3>
              <span className="text-xs font-bold text-purple-600">4 Major Wholesale Vendors</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Next Month Revenue Trajectory Forecast */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Monthly Revenue Trajectory Forecast (Actual vs Forecast)
                </h3>
                <p className="text-xs text-slate-500">Exponential smoothing forecast model for Jul & Aug 2026</p>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueForecastData}>
                  <defs>
                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fill="url(#colorForecast)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Next Week Sales Forecast (7-Day Moving Average) */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Next Week Sales Forecast (7-Day Moving Average)
              </h3>
              <p className="text-xs text-slate-500">Predicted daily sales velocity for upcoming week</p>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nextWeekSalesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="projectedSales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* SUPPLIER PURCHASE RECOMMENDATIONS TABLE */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Truck className="w-5 h-5 text-purple-600" />
              Supplier Purchase Recommendations & 30-Day Inventory Requirements
            </h3>
            <span className="text-xs text-emerald-600 font-bold">Auto-Generated Wholesale PO Outlay</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 uppercase font-bold tracking-wider">
                  <th className="py-3 px-4">Vendor Partner</th>
                  <th className="py-3 px-4">Key Brand / SKU</th>
                  <th className="py-3 px-4">Current Stock</th>
                  <th className="py-3 px-4">Predicted 30d Demand</th>
                  <th className="py-3 px-4">Recommended PO Qty</th>
                  <th className="py-3 px-4">Est. PO Cost</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {supplierRecommendations.map((s) => (
                  <tr key={s.vendor} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">{s.vendor}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{s.brand}</td>
                    <td className="py-3 px-4 font-bold text-rose-600">{s.currentStock} Units</td>
                    <td className="py-3 px-4 font-bold text-blue-600">{s.predicted30dDemand} Units</td>
                    <td className="py-3 px-4 font-black text-emerald-600">+{s.recommendPOQty} Units</td>
                    <td className="py-3 px-4 font-extrabold text-slate-900 dark:text-slate-100">
                      ₹{s.estPOAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-3 py-1 rounded-lg">
                        + Generate PO
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

export default AIForecastingPage;
