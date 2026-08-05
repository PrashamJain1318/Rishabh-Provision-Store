import React from "react";

export interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: { value: string; positive: boolean };
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, subtitle, icon, trend }) => {
  return (
    <div className="glass-panel rounded-2xl p-5 shadow-soft-sm hover:shadow-soft-md transition-all">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</span>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">{value}</span>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trend.positive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"}`}>
            {trend.positive ? "▲" : "▼"} {trend.value}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
};
