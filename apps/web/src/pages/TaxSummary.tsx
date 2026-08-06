import React, { useState, useEffect } from "react";
import { PieChart, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const TaxSummaryPage: React.FC = () => {
  const [summary, setSummary] = useState<any>({
    gstin: "27AAACR1234A1Z5",
    monthlyCollected: 142850.5,
    inputTaxCredit: 34200.0,
    netTaxPayable: 108650.5,
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
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <PieChart className="w-7 h-7 text-emerald-400" /> Tax Summary & Net Liability Breakdown
            </h1>
            <p className="text-sm text-slate-400">Monthly Tax Liability, Input Tax Credit (ITC) offsets, and HSN code distribution</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700/60 space-y-3">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Output Tax Liability</div>
            <div className="text-3xl font-extrabold text-white">₹{summary.monthlyCollected?.toLocaleString()}</div>
            <p className="text-xs text-slate-500">Gross GST collected from retail customers on outward sales</p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700/60 space-y-3">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Input Tax Credit (ITC)</div>
            <div className="text-3xl font-extrabold text-blue-400">₹{summary.inputTaxCredit?.toLocaleString()}</div>
            <p className="text-xs text-slate-500">GST paid to registered suppliers on stock purchases</p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700/60 space-y-3">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Net Cash Tax Payable</div>
            <div className="text-3xl font-extrabold text-emerald-400">₹{summary.netTaxPayable?.toLocaleString()}</div>
            <p className="text-xs text-slate-500">Net tax payable to government cash ledger after ITC offset</p>
          </div>
        </div>

        {/* HSN Distribution Summary Table */}
        <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700/60 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> HSN Summary Table
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 font-bold uppercase">
                  <th className="py-2.5 px-3">HSN Code</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">UQC</th>
                  <th className="py-2.5 px-3">Total Qty</th>
                  <th className="py-2.5 px-3">Taxable Value</th>
                  <th className="py-2.5 px-3">GST Rate</th>
                  <th className="py-2.5 px-3 text-right">Total Tax Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                <tr className="hover:bg-slate-800">
                  <td className="py-3 px-3 font-mono font-bold">1512</td>
                  <td className="py-3 px-3">Edible Cooking Oils</td>
                  <td className="py-3 px-3 font-mono">LTR</td>
                  <td className="py-3 px-3 font-mono">480</td>
                  <td className="py-3 px-3 font-mono">₹76,800</td>
                  <td className="py-3 px-3 font-mono text-emerald-400">5%</td>
                  <td className="py-3 px-3 font-mono font-bold text-right">₹3,840</td>
                </tr>
                <tr className="hover:bg-slate-800">
                  <td className="py-3 px-3 font-mono font-bold">1101</td>
                  <td className="py-3 px-3">Wheat Flour (Atta)</td>
                  <td className="py-3 px-3 font-mono">KGS</td>
                  <td className="py-3 px-3 font-mono">850</td>
                  <td className="py-3 px-3 font-mono">₹42,500</td>
                  <td className="py-3 px-3 font-mono text-slate-400">0%</td>
                  <td className="py-3 px-3 font-mono font-bold text-right">₹0</td>
                </tr>
                <tr className="hover:bg-slate-800">
                  <td className="py-3 px-3 font-mono font-bold">3401</td>
                  <td className="py-3 px-3">Toilet Soaps & Shampoos</td>
                  <td className="py-3 px-3 font-mono">NOS</td>
                  <td className="py-3 px-3 font-mono">1,240</td>
                  <td className="py-3 px-3 font-mono">₹68,700</td>
                  <td className="py-3 px-3 font-mono text-purple-400">18%</td>
                  <td className="py-3 px-3 font-mono font-bold text-right">₹12,366</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TaxSummaryPage;
