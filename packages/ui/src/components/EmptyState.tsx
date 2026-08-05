import React from "react";

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, actionLabel, onAction, icon = "📦" }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
      <span className="text-4xl mb-3">{icon}</span>
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mt-1 mb-4">{description}</p>
      {actionLabel && (
        <button onClick={onAction} className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium">
          {actionLabel}
        </button>
      )}
    </div>
  );
};
