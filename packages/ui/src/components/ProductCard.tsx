import React from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";

export interface ProductCardProps {
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  inStock?: boolean;
  image?: string;
  onAddToCart?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  category,
  price,
  originalPrice,
  rating = 4.5,
  inStock = true,
  image = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
  onAddToCart,
}) => {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-4 flex flex-col justify-between shadow-soft-sm hover:shadow-soft-md transition-all group"
    >
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
        />
        {!inStock && (
          <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider">
            Out of Stock
          </span>
        )}
      </div>

      <div className="space-y-1.5 flex-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          {category}
        </span>
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {name}
        </h4>
        <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
          ★ {rating} <span className="text-slate-400 font-normal">(42 reviews)</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col">
          <span className="text-base font-extrabold text-slate-900 dark:text-slate-100 font-mono">
            {price}
          </span>
          {originalPrice && (
            <span className="text-xs text-slate-400 line-through font-mono">
              {originalPrice}
            </span>
          )}
        </div>
        <Button
          size="sm"
          variant="primary"
          onClick={onAddToCart}
          disabled={!inStock}
          className="rounded-xl px-3"
        >
          + Add
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
