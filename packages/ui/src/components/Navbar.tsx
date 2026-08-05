import React from "react";
import { SearchBar } from "./SearchBar";
import { Avatar } from "./Avatar";

export interface NavbarProps {
  storeName?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  onSearchChange?: (val: string) => void;
  rightAction?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
  storeName = "Rishabh Provision Store",
  userName = "Prasham Jain",
  userRole = "Owner",
  userAvatar,
  onSearchChange,
  rightAction,
}) => {
  return (
    <header className="h-16 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between gap-4">
      {/* Left: Store Logo & Brand Name */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-lg shadow-soft-sm">
          R
        </div>
        <div className="hidden sm:flex flex-col">
          <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{storeName}</span>
          <span className="text-xs text-slate-500 italic">Smart Grocery. Smarter Business.</span>
        </div>
      </div>

      {/* Center: Global Search Input */}
      <div className="flex-1 max-w-md hidden md:block">
        <SearchBar
          placeholder="Search products, orders, customers, or bills (Press Ctrl+K)..."
          onChange={onSearchChange}
        />
      </div>

      {/* Right: Notifications, Theme Toggle Slot & User Profile Menu */}
      <div className="flex items-center gap-3">
        {/* Notification Bell Badge */}
        <button
          title="Notifications"
          className="relative p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all"
        >
          <span className="text-lg">🔔</span>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
        </button>

        {/* Custom Slot (ThemeToggle Component) */}
        {rightAction}

        {/* User Profile Avatar & Role Menu */}
        <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-3">
          <Avatar name={userName} src={userAvatar} size="md" />
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{userName}</span>
            <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">{userRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
