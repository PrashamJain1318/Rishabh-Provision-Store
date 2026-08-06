import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  CircleDollarSign,
  Percent,
  Receipt,
  Wallet,
  Landmark,
  CreditCard,
  ShoppingBag,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Calendar,
  CheckCircle,
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

const cashFlowData = [
  { month: "Jan", inflow: 320000, outflow: 240000, net: 80000 },
  { month: "Feb", inflow: 350000, outflow: 261000, net: 89000 },
  { month: "Mar", inflow: 390000, outflow: 288000, net: 102000 },
  { month: "Apr", inflow: 410000, outflow: 302000, net: 108000 },
  { month: "May", inflow: 440000, outflow: 325000, net: 115000 },
  { month: "Jun", inflow: 485200, outflow: 360700, net: 124500 },
];

const paymentBreakdownData = [
  { name: "UPI QR Code", percentage: 52, amount: 252304, color: "#10b981" },
  { name: "Cash Counter", percentage: 32, amount: 155264, color: "#3b82f6" },
  { name: "Credit/Debit Card", percentage: 12, amount: 58224, color: "#f59e0b" },
  { name: "Store Wallet", percentage: 4, amount: 19408, color: "#8b5cf6" },
];

export const FinancialDashboardPage: React.FC = () => {
  return (
    <DashboardLayout activeNavId="reports">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <Landmark className="w-8 h-8 text-emerald-600" />
              Financial Analytics & Cash Flow Engine
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Real-time P&L statement, GST tax collection audit, cash flow positioning, and payment mode breakdown
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Positive Cash Flow: +₹1,24,500</span>
          </div>
        </div>

        {/* 9 FINANCIAL DASHBOARD METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {/* 1. Gross Revenue */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Gross Revenue</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">₹4,85,200</h3>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
                <ArrowUpRight className="w-4 h-4" /> +10.3% vs last month
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <CircleDollarSign className="w-6 h-6" />
            </div>
          </div>

          {/* 2. Gross Profit */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase">Gross Profit</p>
              <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">₹1,24,500</h3>
              <span className="text-xs font-bold text-emerald-600">25.6% Gross Margin</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Percent className="w-6 h-6" />
            </div>
          </div>

          {/* 3. Net Profit */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase">Net Profit</p>
              <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">₹92,100</h3>
              <span className="text-xs font-bold text-emerald-600">19.0% Net Margin</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
          </div>

          {/* 4. GST Collected */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-xs font-semibold uppercase">GST Collected (Tax)</p>
              <h3 className="text-3xl font-extrabold text-blue-600 mt-1">₹24,260</h3>
              <span className="text-xs font-bold text-blue-600">CGST ₹12.13k + SGST ₹12.13k</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <Landmark className="w-6 h-6" />
            </div>
          </div>

          {/* 5. Operating Expenses */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-rose-200 dark:border-rose-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-rose-600 text-xs font-semibold uppercase">Operating Expenses</p>
              <h3 className="text-3xl font-extrabold text-rose-600 mt-1">₹32,400</h3>
              <span className="text-xs font-bold text-rose-600">Rent, Utilities & Staff</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
              <Receipt className="w-6 h-6" />
            </div>
          </div>

          {/* 6. Net Cash Flow */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-purple-200 dark:border-purple-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-xs font-semibold uppercase">Net Cash Flow Position</p>
              <h3 className="text-3xl font-extrabold text-purple-600 mt-1">+₹1,18,000</h3>
              <span className="text-xs font-bold text-purple-600">Positive Liquidity</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          {/* 7. Payment Breakdown Top Channel */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Top Payment Mode</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">UPI QR (52%)</h3>
              <span className="text-xs font-bold text-emerald-600">₹2,52,304 Digital UPI</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>

          {/* 8. Average Order Value (AOV) */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Average Order Value (AOV)</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">₹934.00</h3>
              <span className="text-xs font-bold text-indigo-600">+₹42 vs last month</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          {/* 9. Monthly Recurring Customers */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-amber-200 dark:border-amber-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-xs font-semibold uppercase">Recurring Buyers</p>
              <h3 className="text-3xl font-extrabold text-amber-600 mt-1">684</h3>
              <span className="text-xs font-bold text-amber-600">53.4% Repeat Rate</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: Cash Flow Inflow vs Outflow */}
          <div className="lg:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Monthly Cash Flow Trajectory (Inflow vs Outflow)
              </h3>
              <p className="text-xs text-slate-500">6-Month store cash positioning and net liquidity</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cashFlowData}>
                  <defs>
                    <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="inflow" stroke="#10b981" strokeWidth={3} fill="url(#colorInflow)" />
                  <Area type="monotone" dataKey="outflow" stroke="#f43f5e" strokeWidth={2} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Payment Breakdown */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                Payment Mode Breakdown
              </h3>
              <p className="text-xs text-slate-500">Share of total monthly revenue collected</p>
            </div>
            <div className="h-44 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={paymentBreakdownData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4} dataKey="amount">
                    {paymentBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 text-xs">
              {paymentBreakdownData.map((item) => (
                <div key={item.name} className="flex items-center justify-between font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700 dark:text-slate-300">{item.name}</span>
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100">
                    ₹{item.amount.toLocaleString("en-IN")} ({item.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinancialDashboardPage;
