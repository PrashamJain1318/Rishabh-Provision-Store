import React from "react";

export interface ProductCardProps {
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  imageUrl?: string;
  onAddToCart?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ name, category, price, unit, stock, imageUrl, onAddToCart }) => {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col justify-between shadow-soft-sm hover:shadow-soft-md transition-all">
      <div className="h-36 w-full rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden mb-3">
        {imageUrl ? <img src={imageUrl} alt={name} className="h-full w-full object-cover" /> : <span className="text-3xl">🛒</span>}
      </div>
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">{category}</span>
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-1">{name}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{unit} • In Stock: {stock}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-lg font-bold text-slate-900 dark:text-slate-100">₹{price}</span>
        <button onClick={onAddToCart} className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-all">
          + Add
        </button>
      </div>
    </div>
  );
};
