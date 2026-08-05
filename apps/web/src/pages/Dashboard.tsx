import React, { useState } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardCard, Table, Column, ChartCard, Avatar, Badge, LoadingSkeleton, EmptyState, Button } from "@rishabh-store/ui";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight, Flame, AlertTriangle, RefreshCw, Sparkles, Bot, TrendingUp, Zap } from "lucide-react";

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
  customerAvatar?: string;
  delivery: string;
  total: string;
  status: "Completed" | "Pending" | "Dispatched" | "Cancelled";
  time: string;
}

const recentOrders: RecentOrder[] = [
  { orderNo: "#BILL-1043", customer: "Walk-in Cashier", delivery: "POS Counter Bill", total: "₹ 450.00", status: "Completed", time: "2 mins ago" },
  { orderNo: "#ORD-9901", customer: "Aakash Mehta", delivery: "30-Min Home Delivery", total: "₹ 820.00", status: "Pending", time: "10 mins ago" },
  { orderNo: "#BILL-1042", customer: "Rahul Sharma", delivery: "POS Counter Bill", total: "₹ 1,280.00", status: "Completed", time: "15 mins ago" },
  { orderNo: "#ORD-9900", customer: "Sanjay Patel", delivery: "WhatsApp Express Pickup", total: "₹ 540.00", status: "Dispatched", time: "35 mins ago" },
  { orderNo: "#BILL-1041", customer: "Ramesh Kumar", delivery: "Khata Udhar Billing", total: "₹ 650.00", status: "Completed", time: "42 mins ago" },
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

interface TopProductWidgetData {
  id: string;
  name: string;
  category: string;
  image: string;
  soldQty: string;
  revenue: string;
  progressPct: number;
}

const topProducts: TopProductWidgetData[] = [
  {
    id: "TP-1",
    name: "Aashirvaad Chakki Atta 5kg",
    category: "Atta & Flours",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=150&q=80",
    soldQty: "42 bags sold",
    revenue: "₹ 10,290",
    progressPct: 92,
  },
  {
    id: "TP-2",
    name: "Amul Butter Pasteurized 500g",
    category: "Dairy & Chilled",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=150&q=80",
    soldQty: "38 packs sold",
    revenue: "₹ 10,450",
    progressPct: 85,
  },
  {
    id: "TP-3",
    name: "Tata Salt Vacuum Evaporated 1kg",
    category: "Salt & Sugar",
    image: "https://images.unsplash.com/photo-1518110168401-f2877ee2c088?auto=format&fit=crop&w=150&q=80",
    soldQty: "85 pkts sold",
    revenue: "₹ 2,380",
    progressPct: 68,
  },
];

const orderColumns: Column<RecentOrder>[] = [
  {
    key: "orderNo",
    header: "Order ID",
    render: (row) => (
      <span className="font-mono font-bold text-xs text-slate-900 dark:text-slate-100">
        {row.orderNo}
      </span>
    ),
  },
  {
    key: "customer",
    header: "Customer",
    render: (row) => (
      <div className="flex items-center gap-2.5">
        <Avatar name={row.customer} src={row.customerAvatar} size="sm" />
        <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">
          {row.customer}
        </span>
      </div>
    ),
  },
  {
    key: "delivery",
    header: "Delivery / Channel",
    render: (row) => (
      <span className="text-xs text-slate-500 font-medium">{row.delivery}</span>
    ),
  },
  {
    key: "total",
    header: "Amount",
    render: (row) => (
      <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
        {row.total}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <Badge
        variant={
          row.status === "Completed"
            ? "success"
            : row.status === "Dispatched"
            ? "info"
            : row.status === "Pending"
            ? "warning"
            : "error"
        }
      >
        {row.status}
      </Badge>
    ),
  },
];

export const DashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <DashboardLayout activeNavId="dashboard">
      {/* Main Executive Workspace with Apple Spacing & Breathable Gaps */}
      <div className="flex flex-col gap-8 pb-8">
        {/* 1. Header Bar with Pixel-Perfect Typography & Quick Actions */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="space-y-1">
            <h1 className="text-display font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Executive Dashboard
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Real-time revenue metrics, POS sales velocity, and inventory alerts.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/dashboard/reports">
              <Button size="sm" variant="outline" className="text-xs px-4 rounded-xl shadow-soft-sm">
                📈 View Reports
              </Button>
            </a>
            <a href="/pos">
              <Button size="sm" variant="primary" className="text-xs px-4 rounded-xl shadow-soft-md">
                ⚡ Express POS Terminal
              </Button>
            </a>
          </div>
        </div>

        {/* 2. 5 Glassmorphism Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
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

        {/* 3. Gemini AI Retail Insights (Purple Accent Glass Card) */}
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="glass-panel bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-3xl border border-purple-200/80 dark:border-purple-900/40 p-6 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4 border-b border-purple-100 dark:border-purple-950/60 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-soft-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  Gemini AI Retail Insights <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-mono font-bold">ChatGPT 4o Engine</span>
                </h3>
                <p className="text-xs text-slate-500">Autonomous grocery stock forecasting & demand predictions</p>
              </div>
            </div>

            <a href="/dashboard/ai-assistant">
              <Button size="sm" variant="primary" className="text-xs px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white border-none">
                <Bot className="w-4 h-4 mr-1.5 inline" /> Launch AI Assistant ➔
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 space-y-2.5"
            >
              <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold text-xs">
                <TrendingUp className="w-4 h-4" /> Demand Surge Warning
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Atta & Edible Oil demand is projected to rise +28% this weekend due to local festive holidays.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => alert("AI Recommendation Applied: Reordering Atta & Oil stock...")}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-[10px] hover:bg-purple-700 transition-all shadow-soft-sm"
                >
                  Auto-Reorder Stock ➔
                </button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 space-y-2.5"
            >
              <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold text-xs">
                <Zap className="w-4 h-4" /> Perishable Expiry Audit
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Mother Dairy Milk Batch #2026-06C expires in 2 days. 12 packets remain unsold.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => alert("AI Recommendation Applied: 15% Discount applied to Dairy Milk Batch!")}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-[10px] hover:bg-purple-700 transition-all shadow-soft-sm"
                >
                  Apply 15% Clearance 🏷️
                </button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 space-y-2.5"
            >
              <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold text-xs">
                <Bot className="w-4 h-4" /> Khata Risk Score
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Vikram Singh's Khata due balance (₹4,800) reached 48% of credit limit. Send automated reminder?
              </p>
              <div className="pt-1">
                <button
                  onClick={() => alert("WhatsApp Payment Reminder Statement dispatched to Vikram Singh!")}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-[10px] hover:bg-purple-700 transition-all shadow-soft-sm"
                >
                  Send WhatsApp Reminder 📲
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 4. Sales Overview Recharts ChartCard */}
        <ChartCard data={salesGraphData} />

        {/* 5. Bottom Grid Split (Recent Orders Datagrid vs Low Stock & Top Products Widgets) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Orders Datagrid (7 Cols) */}
          <motion.div
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="lg:col-span-7 glass-panel bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-card-title font-bold text-slate-900 dark:text-slate-100">
                    Recent Orders & POS Bills
                  </h3>
                  <p className="text-xs text-slate-500">Live cashier & online order stream</p>
                </div>
              </div>

              <a href="/dashboard/orders">
                <button className="px-3.5 py-1.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center gap-1 hover:bg-emerald-100 transition-all">
                  View All Orders <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </a>
            </div>

            {isLoading ? (
              <LoadingSkeleton rows={5} />
            ) : recentOrders.length === 0 ? (
              <EmptyState title="No Orders Found" description="New orders will appear here automatically." />
            ) : (
              <Table columns={orderColumns} data={recentOrders} />
            )}
          </motion.div>

          {/* Low Stock & Top Products Sidebar Widgets (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Low Stock Alert Widget */}
            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="glass-panel bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-3xl border border-red-200/80 dark:border-red-900/40 p-6 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4 border-b border-red-100 dark:border-red-950/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                      Low Stock Alerts
                    </h4>
                    <p className="text-[10px] text-red-500 font-semibold">Immediate reorder required</p>
                  </div>
                </div>

                <a href="/dashboard/inventory">
                  <Button size="sm" variant="outline" className="text-xs px-3 rounded-xl border-red-200 text-red-600 hover:bg-red-50">
                    Inventory ➔
                  </Button>
                </a>
              </div>

              <div className="flex flex-col gap-3">
                {lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-100/80 dark:border-red-900/40"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {item.name}
                      </h5>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-slate-400 font-mono">{item.id}</span>
                        <span className="text-[10px] text-slate-400">• {item.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.span
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="px-2.5 py-1 rounded-full bg-red-600 text-white font-mono font-bold text-xs shadow-soft-sm"
                      >
                        {item.currentStock} Left
                      </motion.span>

                      <button
                        onClick={() => alert(`Generated Purchase Order for ${item.name}`)}
                        className="p-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs transition-all shadow-soft-sm"
                        title="Reorder Stock"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Selling Products Widget */}
            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="glass-panel bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-500 flex items-center justify-center">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                      Top Selling Products
                    </h4>
                    <p className="text-[10px] text-slate-400">By sales volume & gross revenue</p>
                  </div>
                </div>
                <a href="/dashboard/products" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                  Catalog ➔
                </a>
              </div>

              <div className="flex flex-col gap-4">
                {topProducts.map((prod) => (
                  <motion.div
                    key={prod.id}
                    whileHover={{ scale: 1.01, x: 2 }}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/80 space-y-2 group transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                            {prod.name}
                          </h5>
                          <span className="text-[10px] text-slate-400 font-mono">{prod.soldQty}</span>
                        </div>
                      </div>
                      <span className="font-mono font-extrabold text-xs text-emerald-600 dark:text-emerald-400">
                        {prod.revenue}
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${prod.progressPct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
