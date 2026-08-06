import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Wallet,
  Crown,
  Bell,
  Settings,
  Plus,
  ArrowRight,
  CheckCircle,
  Truck,
  Star,
  Copy,
  LogOut,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "@rishabh-store/ui";

type TabType =
  | "profile"
  | "orders"
  | "wishlist"
  | "addresses"
  | "wallet"
  | "loyalty"
  | "notifications"
  | "settings";

export const CustomerPortalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  // Mock Customer State
  const customer = {
    code: "CUST-2026-101",
    name: "Ramesh Kumar",
    email: "ramesh.kumar@gmail.com",
    phone: "+91 98201 11223",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    tier: "Gold",
    walletBalance: 450,
    loyaltyPoints: 1250,
    totalOrders: 28,
    totalSpent: 42500,
  };

  const navItems = [
    { id: "profile" as TabType, label: "My Profile", icon: User },
    { id: "orders" as TabType, label: "My Orders", icon: ShoppingBag, count: 2 },
    { id: "wishlist" as TabType, label: "Wishlist", icon: Heart, count: 4 },
    { id: "addresses" as TabType, label: "Saved Addresses", icon: MapPin, count: 2 },
    { id: "wallet" as TabType, label: "Store Wallet", icon: Wallet, badge: `₹${customer.walletBalance}` },
    { id: "loyalty" as TabType, label: "Loyalty & Rewards", icon: Crown, badge: `${customer.loyaltyPoints} Pts` },
    { id: "notifications" as TabType, label: "Notifications", icon: Bell, count: 3 },
    { id: "settings" as TabType, label: "Account Settings", icon: Settings },
  ];

  return (
    <DashboardLayout activeNavId="customers">
      <div className="space-y-8">
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white/30 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{customer.name}</h1>
                <span className="bg-amber-400 text-amber-950 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <Crown className="w-3.5 h-3.5" />
                  {customer.tier} VIP
                </span>
              </div>
              <p className="text-emerald-100 text-xs mt-1 font-mono">{customer.code} • {customer.phone}</p>
              <p className="text-emerald-200 text-xs mt-0.5">{customer.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
            <div className="text-center pr-4 border-r border-white/20">
              <p className="text-emerald-200 text-[10px] uppercase font-bold tracking-wider">Wallet Balance</p>
              <p className="text-2xl font-black mt-0.5">₹{customer.walletBalance}</p>
            </div>
            <div className="text-center pl-2">
              <p className="text-amber-200 text-[10px] uppercase font-bold tracking-wider">Loyalty Points</p>
              <p className="text-2xl font-black text-amber-300 mt-0.5">⭐ {customer.loyaltyPoints}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1 self-start">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isActive ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isActive ? "bg-white/20 text-white" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display Area */}
          <div className="md:col-span-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl min-h-[450px]">
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-600" />
                  Personal Account Profile
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700">
                    <p className="text-slate-400 text-xs uppercase font-bold">Full Name</p>
                    <p className="text-slate-900 dark:text-slate-100 font-extrabold text-sm mt-1">{customer.name}</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700">
                    <p className="text-slate-400 text-xs uppercase font-bold">Mobile Phone</p>
                    <p className="text-slate-900 dark:text-slate-100 font-extrabold text-sm mt-1 font-mono">{customer.phone}</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700">
                    <p className="text-slate-400 text-xs uppercase font-bold">Email Address</p>
                    <p className="text-slate-900 dark:text-slate-100 font-extrabold text-sm mt-1">{customer.email}</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700">
                    <p className="text-slate-400 text-xs uppercase font-bold">Lifetime Total Spent</p>
                    <p className="text-emerald-600 font-black text-sm mt-1">₹{customer.totalSpent.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-600" />
                  My Orders History
                </h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="font-mono text-xs font-bold text-emerald-600">ORD-2026-9821</span>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">Aashirvaad Atta 5kg (x2)</h4>
                      <p className="text-slate-400 text-xs">Placed on 06 Aug 2026 • ₹490 • UPI Payment</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" />
                      Out For Delivery
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === "wishlist" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-600" />
                  My Saved Wishlist
                </h3>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm">Amul Cow Butter 500g Pack</h4>
                    <p className="text-emerald-600 font-extrabold text-sm">₹275.00</p>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl">
                    Move to Cart
                  </Button>
                </div>
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  Saved Delivery Addresses
                </h3>
                <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 rounded-xl">
                  <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-full">DEFAULT HOME</span>
                  <p className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-2">Flat 402, Sunshine Heights</p>
                  <p className="text-slate-500 text-xs">MIDC Central Road, Andheri East, Mumbai - 400093</p>
                </div>
              </div>
            )}

            {/* WALLET TAB */}
            {activeTab === "wallet" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-emerald-600" />
                  Store Wallet Cash Balance
                </h3>
                <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-xl flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-xs uppercase font-bold">Available Cash</p>
                    <h2 className="text-4xl font-black mt-1">₹{customer.walletBalance}</h2>
                  </div>
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs px-5 py-3 rounded-xl">
                    + Top Up Cash
                  </Button>
                </div>
              </div>
            )}

            {/* LOYALTY TAB */}
            {activeTab === "loyalty" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-500" />
                  Loyalty Points & VIP Tier
                </h3>
                <div className="p-6 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-800 dark:text-amber-200 font-bold text-sm">Active Points: {customer.loyaltyPoints}</span>
                    <span className="text-amber-600 font-black text-xs">1.5x Points Multiplier</span>
                  </div>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-md">
                    Redeem Points for Wallet Cash
                  </Button>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-emerald-600" />
                  In-App Notifications Feed
                </h3>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                  <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">Order Placed Successfully</p>
                  <p className="text-slate-500 text-xs">Your order #ORD-2026-9821 has been confirmed and is being packed.</p>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-emerald-600" />
                  Account & Security Settings
                </h3>
                <p className="text-slate-500 text-xs">Manage password, login credentials, and notification preferences.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerPortalPage;
