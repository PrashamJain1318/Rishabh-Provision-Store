import React from "react";

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = "", placeholder = "Search products, categories, or scan barcode...", ...props }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch?.(e.target.value)}
        className={`w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${className}`}
        {...props}
      />
      <span className="absolute left-3.5 top-3 text-slate-400">🔍</span>
    </div>
  );
};
