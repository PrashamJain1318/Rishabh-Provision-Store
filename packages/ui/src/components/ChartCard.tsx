import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, Download, TrendingUp } from "lucide-react";

export interface ChartDataPoint {
  time: string;
  sales: number;
  orders: number;
}

export interface ChartCardProps {
  title?: string;
  subtitle?: string;
  data: ChartDataPoint[];
  onExportCSV?: () => void;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title = "Sales & Revenue Overview",
  subtitle = "Real-time hourly sales velocity trajectory across cashier terminals",
  data,
  onExportCSV,
  className = "",
}) => {
  const [timeRange, setTimeRange] = useState<"TODAY" | "7D" | "30D" | "1Y">("TODAY");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-soft-sm hover:shadow-soft-md transition-all ${className}`}
    >
      {/* 1. Chart Header Bar: Title, Date Range Filter & Export CSV */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {title}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
              Live Feed
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Date Range Filter Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            {(["TODAY", "7D", "30D", "1Y"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-xl transition-all ${
                  timeRange === range
                    ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-soft-sm font-bold"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Export CSV Button */}
          <button
            onClick={onExportCSV || (() => alert("Exporting chart sales data to CSV..."))}
            className="p-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center gap-1 transition-all"
            title="Export CSV"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Recharts Smooth Area Gradient Chart Container */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSalesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "16px",
                boxShadow: "0 8px 24px -4px rgba(15, 23, 42, 0.4)",
                color: "#fff",
                fontSize: "12px",
                fontFamily: "monospace",
              }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#059669"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorSalesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 3. Bottom Summary Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          <span>Peak billing velocity recorded at 06:00 PM</span>
        </div>
        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">+18.4% Revenue Growth</span>
      </div>
    </motion.div>
  );
};

export default ChartCard;
