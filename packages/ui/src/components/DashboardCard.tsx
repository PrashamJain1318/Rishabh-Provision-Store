import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface DashboardCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  className = "",
}) => {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`glass-panel relative overflow-hidden p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between group ${className}`}
    >
      {/* 1. Gradient Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400" />

      {/* 2. Card Header: Title & Icon */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        {icon && (
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            {icon}
          </div>
        )}
      </div>

      {/* 3. Large Metric Number & Subtitle */}
      <div className="mt-4">
        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {value}
        </h3>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
        )}
      </div>

      {/* 4. Trend Indicator Pill */}
      {trend && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
          <span
            className={`inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-full text-xs ${
              trend.positive
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
            }`}
          >
            {trend.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend.value}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">vs last month</span>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardCard;
