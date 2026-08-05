import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchBar } from "./SearchBar";
import { Avatar } from "./Avatar";
import {
  Menu,
  Bell,
  Calendar,
  Download,
  User,
  Settings as SettingsIcon,
  LogOut,
  ChevronDown,
} from "lucide-react";

export interface NavbarProps {
  storeName?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  onSearchChange?: (val: string) => void;
  onMobileMenuToggle?: () => void;
  onExportData?: () => void;
  rightAction?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
  storeName = "Rishabh Provision Store",
  userName = "Prasham Jain",
  userRole = "Owner",
  userAvatar,
  onSearchChange,
  onMobileMenuToggle,
  onExportData,
  rightAction,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-[72px] w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4 shadow-soft-sm">
      {/* Mobile Drawer Trigger */}
      <button
        onClick={onMobileMenuToggle}
        className="md:hidden p-2 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        title="Open Menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* 1. Store Logo & Branding */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-lg shadow-soft-sm">
          R
        </div>
        <div className="hidden sm:flex flex-col">
          <span className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
            {storeName}
          </span>
          <span className="text-[10px] text-slate-500 italic">Smart Grocery. Smarter Business.</span>
        </div>
      </div>

      {/* 2. Global Rounded Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <SearchBar
          placeholder="Search products, orders, customers, or bills (Ctrl+K)..."
          onChange={onSearchChange}
        />
      </div>

      {/* 3. Right Action Tools (Date Filter, Export, Notifications, ThemeToggle & Profile Dropdown) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Date Filter Quick Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>05 Aug 2026</span>
        </div>

        {/* Export Data Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onExportData || (() => alert("Exporting sales & inventory data to CSV/Excel..."))}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </motion.button>

        {/* Live Notification Bell & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
          </button>

          {/* Notification Popover Menu */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-soft-lg z-50 text-slate-900 dark:text-slate-100"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-sm">Notifications</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    2 New
                  </span>
                </div>
                <div className="py-2 space-y-2 text-xs">
                  <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">⚠️ Low Stock Warning</span>
                    <p className="text-slate-500 mt-0.5">Surf Excel Powder is down to 3 units.</p>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-blue-600 dark:text-blue-400">🛒 New Online Order #9901</span>
                    <p className="text-slate-500 mt-0.5">Order worth ₹820.00 received.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3-Way ThemeToggle Slot */}
        {rightAction}

        {/* User Profile Avatar & Dropdown Menu */}
        <div className="relative border-l border-slate-200 dark:border-slate-800 pl-2 sm:pl-3">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <Avatar name={userName} src={userAvatar} size="sm" />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{userName}</span>
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">{userRole}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Popover Menu */}
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-2 shadow-soft-lg z-50 text-slate-900 dark:text-slate-100 space-y-1 text-xs"
              >
                <a
                  href="/dashboard/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                >
                  <User className="w-4 h-4 text-emerald-500" /> Account Profile
                </a>
                <a
                  href="/dashboard/settings"
                  className="flex items-center gap-2 px-3 py-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                >
                  <SettingsIcon className="w-4 h-4 text-slate-400" /> Store Settings
                </a>
                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                <a
                  href="/login"
                  className="flex items-center gap-2 px-3 py-2 rounded-2xl hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 font-bold"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
