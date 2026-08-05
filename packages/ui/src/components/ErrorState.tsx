import React from "react";
import { Button } from "./Button";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something Went Wrong",
  description = "Failed to load data from the server. Please check your internet connection or retry.",
  onRetry,
  className = "",
}) => {
  return (
    <div className={`p-8 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 text-center flex flex-col items-center gap-3 ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 text-2xl flex items-center justify-center font-bold">
        ⚠️
      </div>
      <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
          🔄 Retry Request
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
