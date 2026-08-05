import React from "react";
import { motion } from "framer-motion";

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
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        {icon && (
          <div className="w-9 h-9 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-lg flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3">
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
          {value}
        </h3>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
        )}
      </div>

      {trend && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
          <span
            className={`font-bold px-2 py-0.5 rounded-full ${
              trend.positive
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
            }`}
          >
            {trend.positive ? "▲" : "▼"} {trend.value}
          </span>
          <span className="text-[10px] text-slate-400">vs last month</span>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardCard;
