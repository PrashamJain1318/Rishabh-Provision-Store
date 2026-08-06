import React, { useState, useEffect } from "react";
import { Receipt, TrendingUp, DollarSign, FileText, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";

interface GSTSummaryData {
  gstin: string;
  pan: string;
  businessName: string;
  stateCode: string;
  monthlyCollected: number;
  monthlyLiability: number;
  inputTaxCredit: number;
  netTaxPayable: number;
  totalTransactions: number;
}

export const GSTDashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<GSTSummaryData>({
    gstin: "27AAACR1234A1Z5",
    pan: "AAACR1234A",
    businessName: "Rishabh Provision Store",
    stateCode: "27",
    monthlyCollected: 142850.5,
    monthlyLiability: 142850.5,
    inputTaxCredit: 34200.0,
    netTaxPayable: 108650.5,
    totalTransactions: 428,
  });

  useEffect(() => {
    fetch("http://localhost:5001/api/v1/gst/summary")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setSummary(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <DashboardLayout activeNavId="settings">
      <div className="p-6 space-y-6 bg-slate-900 text-slate-100 min-h-screen rounded-2xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Receipt className="w-7 h-7 text-emerald-400" /> GST & Tax Compliance Analytics
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Indian GST Tax Engine, Intra-State (CGST+SGST) vs Inter-State (IGST) split, GSTR-1/2/3B manifests
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-400">
            <CheckCircle2 className="w-4 h-4" /> GSTIN: {summary.gstin} (State {summary.stateCode})
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/60">
            <div className="flex justify-between items-center text-slate-400 text-sm mb-2">
              <span>Total GST Collected</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">₹{summary.monthlyCollected.toLocaleString()}</div>
            <div className="text-xs text-slate-400 mt-1">Outward Supplies Sales GST</div>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/60">
            <div className="flex justify-between items-center text-slate-400 text-sm mb-2">
              <span>Input Tax Credit (ITC)</span>
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-extrabold text-blue-400">₹{summary.inputTaxCredit.toLocaleString()}</div>
            <div className="text-xs text-slate-400 mt-1">Purchase Claimable ITC</div>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/60">
            <div className="flex justify-between items-center text-slate-400 text-sm mb-2">
              <span>Net Tax Payable</span>
              <FileText className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-amber-400">₹{summary.netTaxPayable.toLocaleString()}</div>
            <div className="text-xs text-slate-400 mt-1">Collected GST minus ITC</div>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/60">
            <div className="flex justify-between items-center text-slate-400 text-sm mb-2">
              <span>Tax Transactions</span>
              <Receipt className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-extrabold text-purple-400">{summary.totalTransactions} Invoices</div>
            <div className="text-xs text-slate-400 mt-1">B2B & B2C Compliant Invoices</div>
          </div>
        </div>

        {/* GST Tax Breakdown */}
        <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700/60 space-y-4">
          <h2 className="text-lg font-bold text-white">Monthly Tax Slab Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/40">
              <div className="text-xs text-slate-400">0% Exempt Goods</div>
              <div className="text-xl font-bold text-slate-200 mt-1">₹42,500</div>
              <div className="text-[10px] text-slate-500">Unprocessed Grains, Milk</div>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/40">
              <div className="text-xs text-slate-400">5% Slab (Essential Grocery)</div>
              <div className="text-xl font-bold text-emerald-400 mt-1">₹28,450</div>
              <div className="text-[10px] text-slate-500">Edible Oil, Sugar, Spices</div>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/40">
              <div className="text-xs text-slate-400">12% Slab (Packaged Foods)</div>
              <div className="text-xl font-bold text-blue-400 mt-1">₹45,200</div>
              <div className="text-[10px] text-slate-500">Butter, Cheese, Dry Fruits</div>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/40">
              <div className="text-xs text-slate-400">18% Slab (Personal Care)</div>
              <div className="text-xl font-bold text-purple-400 mt-1">₹68,700</div>
              <div className="text-[10px] text-slate-500">Soaps, Detergents, Shampoos</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GSTDashboardPage;
