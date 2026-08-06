import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  FileSpreadsheet,
  FileCode,
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  Truck,
  UserCheck,
  Receipt,
  RotateCcw,
  Calendar,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "@rishabh-store/ui";

interface ReportType {
  id: string;
  name: string;
  category: string;
  icon: any;
  description: string;
  recordsCount: number;
  lastGenerated: string;
}

const reportsList: ReportType[] = [
  {
    id: "sales",
    name: "Sales Report",
    category: "Financials & Revenue",
    icon: TrendingUp,
    description: "Detailed daily/monthly sales velocity, tax breakdown (CGST/SGST/IGST), and net margins.",
    recordsCount: 1420,
    lastGenerated: "Today at 02:15 PM",
  },
  {
    id: "purchase",
    name: "Purchase Report",
    category: "Procurement",
    icon: ShoppingBag,
    description: "Wholesale PO inward expenditure, supplier payments, and pending vendor dues.",
    recordsCount: 84,
    lastGenerated: "Yesterday at 06:00 PM",
  },
  {
    id: "inventory",
    name: "Inventory Report",
    category: "Stock Management",
    icon: Package,
    description: "Stock valuation, fast-moving SKUs, low stock warnings, and deadstock analysis.",
    recordsCount: 384,
    lastGenerated: "Today at 01:00 PM",
  },
  {
    id: "product",
    name: "Product Report",
    category: "Catalog Performance",
    icon: FileText,
    description: "SKU-level gross margins, sales volume, return rates, and pricing history.",
    recordsCount: 384,
    lastGenerated: "04 Aug 2026",
  },
  {
    id: "customer",
    name: "Customer Report",
    category: "CRM & Loyalty",
    icon: Users,
    description: "Customer lifetime value (LTV), VIP tier distribution, and loyalty points balances.",
    recordsCount: 1280,
    lastGenerated: "Today at 11:30 AM",
  },
  {
    id: "supplier",
    name: "Supplier Report",
    category: "Vendor Relations",
    icon: Truck,
    description: "Vendor directory, total purchases, pending bills, and credit limit utilization.",
    recordsCount: 12,
    lastGenerated: "03 Aug 2026",
  },
  {
    id: "employee",
    name: "Employee Report",
    category: "Staff & POS",
    icon: UserCheck,
    description: "Cashier billing performance, shift sales totals, drawer cash balance, and discounts issued.",
    recordsCount: 6,
    lastGenerated: "Today at 09:00 AM",
  },
  {
    id: "expense",
    name: "Expense Report",
    category: "Financials",
    icon: Receipt,
    description: "Store operational costs, rent, electricity, courier delivery fees, and staff wages.",
    recordsCount: 42,
    lastGenerated: "01 Aug 2026",
  },
  {
    id: "order",
    name: "Order Report",
    category: "Omnichannel Desk",
    icon: FileText,
    description: "Order status distribution (Pending, Confirmed, Out for Delivery, Delivered), channel split.",
    recordsCount: 1420,
    lastGenerated: "Today at 02:00 PM",
  },
  {
    id: "delivery",
    name: "Delivery Report",
    category: "Logistics",
    icon: RotateCcw,
    description: "Rider dispatch latency, average delivery time (10-Min Quick Commerce), and completion rates.",
    recordsCount: 310,
    lastGenerated: "Today at 01:45 PM",
  },
];

export const ReportsPage: React.FC = () => {
  const [selectedReportId, setSelectedReportId] = useState<string>("sales");
  const [exportFormat, setExportFormat] = useState<"PDF" | "Excel" | "CSV">("PDF");
  const [dateRange, setDateRange] = useState("This Month");
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const activeReport = reportsList.find((r) => r.id === selectedReportId) || reportsList[0];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setDownloadSuccess(false);
    setTimeout(() => {
      setIsGenerating(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1200);
  };

  return (
    <DashboardLayout activeNavId="reports">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <FileText className="w-8 h-8 text-emerald-600" />
              Business Intelligence & Reports Center
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Generate and export comprehensive PDF, Excel (.xlsx), and CSV business reports across 10 operational domains
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {(["PDF", "Excel", "CSV"] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setExportFormat(fmt)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  exportFormat === fmt
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {fmt === "PDF" && "📄 PDF"}
                {fmt === "Excel" && "📊 Excel (.xlsx)"}
                {fmt === "CSV" && "📝 CSV"}
              </button>
            ))}
          </div>
        </div>

        {/* Date Filter & Generator Banner */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Active Report Focus</span>
            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              {React.createElement(activeReport.icon, { className: "w-5 h-5 text-emerald-600" })}
              {activeReport.name}
            </h3>
            <p className="text-slate-500 text-xs max-w-xl">{activeReport.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold">
              <Calendar className="w-4 h-4 text-slate-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-transparent focus:outline-none text-slate-800 dark:text-slate-200 font-bold"
              >
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="Quarter 3 (2026)">Quarter 3 (2026)</option>
                <option value="Full Year 2026">Full Year 2026</option>
              </select>
            </div>

            <Button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Generating {exportFormat}...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download {exportFormat} Report
                </>
              )}
            </Button>
          </div>
        </div>

        {downloadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-bold rounded-2xl flex items-center justify-between shadow-md"
          >
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Successfully compiled and downloaded <strong>{activeReport.name}</strong> as <strong>{exportFormat}</strong> file ({dateRange}).
            </span>
          </motion.div>
        )}

        {/* 10 REPORTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {reportsList.map((report) => {
            const Icon = report.icon;
            const isSelected = selectedReportId === report.id;
            return (
              <motion.div
                key={report.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedReportId(report.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                    : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                        isSelected
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">{report.name}</h4>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{report.category}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    {report.recordsCount} Records
                  </span>
                </div>

                <p className="text-slate-500 text-xs mt-3 line-clamp-2">{report.description}</p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>Last generated: {report.lastGenerated}</span>
                  <span className={`font-bold ${isSelected ? "text-emerald-600" : "text-slate-500"}`}>
                    {isSelected ? "● Selected" : "Click to select"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
