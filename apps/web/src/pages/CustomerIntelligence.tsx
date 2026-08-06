import { useState } from "react";
import {
  Users,
  Crown,
  TrendingUp,
  RotateCcw,
  Sparkles,
  Award,
  Zap,
  Target,
  ArrowUpRight,
  ShieldCheck,
  Star,
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

// 1. New vs Returning Trend Data
const newVsReturningData = [
  { month: "Jan", newCust: 110, returningCust: 740 },
  { month: "Feb", newCust: 90, returningCust: 850 },
  { month: "Mar", newCust: 110, returningCust: 940 },
  { month: "Apr", newCust: 70, returningCust: 1050 },
  { month: "May", newCust: 90, returningCust: 1120 },
  { month: "Jun", newCust: 70, returningCust: 1210 },
];

// 2. Customer Segments RFM Breakdown Data
const rfmSegmentsData = [
  { name: "Champions", count: 245, color: "#10b981", desc: "Bought recently, buy often, spend the most" },
  { name: "Loyal Customers", count: 420, color: "#3b82f6", desc: "Buy regularly with high basket sizes" },
  { name: "Potential Loyalists", count: 310, color: "#8b5cf6", desc: "Recent buyers with average frequency" },
  { name: "At-Risk", count: 180, color: "#f59e0b", desc: "High spenders who haven't bought recently" },
  { name: "Hibernating", count: 125, color: "#ef4444", desc: "Lowest recency, frequency & spend" },
];

// 3. Top VIP Customers Leaderboard Data
const topVipCustomers = [
  { rank: 1, name: "Ramesh Kumar", code: "CUST-2026-101", tier: "Gold", ltv: 42500, orders: 28, points: 1250, rfm: "5-5-5 (Champion)" },
  { rank: 2, name: "Vikram Malhotra", code: "CUST-2026-104", tier: "Platinum", ltv: 38900, orders: 24, points: 1980, rfm: "5-5-5 (Champion)" },
  { rank: 3, name: "Sita Sharma", code: "CUST-2026-102", tier: "Silver", ltv: 14800, orders: 12, points: 340, rfm: "4-4-3 (Loyal)" },
  { rank: 4, name: "Neha Kapadia", code: "CUST-2026-108", tier: "Gold", ltv: 12400, orders: 9, points: 610, rfm: "3-4-4 (Loyal)" },
];

export const CustomerIntelligencePage: React.FC = () => {
  return (
    <DashboardLayout activeNavId="customers">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <Users className="w-8 h-8 text-emerald-600" />
              Customer Intelligence & RFM Analytics
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Recency, Frequency & Monetary (RFM) segmentation, Lifetime Value (LTV), and loyalty performance analytics
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Average LTV: ₹33,200</span>
          </div>
        </div>

        {/* 6 CUSTOMER INTELLIGENCE METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Total Customer Base */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Total Customer Base</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">1,280</h3>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
                <ArrowUpRight className="w-4 h-4" /> +45 this month
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Repeat Purchase Rate */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase">Repeat Purchase Rate</p>
              <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">53.4%</h3>
              <span className="text-xs font-bold text-emerald-600">684 Repeat Buyers</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Average Customer LTV */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-xs font-semibold uppercase">Average Lifetime Value (LTV)</p>
              <h3 className="text-3xl font-extrabold text-blue-600 mt-1">₹33,200</h3>
              <span className="text-xs font-bold text-blue-600">+12.4% MoM</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Champions (RFM 5-5-5) */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-amber-200 dark:border-amber-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-xs font-semibold uppercase">RFM Champions</p>
              <h3 className="text-3xl font-extrabold text-amber-600 mt-1">245</h3>
              <span className="text-xs font-bold text-amber-600">Highest Value Buyers</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <Crown className="w-6 h-6" />
            </div>
          </div>

          {/* Card 5: At-Risk Customers */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-rose-200 dark:border-rose-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-rose-600 text-xs font-semibold uppercase">At-Risk Customers</p>
              <h3 className="text-3xl font-extrabold text-rose-600 mt-1">180</h3>
              <span className="text-xs font-bold text-rose-600">Win-back Campaign Target</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
          </div>

          {/* Card 6: Loyalty Redemption Rate */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-purple-200 dark:border-purple-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-xs font-semibold uppercase">Loyalty Redemption Rate</p>
              <h3 className="text-3xl font-extrabold text-purple-600 mt-1">64.2%</h3>
              <span className="text-xs font-bold text-purple-600">Points-to-Cash Redeemed</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: New vs Returning Customers */}
          <div className="lg:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                New vs Returning Customers Acquisition Curve
              </h3>
              <p className="text-xs text-slate-500">Monthly buyer retention vs new user growth</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={newVsReturningData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="returningCust" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="newCust" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: RFM Customer Segments */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-500" />
                RFM Customer Segmentation
              </h3>
              <p className="text-xs text-slate-500">Breakdown by purchasing recency & frequency</p>
            </div>
            <div className="h-44 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={rfmSegmentsData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4} dataKey="count">
                    {rfmSegmentsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 text-xs">
              {rfmSegmentsData.map((seg) => (
                <div key={seg.name} className="flex items-center justify-between font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                    <span className="text-slate-700 dark:text-slate-300">{seg.name}</span>
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100">{seg.count} Buyers</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TOP VIP CUSTOMERS LEADERBOARD TABLE */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              Top VIP Customer LTV & RFM Score Leaderboard
            </h3>
            <span className="text-xs text-emerald-600 font-bold">Highest Value Profiles</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 uppercase font-bold tracking-wider">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Tier</th>
                  <th className="py-3 px-4">Lifetime Value (LTV)</th>
                  <th className="py-3 px-4">Orders</th>
                  <th className="py-3 px-4">Loyalty Points</th>
                  <th className="py-3 px-4">RFM Score Segment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {topVipCustomers.map((c) => (
                  <tr key={c.code} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-black text-amber-600">#{c.rank}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900 dark:text-slate-100">{c.name}</p>
                      <span className="text-[10px] text-slate-400 font-mono">{c.code}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        {c.tier}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-extrabold text-emerald-600">₹{c.ltv.toLocaleString("en-IN")}</td>
                    <td className="py-3 px-4 font-bold">{c.orders}</td>
                    <td className="py-3 px-4 text-amber-600 font-bold">⭐ {c.points} Pts</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">{c.rfm}</td>
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

export default CustomerIntelligencePage;
