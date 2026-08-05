import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Plus,
  Search,
  UserCheck,
  Award,
  Wallet,
  DollarSign,
  Phone,
  Mail,
  Building,
  CheckCircle,
  X,
  Edit3,
  Trash2,
  Crown,
  TrendingUp,
  UserPlus,
  ShieldCheck,
} from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "@rishabh-store/ui";

interface CustomerItem {
  id: string;
  customerCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  gstNumber?: string;
  walletBalance: number;
  loyaltyPoints: number;
  membershipLevel: "Bronze" | "Silver" | "Gold" | "Platinum";
  status: "Active" | "Inactive" | "Blocked";
  lastPurchase: string;
  totalOrders: number;
  totalSpent: number;
}

const initialCustomersData: CustomerItem[] = [
  {
    id: "CUST-001",
    customerCode: "CUST-2026-101",
    firstName: "Ramesh",
    lastName: "Kumar",
    email: "ramesh.kumar@gmail.com",
    phone: "+91 98201 11223",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    gstNumber: "27AAACI1681G1ZM",
    walletBalance: 450,
    loyaltyPoints: 1250,
    membershipLevel: "Gold",
    status: "Active",
    lastPurchase: "2026-08-05",
    totalOrders: 28,
    totalSpent: 42500,
  },
  {
    id: "CUST-002",
    customerCode: "CUST-2026-102",
    firstName: "Sita",
    lastName: "Sharma",
    email: "sita.sharma@yahoo.com",
    phone: "+91 98980 44556",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    walletBalance: 120,
    loyaltyPoints: 340,
    membershipLevel: "Silver",
    status: "Active",
    lastPurchase: "2026-08-04",
    totalOrders: 12,
    totalSpent: 14800,
  },
  {
    id: "CUST-003",
    customerCode: "CUST-2026-103",
    firstName: "Anjali",
    lastName: "Mehta",
    email: "anjali.m@outlook.com",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    walletBalance: 0,
    loyaltyPoints: 45,
    membershipLevel: "Bronze",
    status: "Active",
    lastPurchase: "2026-07-28",
    totalOrders: 3,
    totalSpent: 2100,
  },
];

export const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerItem[]>(initialCustomersData);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gstNumber: "",
    membershipLevel: "Bronze" as "Bronze" | "Silver" | "Gold" | "Platinum",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.phone.trim()) return;

    const newCustomer: CustomerItem = {
      id: `CUST-00${customers.length + 1}`,
      customerCode: `CUST-2026-${Math.floor(100 + Math.random() * 900)}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email || `${formData.firstName.toLowerCase()}@client.com`,
      phone: formData.phone,
      gstNumber: formData.gstNumber.toUpperCase() || undefined,
      walletBalance: 0,
      loyaltyPoints: 100, // Signup welcome bonus
      membershipLevel: formData.membershipLevel,
      status: "Active",
      lastPurchase: new Date().toISOString().split("T")[0],
      totalOrders: 0,
      totalSpent: 0,
    };

    setCustomers([newCustomer, ...customers]);
    setIsModalOpen(false);
  };

  // Aggregates for CRM Dashboard
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "Active").length;
  const newCustomersThisMonth = customers.filter((c) => c.totalOrders <= 5).length;
  const topCustomersCount = customers.filter((c) => c.membershipLevel === "Gold" || c.membershipLevel === "Platinum").length;
  const totalLifetimeValue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

  const filteredCustomers = customers.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.customerCode.toLowerCase().includes(q);

    const matchesLevel = levelFilter === "All" || c.membershipLevel === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <DashboardLayout activeNavId="customers">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <Users className="w-8 h-8 text-emerald-600" />
              Omnichannel Customer CRM & Loyalty Management
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Unified profiles, shared online/POS wallet balance, loyalty reward tiers, and purchase histories
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <UserPlus className="w-5 h-5" />
            Add Customer Profile
          </Button>
        </div>

        {/* 5 CUSTOMER CRM DASHBOARD METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Total Customers */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Total Customers</p>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{totalCustomers}</h3>
              <span className="text-[10px] font-bold text-emerald-600">Unified Database</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2: Active Customers */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Active Buyers</p>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{activeCustomers}</h3>
              <span className="text-[10px] font-bold text-blue-600">Active Accounts</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>

          {/* Card 3: New Customers */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">New Buyers</p>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{newCustomersThisMonth}</h3>
              <span className="text-[10px] font-bold text-purple-600">This Month</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
          </div>

          {/* Card 4: Top Tiers */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-xs font-semibold uppercase">Top VIP Tiers</p>
              <h3 className="text-2xl font-extrabold text-amber-600 mt-1">{topCustomersCount}</h3>
              <span className="text-[10px] font-bold text-amber-600">Gold & Platinum</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <Crown className="w-5 h-5" />
            </div>
          </div>

          {/* Card 5: Lifetime Value (LTV) */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-emerald-600 text-xs font-semibold uppercase">Lifetime Value</p>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">₹{(totalLifetimeValue / 1000).toFixed(1)}k</h3>
              <span className="text-[10px] font-bold text-emerald-600">Total Spent</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Name, Phone, Email, or Customer Code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-slate-500 uppercase">Tier Filter:</label>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
            >
              <option value="All">All Tiers</option>
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
            </select>
          </div>
        </div>

        {/* Customer Directory Table */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/30 text-slate-500 uppercase font-bold tracking-wider">
                  <th className="py-4 px-6">Customer & Code</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">GSTIN Number</th>
                  <th className="py-4 px-6">Wallet / Loyalty Points</th>
                  <th className="py-4 px-6">Membership Tier</th>
                  <th className="py-4 px-6">Total Spent</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img
                        src={c.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                        alt={c.firstName}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                          {c.firstName} {c.lastName}
                        </p>
                        <span className="font-mono text-[10px] text-slate-400">{c.customerCode}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-slate-800 dark:text-slate-200 font-bold">{c.phone}</p>
                      <p className="text-slate-400 text-[10px]">{c.email}</p>
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-700 dark:text-slate-300">
                      {c.gstNumber ? <span className="font-bold text-emerald-600">{c.gstNumber}</span> : <span className="text-slate-400">N/A</span>}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-emerald-600">₹{c.walletBalance} Wallet</p>
                      <p className="text-amber-600 text-[10px] font-bold">⭐ {c.loyaltyPoints} Points</p>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          c.membershipLevel === "Gold" ? "bg-amber-100 text-amber-800" :
                          c.membershipLevel === "Platinum" ? "bg-purple-100 text-purple-800" :
                          c.membershipLevel === "Silver" ? "bg-slate-200 text-slate-800" :
                          "bg-orange-100 text-orange-800"
                        }`}
                      >
                        <Crown className="w-3 h-3" />
                        {c.membershipLevel}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-extrabold text-slate-900 dark:text-slate-100">
                      ₹{c.totalSpent.toLocaleString("en-IN")}
                      <span className="block text-[10px] text-slate-400 font-normal">{c.totalOrders} Orders</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-1">
                      <button className="p-2 text-slate-400 hover:text-emerald-600 rounded-lg">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Customer Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-emerald-600" />
                    Add Omnichannel Customer Profile
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddCustomer} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        placeholder="Ramesh"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        placeholder="Kumar"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Mobile Phone *
                      </label>
                      <input
                        type="text"
                        name="phone"
                        required
                        placeholder="+91 98201 12345"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="ramesh@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        GSTIN Tax Number
                      </label>
                      <input
                        type="text"
                        name="gstNumber"
                        placeholder="27AAACI1681G1ZM"
                        value={formData.gstNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono uppercase"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Initial Tier
                      </label>
                      <select
                        name="membershipLevel"
                        value={formData.membershipLevel}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                      >
                        <option value="Bronze">Bronze Tier</option>
                        <option value="Silver">Silver Tier</option>
                        <option value="Gold">Gold Tier</option>
                        <option value="Platinum">Platinum Tier</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-5 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl font-semibold shadow-lg shadow-emerald-500/20"
                    >
                      Create Customer Profile
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default CustomersPage;
