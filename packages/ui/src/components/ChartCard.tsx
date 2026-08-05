import React from "react";

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, children }) => {
  return (
    <div className="glass-panel rounded-2xl p-5 shadow-soft-sm">
      <div className="mb-4">
        <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h4>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
      <div className="w-full h-64 flex items-center justify-center">{children}</div>
    </div>
  );
};
