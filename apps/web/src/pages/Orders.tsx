import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Clock,
  PackageCheck,
  Truck,
  RotateCcw,
  DollarSign,
  TrendingUp,
  Crown,
  Search,
  Download,
  CheckSquare,
  Square,
  Filter,
  Eye,
  CheckCircle,
  FileSpreadsheet,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "@rishabh-store/ui";

interface OrderData {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  channel: "Online Storefront" | "POS Terminal" | "WhatsApp Express";
  itemsCount: number;
  totalAmount: number;
  status:
    | "Pending"
    | "Confirmed"
    | "Packed"
    | "Ready"
    | "Out For Delivery"
    | "Delivered"
    | "Cancelled"
    | "Returned"
    | "Refunded";
  orderDate: string;
  paymentMode: string;
  invoiceNumber: string;
}

const initialOrders: OrderData[] = [
  {
    id: "ORD-001",
    orderNumber: "ORD-2026-9821",
    customerName: "Ramesh Kumar",
    customerPhone: "+91 98201 11223",
    channel: "Online Storefront",
    itemsCount: 2,
    totalAmount: 490,
    status: "Out For Delivery",
    orderDate: "12 mins ago",
    paymentMode: "UPI",
    invoiceNumber: "INV-2026-9821",
  },
  {
    id: "ORD-002",
    orderNumber: "ORD-2026-4412",
    customerName: "Sita Sharma",
    customerPhone: "+91 98980 44556",
    channel: "POS Terminal",
    itemsCount: 1,
    totalAmount: 275,
    status: "Delivered",
    orderDate: "35 mins ago",
    paymentMode: "Cash",
    invoiceNumber: "INV-2026-4412",
  },
  {
    id: "ORD-003",
    orderNumber: "ORD-2026-3390",
    customerName: "Anjali Mehta",
    customerPhone: "+91 98765 43210",
    channel: "WhatsApp Express",
    itemsCount: 4,
    totalAmount: 1120,
    status: "Packed",
    orderDate: "1 hour ago",
    paymentMode: "Wallet",
    invoiceNumber: "INV-2026-3390",
  },
  {
    id: "ORD-004",
    orderNumber: "ORD-2026-2210",
    customerName: "Vikram Malhotra",
    customerPhone: "+91 98111 22334",
    channel: "Online Storefront",
    itemsCount: 6,
    totalAmount: 1850,
    status: "Pending",
    orderDate: "2 hours ago",
    paymentMode: "Credit Card",
    invoiceNumber: "INV-2026-2210",
  },
];

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<OrderData["status"]>("Confirmed");

  // Toggle Single Selection
  const toggleSelectOrder = (id: string) => {
    setSelectedOrderIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle Select All
  const toggleSelectAll = () => {
    if (selectedOrderIds.length === filteredOrders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(filteredOrders.map((o) => o.id));
    }
  };

  // Execute Bulk Status Update
  const handleBulkUpdate = () => {
    if (selectedOrderIds.length === 0) return;
    setOrders(
      orders.map((o) => (selectedOrderIds.includes(o.id) ? { ...o, status: bulkStatus } : o))
    );
    setSelectedOrderIds([]);
  };

  // Export to CSV
  const exportToCSV = () => {
    const dataToExport = selectedOrderIds.length > 0
      ? orders.filter((o) => selectedOrderIds.includes(o.id))
      : filteredOrders;

    const headers = "Order Number,Customer Name,Phone,Channel,Items,Total,Status,Payment Mode,Invoice\n";
    const csvRows = dataToExport
      .map(
        (o) =>
          `"${o.orderNumber}","${o.customerName}","${o.customerPhone}","${o.channel}",${o.itemsCount},${o.totalAmount},"${o.status}","${o.paymentMode}","${o.invoiceNumber}"`
      )
      .join("\n");

    const blob = new Blob([headers + csvRows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Orders_Report_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  // Metric Aggregates
  const todayOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const readyToPack = orders.filter((o) => o.status === "Confirmed" || o.status === "Packed").length;
  const outForDelivery = orders.filter((o) => o.status === "Out For Delivery").length;
  const returnsCount = orders.filter((o) => o.status === "Returned").length;
  const refundsCount = orders.filter((o) => o.status === "Refunded").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const averageOrderValue = Math.round(totalRevenue / (todayOrders || 1));
  const topVipCustomersCount = 1;

  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      o.orderNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerPhone.includes(q) ||
      o.invoiceNumber.toLowerCase().includes(q);

    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout activeNavId="orders">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-emerald-600" />
              Omnichannel Order Management & Admin Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Unified Order Desk for Online App, POS Cashier Counter, and WhatsApp Delivery Dispatch
            </p>
          </div>
          <Button
            onClick={exportToCSV}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Download className="w-4 h-4" />
            Export Report (CSV)
          </Button>
        </div>

        {/* 8 ADMIN ORDER DASHBOARD WIDGETS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Widget 1: Today's Orders */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Today's Orders</p>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{todayOrders}</h3>
              <span className="text-[10px] font-bold text-emerald-600">₹{totalRevenue.toLocaleString("en-IN")} Total</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          {/* Widget 2: Pending Orders */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-xs font-semibold uppercase">Pending Orders</p>
              <h3 className="text-2xl font-extrabold text-amber-600 mt-1">{pendingOrders}</h3>
              <span className="text-[10px] font-bold text-amber-600">Requires Confirmation</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          {/* Widget 3: Ready to Pack */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-blue-200 dark:border-blue-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-xs font-semibold uppercase">Ready to Pack</p>
              <h3 className="text-2xl font-extrabold text-blue-600 mt-1">{readyToPack}</h3>
              <span className="text-[10px] font-bold text-blue-600">Hub Packing Queue</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <PackageCheck className="w-5 h-5" />
            </div>
          </div>

          {/* Widget 4: Out for Delivery */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-indigo-600 text-xs font-semibold uppercase">Out for Delivery</p>
              <h3 className="text-2xl font-extrabold text-indigo-600 mt-1">{outForDelivery}</h3>
              <span className="text-[10px] font-bold text-indigo-600">Active Express Riders</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
          </div>

          {/* Widget 5: Returns */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-rose-200 dark:border-rose-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-rose-600 text-xs font-semibold uppercase">Returns</p>
              <h3 className="text-2xl font-extrabold text-rose-600 mt-1">{returnsCount}</h3>
              <span className="text-[10px] font-bold text-rose-600">Returned Items</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
          </div>

          {/* Widget 6: Refunds */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-purple-200 dark:border-purple-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-xs font-semibold uppercase">Refunds</p>
              <h3 className="text-2xl font-extrabold text-purple-600 mt-1">{refundsCount}</h3>
              <span className="text-[10px] font-bold text-purple-600">Disbursed Refunds</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          {/* Widget 7: Average Order Value (AOV) */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-emerald-600 text-xs font-semibold uppercase">Average Order Value</p>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">₹{averageOrderValue}</h3>
              <span className="text-[10px] font-bold text-emerald-600">AOV Revenue</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          {/* Widget 8: Top VIP Customers */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-xs font-semibold uppercase">Top VIP Buyers</p>
              <h3 className="text-2xl font-extrabold text-amber-600 mt-1">{topVipCustomersCount}</h3>
              <span className="text-[10px] font-bold text-amber-600">Gold & Platinum</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <Crown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Toolbar, Search, Filters & Bulk Action Banner */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Order #, Customer Name, Phone, Invoice #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label className="text-xs font-bold text-slate-500 uppercase">Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Packed">Packed</option>
                <option value="Ready">Ready</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Returned">Returned</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* BULK ACTION BAR */}
          {selectedOrderIds.length > 0 && (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
              <span className="text-emerald-800 dark:text-emerald-200 text-xs font-bold">
                {selectedOrderIds.length} order(s) selected for bulk update
              </span>
              <div className="flex items-center gap-3">
                <select
                  value={bulkStatus}
                  onChange={(e) => setBulkStatus(e.target.value as any)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-emerald-300 rounded-lg text-xs font-bold"
                >
                  <option value="Confirmed">Mark Confirmed</option>
                  <option value="Packed">Mark Packed</option>
                  <option value="Ready">Mark Ready</option>
                  <option value="Out For Delivery">Mark Out For Delivery</option>
                  <option value="Delivered">Mark Delivered</option>
                </select>
                <Button
                  onClick={handleBulkUpdate}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-sm"
                >
                  Apply Bulk Update
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Directory Table */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/30 text-slate-500 uppercase font-bold tracking-wider">
                  <th className="py-4 px-4 w-10 text-center">
                    <button onClick={toggleSelectAll}>
                      {selectedOrderIds.length === filteredOrders.length && filteredOrders.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </th>
                  <th className="py-4 px-6">Order # & Invoice</th>
                  <th className="py-4 px-6">Customer & Contact</th>
                  <th className="py-4 px-6">Channel</th>
                  <th className="py-4 px-6">Items & Amount</th>
                  <th className="py-4 px-6">Payment Mode</th>
                  <th className="py-4 px-6">Fulfillment Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {filteredOrders.map((o) => {
                  const isSelected = selectedOrderIds.includes(o.id);
                  return (
                    <tr
                      key={o.id}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                        isSelected ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""
                      }`}
                    >
                      <td className="py-4 px-4 text-center">
                        <button onClick={() => toggleSelectOrder(o.id)}>
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-slate-900 dark:text-slate-100 text-sm font-mono">{o.orderNumber}</p>
                        <span className="text-[10px] text-emerald-600 font-bold font-mono">{o.invoiceNumber}</span>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-slate-900 dark:text-slate-100">{o.customerName}</p>
                        <p className="text-slate-400 text-[10px] font-mono">{o.customerPhone}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                          {o.channel}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-extrabold text-slate-900 dark:text-slate-100">
                          ₹{o.totalAmount.toLocaleString("en-IN")}
                        </p>
                        <span className="text-[10px] text-slate-400">{o.itemsCount} Items</span>
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-700 dark:text-slate-300">
                        {o.paymentMode}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            o.status === "Delivered" ? "bg-emerald-100 text-emerald-800" :
                            o.status === "Out For Delivery" ? "bg-indigo-100 text-indigo-800" :
                            o.status === "Packed" || o.status === "Ready" ? "bg-blue-100 text-blue-800" :
                            o.status === "Pending" ? "bg-amber-100 text-amber-800" :
                            "bg-rose-100 text-rose-800"
                          }`}
                        >
                          <CheckCircle className="w-3 h-3" />
                          {o.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="p-2 text-slate-400 hover:text-emerald-600 rounded-lg">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;
