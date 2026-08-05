import React from "react";
import { Navbar } from "@rishabh-store/ui";

export interface StoreLayoutProps {
  children: React.ReactNode;
  cartCount?: number;
}

export const StoreLayout: React.FC<StoreLayoutProps> = ({ children, cartCount = 0 }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Promotional Top Announcement Banner */}
      <div className="bg-emerald-700 text-white text-xs font-semibold py-2 px-4 text-center">
        🎉 Free Store Pickup & Fast Home Delivery on Orders Above ₹500!
      </div>

      {/* Customer Store Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <Navbar storeName="Rishabh Provision Store Storefront" userName="Customer Portal" userRole="Customer" />
      </div>

      {/* Main Storefront Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Storefront Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-semibold text-slate-900 dark:text-slate-100">Rishabh Provision Store</span>
          <span>© 2026 Rishabh Provision Store. Smart Grocery. Smarter Business.</span>
          <span>Active Cart: {cartCount} items</span>
        </div>
      </footer>
    </div>
  );
};

export default StoreLayout;
