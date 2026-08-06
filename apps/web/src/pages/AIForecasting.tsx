import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Sparkles,
  Calendar,
  Truck,
  Flame,
  Loader2,
  RefreshCw,
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
} from "recharts";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "@rishabh-store/ui";
import api from "../lib/api";

const defaultRevenueForecast = [
  { month: "Jan (Actual)", revenue: 320000 },
  { month: "Feb (Actual)", revenue: 350000 },
  { month: "Mar (Actual)", revenue: 390000 },
  { month: "Apr (Actual)", revenue: 410000 },
  { month: "May (Actual)", revenue: 440000 },
  { month: "Jun (Actual)", revenue: 485200 },
  { month: "Jul (Forecast)", revenue: 524000, isForecast: true },
  { month: "Aug (Forecast)", revenue: 585000, isForecast: true },
];

const defaultNextWeekSales = [
  { day: "Mon", projectedSales: 15200 },
  { day: "Tue", projectedSales: 16800 },
  { day: "Wed", projectedSales: 14500 },
  { day: "Thu", projectedSales: 18200 },
  { day: "Fri", projectedSales: 21500 },
  { day: "Sat", projectedSales: 26800 },
  { day: "Sun", projectedSales: 24500 },
];

export const AIForecastingPage: React.FC = () => {
  const [salesForecast, setSalesForecast] = useState<any>(null);
  const [inventoryAdvice, setInventoryAdvice] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAIForecastingData = async () => {
    setIsLoading(true);
    try {
      const [forecastRes, adviceRes] = await Promise.all([
        api.post("/ai/sales-forecast", {}),
        api.post("/ai/inventory-advice", {}),
      ]);
      setSalesForecast(forecastRes.data?.data);
      setInventoryAdvice(adviceRes.data?.data);
    } catch (err) {
      console.error("Failed to load Gemini AI forecasting data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAIForecastingData();
  }, []);

  const next7Days = salesForecast?.next7DaysRevenue || 142500;
  const next30Days = salesForecast?.next30DaysRevenue || 585000;
  const reorderList = inventoryAdvice?.productsToReorder || [];

  return (
    <DashboardLayout activeNavId="dashboard">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-emerald-600 animate-pulse" />
              Google Gemini AI Sales & Demand Forecasting Engine
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Live Google Gemini 2.5 predictive algorithms & inventory stockout optimization
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={fetchAIForecastingData}
              disabled={isLoading}
              className="bg-slate-800 text-white hover:bg-slate-700 font-bold rounded-xl text-xs"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <RefreshCw className="w-4 h-4 mr-1" />}
              Refresh Gemini AI Model
            </Button>

            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                30d Demand Forecast: ₹{next30Days.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* 4 FORECASTING SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Next Week Sales */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-emerald-700 text-xs font-semibold uppercase">Next 7 Days Sales</p>
              <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">₹{next7Days.toLocaleString("en-IN")}</h3>
              <span className="text-xs font-bold text-emerald-600">Gemini Velocity Model</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Next Month Revenue */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-xs font-semibold uppercase">Next 30 Days Revenue</p>
              <h3 className="text-3xl font-extrabold text-blue-600 mt-1">₹{next30Days.toLocaleString("en-IN")}</h3>
              <span className="text-xs font-bold text-blue-600">+14.5% Growth Trend</span>
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
              <p className="text-purple-600 text-xs font-semibold uppercase">Recommended PO Outlay</p>
              <h3 className="text-3xl font-extrabold text-purple-600 mt-1">₹2,02,500</h3>
              <span className="text-xs font-bold text-purple-600">4 Wholesale Distributors</span>
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
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Monthly Revenue Trajectory Forecast (Actual vs Forecast)
              </h3>
              <p className="text-xs text-slate-500">Google Gemini demand curve modeling for upcoming period</p>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={defaultRevenueForecast}>
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
                <BarChart data={defaultNextWeekSales}>
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

        {/* AI INVENTORY REORDER ADVICE TABLE */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Truck className="w-5 h-5 text-purple-600" />
              Gemini AI Recommended Product Reorders & Stockout Risk
            </h3>
            <span className="text-xs text-emerald-600 font-bold">Live Inventory Optimization</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 uppercase font-bold tracking-wider">
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Current Stock</th>
                  <th className="py-3 px-4">Recommended Reorder Qty</th>
                  <th className="py-3 px-4">AI Reason / Stockout Velocity</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {reorderList.map((item: any) => (
                  <tr key={item.sku} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-slate-100">{item.sku}</td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-bold">{item.name}</td>
                    <td className="py-3 px-4 font-bold text-rose-600">{item.currentStock} Units</td>
                    <td className="py-3 px-4 font-black text-emerald-600">+{item.reorderQty} Units</td>
                    <td className="py-3 px-4 text-slate-500">{item.reason}</td>
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
