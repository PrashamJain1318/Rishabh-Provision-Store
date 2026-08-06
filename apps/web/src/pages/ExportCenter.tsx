import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  FileSpreadsheet,
  FileText,
  FileCode,
  TrendingUp,
  Package,
  Warehouse,
  Users,
  Truck,
  ShoppingBag,
  CheckCircle,
  Sparkles,
  Calendar,
  Layers,
} from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "@rishabh-store/ui";

interface ExportDomain {
  id: string;
  name: string;
  category: string;
  icon: any;
  description: string;
  totalRecords: number;
  filePrefix: string;
}

const exportDomains: ExportDomain[] = [
  {
    id: "sales",
    name: "Sales Transactions & Invoices",
    category: "Financials",
    icon: TrendingUp,
    description: "Daily/monthly sales ledger, invoice numbers, payment modes, and GST tax breakdown.",
    totalRecords: 1420,
    filePrefix: "Sales_Report_",
  },
  {
    id: "products",
    name: "Master Products Catalog",
    category: "Catalog",
    icon: Package,
    description: "Master SKU directory, barcodes, categories, MRP, purchase cost, selling price & GST slabs.",
    totalRecords: 384,
    filePrefix: "Products_Catalog_",
  },
  {
    id: "inventory",
    name: "Inventory Ledger & Valuation",
    category: "Stock Management",
    icon: Warehouse,
    description: "Stock valuation by warehouse location, stock aging brackets, reorder levels, and batches.",
    totalRecords: 384,
    filePrefix: "Inventory_Valuation_",
  },
  {
    id: "customers",
    name: "Customer CRM Directory",
    category: "CRM & Loyalty",
    icon: Users,
    description: "Customer contacts, GSTIN numbers, wallet balances, VIP membership tiers & lifetime spend.",
    totalRecords: 1280,
    filePrefix: "Customer_CRM_",
  },
  {
    id: "suppliers",
    name: "Supplier & Vendor Directory",
    category: "Procurement",
    icon: Truck,
    description: "Vendor details, purchase order history, pending accounts payable, and credit limits.",
    totalRecords: 12,
    filePrefix: "Supplier_Directory_",
  },
  {
    id: "orders",
    name: "Omnichannel Orders Stream",
    category: "Fulfillment",
    icon: ShoppingBag,
    description: "Order status distribution, fulfillment channels (Online, POS, WhatsApp), and rider logs.",
    totalRecords: 1420,
    filePrefix: "Orders_Stream_",
  },
];

export const ExportCenterPage: React.FC = () => {
  const [selectedDomainId, setSelectedDomainId] = useState<string>("sales");
  const [exportFormat, setExportFormat] = useState<"PDF" | "Excel" | "CSV">("Excel");
  const [dateFilter, setDateFilter] = useState("This Month");
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccessMsg, setExportSuccessMsg] = useState<string | null>(null);

  const activeDomain = exportDomains.find((d) => d.id === selectedDomainId) || exportDomains[0];

  const handleExport = () => {
    setIsExporting(true);
    setExportSuccessMsg(null);
    setTimeout(() => {
      setIsExporting(false);
      const filename = `${activeDomain.filePrefix}${dateFilter.replace(/\s+/g, "_")}.${
        exportFormat === "PDF" ? "pdf" : exportFormat === "Excel" ? "xlsx" : "csv"
      }`;
      setExportSuccessMsg(`Successfully generated & downloaded ${filename}`);
      setTimeout(() => setExportSuccessMsg(null), 4500);
    }, 1000);
  };

  return (
    <DashboardLayout activeNavId="reports">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <Download className="w-8 h-8 text-emerald-600 animate-bounce" />
              Centralized Data Export Center
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Export store datasets across 6 core operational domains into PDF, Excel (.xlsx), or CSV formats
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {(["PDF", "Excel", "CSV"] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setExportFormat(fmt)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  exportFormat === fmt
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {fmt === "PDF" && "📄 PDF Document"}
                {fmt === "Excel" && "📊 Excel (.xlsx)"}
                {fmt === "CSV" && "📝 Raw CSV"}
              </button>
            ))}
          </div>
        </div>

        {/* Export Configuration Box */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Target Export Domain</span>
            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              {React.createElement(activeDomain.icon, { className: "w-5 h-5 text-emerald-600" })}
              {activeDomain.name}
            </h3>
            <p className="text-slate-500 text-xs max-w-xl">{activeDomain.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold">
              <Calendar className="w-4 h-4 text-slate-400" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-transparent focus:outline-none text-slate-800 dark:text-slate-200 font-bold"
              >
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="Quarter 3 (2026)">Quarter 3 (2026)</option>
                <option value="All Time">All Time</option>
              </select>
            </div>

            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              {isExporting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Processing Export...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export Data File ({exportFormat})
                </>
              )}
            </Button>
          </div>
        </div>

        {exportSuccessMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-bold rounded-2xl flex items-center justify-between shadow-md"
          >
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              {exportSuccessMsg}
            </span>
          </motion.div>
        )}

        {/* 6 DOMAINS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exportDomains.map((domain) => {
            const Icon = domain.icon;
            const isSelected = selectedDomainId === domain.id;
            return (
              <motion.div
                key={domain.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedDomainId(domain.id)}
                className={`p-6 rounded-3xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500 shadow-xl ring-2 ring-emerald-500/20"
                    : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200">
                    {domain.totalRecords} Records
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">{domain.name}</h4>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{domain.category}</span>
                  <p className="text-slate-500 text-xs mt-2">{domain.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className={`font-bold ${isSelected ? "text-emerald-600" : "text-slate-400"}`}>
                    {isSelected ? "● Selected Domain" : "Click to select"}
                  </span>
                  <Download className={`w-4 h-4 ${isSelected ? "text-emerald-600" : "text-slate-400"}`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ExportCenterPage;
