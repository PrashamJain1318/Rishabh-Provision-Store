import React from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardCard, Table, Column } from "@rishabh-store/ui";

interface RecentBill {
  billNo: string;
  customer: string;
  total: string;
  paymentMode: string;
  time: string;
}

const recentBills: RecentBill[] = [
  { billNo: "#BILL-1043", customer: "Walk-in Cashier", total: "₹ 450.00", paymentMode: "Cash", time: "2 mins ago" },
  { billNo: "#BILL-1042", customer: "Rahul Sharma", total: "₹ 1,280.00", paymentMode: "UPI / QR", time: "15 mins ago" },
  { billNo: "#BILL-1041", customer: "Ramesh Kumar (Khata)", total: "₹ 650.00", paymentMode: "Udhar Credit", time: "42 mins ago" },
  { billNo: "#BILL-1040", customer: "Priya Patel", total: "₹ 340.00", paymentMode: "Cash", time: "1 hour ago" },
];

const columns: Column<RecentBill>[] = [
  { key: "billNo", header: "Invoice No" },
  { key: "customer", header: "Customer / Source" },
  { key: "total", header: "Total Amount" },
  {
    key: "paymentMode",
    header: "Payment Mode",
    render: (row) => (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        row.paymentMode === "Cash" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" :
        row.paymentMode.includes("UPI") ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" :
        "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
      }`}>
        {row.paymentMode}
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-section-title text-slate-900 dark:text-slate-100 font-bold">Executive Dashboard</h1>
            <p className="text-sm text-slate-500">Live sales performance, active Khata dues, and stock health.</p>
          </div>
          <a href="/pos">
            <button className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-soft-sm transition-all">
              ⚡ Open POS Terminal
            </button>
          </a>
        </div>

        {/* 4 Glassmorphism Analytics Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Today's Sales" value="₹ 24,850" subtitle="142 bills completed" icon="📈" trend={{ value: "14.2%", positive: true }} />
          <DashboardCard title="Gross Profit (Est)" value="₹ 4,920" subtitle="Margin ~ 19.8%" icon="💸" trend={{ value: "8.5%", positive: true }} />
          <DashboardCard title="Khata Credit Dues" value="₹ 12,400" subtitle="18 active debtors" icon="📒" trend={{ value: "2.1%", positive: false }} />
          <DashboardCard title="Low Stock Alerts" value="8 Items" subtitle="Requires reordering" icon="⚠️" trend={{ value: "3 Items", positive: false }} />
        </div>

        {/* Recent Bills Datagrid Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-card-title font-bold text-slate-900 dark:text-slate-100">Recent POS Billing Transactions</h3>
            <a href="/orders" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">View All Transactions ➔</a>
          </div>
          <Table columns={columns} data={recentBills} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
