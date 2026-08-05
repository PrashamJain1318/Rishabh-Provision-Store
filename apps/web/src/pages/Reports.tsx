import React from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardCard, Button } from "@rishabh-store/ui";

export const ReportsPage: React.FC = () => {
  return (
    <DashboardLayout activeNavId="reports">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-section-title text-slate-900 dark:text-slate-100 font-bold">Business Intelligence & GSTR Reports</h1>
            <p className="text-sm text-slate-500">Sales velocity charts, category revenue breakdown, P&L statements, and GSTR tax exports.</p>
          </div>
          <Button variant="outline">📥 Export GSTR-1 Excel</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <DashboardCard title="Monthly Turnover" value="₹ 4,85,200" subtitle="August 2026" icon="📊" trend={{ value: "18.4%", positive: true }} />
          <DashboardCard title="Total GST Collected" value="₹ 24,260" subtitle="CGST (2.5%) + SGST (2.5%)" icon="🏛️" />
          <DashboardCard title="Net Operating Profit" value="₹ 92,400" subtitle="Margin ~ 19.0%" icon="💰" trend={{ value: "5.2%", positive: true }} />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center shadow-soft-sm">
          <div className="text-4xl mb-3">📈</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Interactive Analytics Graphs</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">Recharts and ApexCharts analytical trend graphs will display live sales trends, category revenue breakdown, and peak cashier billing hours.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
