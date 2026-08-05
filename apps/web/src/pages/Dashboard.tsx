import React from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardCard, Table, Column, ChartCard } from "@rishabh-store/ui";

const salesGraphData = [
  { time: "08:00 AM", sales: 1200, orders: 4 },
  { time: "10:00 AM", sales: 4500, orders: 15 },
  { time: "12:00 PM", sales: 9200, orders: 28 },
  { time: "02:00 PM", sales: 14800, orders: 42 },
  { time: "04:00 PM", sales: 19500, orders: 65 },
  { time: "06:00 PM", sales: 24850, orders: 88 },
];

interface RecentOrder {
  orderNo: string;
  customer: string;
  type: string;
  total: string;
  status: "Completed" | "Pending" | "Dispatched";
  time: string;
}

const recentOrders: RecentOrder[] = [
  { orderNo: "#BILL-1043", customer: "Walk-in Cashier", type: "POS Bill", total: "₹ 450.00", status: "Completed", time: "2 mins ago" },
  { orderNo: "#ORD-9901", customer: "Aakash Mehta", type: "Online App", total: "₹ 820.00", status: "Pending", time: "10 mins ago" },
  { orderNo: "#BILL-1042", customer: "Rahul Sharma", type: "POS Bill", total: "₹ 1,280.00", status: "Completed", time: "15 mins ago" },
  { orderNo: "#ORD-9900", customer: "Sanjay Patel", type: "WhatsApp Delivery", total: "₹ 540.00", status: "Dispatched", time: "35 mins ago" },
  { orderNo: "#BILL-1041", customer: "Ramesh Kumar", type: "Khata Udhar", total: "₹ 650.00", status: "Completed", time: "42 mins ago" },
];

interface LowStockItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minThreshold: number;
}

const lowStockItems: LowStockItem[] = [
  { id: "PROD-005", name: "Surf Excel Easy Wash (1kg)", category: "Detergents", currentStock: 3, minThreshold: 10 },
  { id: "PROD-002", name: "Fortune Sunlite Oil (1L)", category: "Edible Oils", currentStock: 8, minThreshold: 15 },
  { id: "PROD-012", name: "Mother Dairy Milk (500ml)", category: "Dairy", currentStock: 4, minThreshold: 20 },
];

interface TopProduct {
  name: string;
  category: string;
  soldQty: string;
  revenue: string;
}

const topProducts: TopProduct[] = [
  { name: "Aashirvaad Chakki Atta 5kg", category: "Atta & Flours", soldQty: "42 bags", revenue: "₹ 10,290" },
  { name: "Amul Butter 500g", category: "Dairy", soldQty: "38 packs", revenue: "₹ 10,450" },
  { name: "Tata Salt 1kg", category: "Salt & Sugar", soldQty: "85 pkts", revenue: "₹ 2,380" },
];

const orderColumns: Column<RecentOrder>[] = [
  { key: "orderNo", header: "Order / Bill No" },
  { key: "customer", header: "Customer Name" },
  { key: "type", header: "Channel" },
  { key: "total", header: "Total Value" },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
          row.status === "Completed"
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
            : row.status === "Dispatched"
            ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
            : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  { key: "time", header: "Time" },
];

export const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout activeNavId="dashboard">
      <div className="flex flex-col gap-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-section-title text-slate-900 dark:text-slate-100 font-bold">
              Executive Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Real-time revenue metrics, POS sales velocity, and inventory alerts.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/dashboard/reports">
              <button className="px-4 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                📈 View Reports
              </button>
            </a>
            <a href="/pos">
              <button className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-soft-sm transition-all">
                ⚡ Express POS Terminal
              </button>
            </a>
          </div>
        </div>

        {/* 5 Glassmorphism Metric Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <DashboardCard
            title="Monthly Revenue"
            value="₹ 4,85,200"
            subtitle="August 2026 Turnover"
            icon="💰"
            trend={{ value: "18.4%", positive: true }}
          />
          <DashboardCard
            title="Today's Sales"
            value="₹ 24,850"
            subtitle="142 bills completed"
            icon="📈"
            trend={{ value: "14.2%", positive: true }}
          />
          <DashboardCard
            title="Total Orders"
            value="88 Orders"
            subtitle="POS + Online + WhatsApp"
            icon="🛒"
            trend={{ value: "9.5%", positive: true }}
          />
          <DashboardCard
            title="Active Customers"
            value="1,420"
            subtitle="₹12.4k Khata dues"
            icon="👥"
          />
          <DashboardCard
            title="Inventory Alerts"
            value="5 Alerts"
            subtitle="3 low stock, 2 near expiry"
            icon="⚠️"
            trend={{ value: "Action Required", positive: false }}
          />
        </div>

        {/* Recharts Modern Smooth Gradient Area Chart Overview */}
        <ChartCard data={salesGraphData} />

        {/* Bottom Grid Split (Recent Orders vs Low Stock & Top Products) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Orders Datagrid */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-card-title font-bold text-slate-900 dark:text-slate-100">
                Recent Orders & POS Bills
              </h3>
              <a href="/dashboard/orders" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                View All Orders ➔
              </a>
            </div>
            <Table columns={orderColumns} data={recentOrders} />
          </div>

          {/* Low Stock & Top Selling Sidebar Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Low Stock Products */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft-sm">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  ⚠️ Low Stock Products
                </h4>
                <a href="/dashboard/inventory" className="text-xs font-semibold text-amber-600 hover:underline">
                  Reorder Stock ➔
                </a>
              </div>
              <div className="flex flex-col gap-3">
                {lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {item.name}
                      </h5>
                      <span className="text-[10px] text-slate-400">{item.category}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 font-mono font-bold text-xs">
                      {item.currentStock} Left
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Selling Products */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft-sm">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  🔥 Top Selling Products
                </h4>
                <a href="/dashboard/products" className="text-xs font-semibold text-emerald-600 hover:underline">
                  Catalog ➔
                </a>
              </div>
              <div className="flex flex-col gap-3">
                {topProducts.map((prod, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {prod.name}
                      </h5>
                      <span className="text-[10px] text-slate-400">{prod.soldQty}</span>
                    </div>
                    <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
                      {prod.revenue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
