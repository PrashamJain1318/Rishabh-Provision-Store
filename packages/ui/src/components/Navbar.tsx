import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { Avatar } from "./Avatar";
import { Menu, X } from "lucide-react";

export interface NavbarProps {
  storeName?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  onSearchChange?: (val: string) => void;
  onMobileMenuToggle?: () => void;
  rightAction?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
  storeName = "Rishabh Provision Store",
  userName = "Prasham Jain",
  userRole = "Owner",
  userAvatar,
  onSearchChange,
  onMobileMenuToggle,
  rightAction,
}) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="h-16 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-3">
      {/* Mobile Hamburger Drawer Button */}
      <button
        onClick={onMobileMenuToggle}
        className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        title="Open Menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Left: Store Logo & Brand Name */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-base shadow-soft-sm">
          R
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 line-clamp-1">{storeName}</span>
          <span className="text-[10px] text-slate-500 italic hidden sm:inline">Smart Grocery. Smarter Business.</span>
        </div>
      </div>

      {/* Center: Global Search Input (Desktop) */}
      <div className="flex-1 max-w-md hidden md:block">
        <SearchBar
          placeholder="Search products, orders, customers, or bills (Ctrl+K)..."
          onChange={onSearchChange}
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Icon Toggle */}
        <button
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
        >
          <Menu className="w-4 h-4 hidden" />
        </button>

        {/* Notifications Bell */}
        <button
          title="Notifications"
          className="relative p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all"
        >
          <span className="text-base sm:text-lg">🔔</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
        </button>

        {/* Custom Slot (ThemeToggle Component) */}
        {rightAction}

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-2 sm:pl-3">
          <Avatar name={userName} src={userAvatar} size="sm" />
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
