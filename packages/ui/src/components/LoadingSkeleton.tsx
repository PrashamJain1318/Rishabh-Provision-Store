import React from "react";

export interface LoadingSkeletonProps {
  rows?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ rows = 3, className = "" }) => {
  return (
    <div className={`space-y-3 w-full animate-pulse ${className}`}>
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      ))}
    </div>
  );
};
