import React, { useState } from "react";
import { FileText, Download, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const GSTReportsPage: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string>("GSTR-1");
  const [reportData, setReportData] = useState<any>({
    reportType: "GSTR-1",
    financialYear: "2026-2027",
    gstin: "27AAACR1234A1Z5",
    legalName: "Rishabh Provision Store",
    totalOutwardTaxableSupplies: 845000.0,
    totalIGST: 45000.0,
    totalCGST: 72000.0,
    totalSGST: 72000.0,
    totalCess: 4800.0,
    generatedAt: new Date().toISOString(),
  });

  const handleGenerateReport = async (type: string) => {
    setSelectedReport(type);
    try {
      const res = await fetch(`http://localhost:5001/api/v1/gst/report?type=${type}`);
      const json = await res.json();
      if (json.success) setReportData(json.data);
    } catch {
      setReportData((prev: any) => ({ ...prev, reportType: type }));
    }
  };

  return (
    <DashboardLayout activeNavId="settings">
      <div className="p-6 space-y-6 bg-slate-900 text-slate-100 min-h-screen rounded-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <FileText className="w-7 h-7 text-emerald-400" /> GSTR Tax Return Filing Manifest Generator
            </h1>
            <p className="text-sm text-slate-400">Generate GSTR-1, GSTR-2, GSTR-3B, Sales & Purchase Registers</p>
          </div>
        </div>

        {/* Report Selector Tabs */}
        <div className="flex gap-2 border-b border-slate-800 pb-2">
          {["GSTR-1", "GSTR-2", "GSTR-3B", "SALES_REGISTER", "PURCHASE_REGISTER"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleGenerateReport(tab)}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition ${
                selectedReport === tab
                  ? "bg-emerald-600 text-white border-emerald-500"
                  : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Report Manifest View */}
        <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700/60 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Official {reportData.reportType} Filing Manifest
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md">
              <Download className="w-4 h-4" /> Export JSON / CSV
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/40">
              <div className="text-slate-400 font-sans">GSTIN</div>
              <div className="text-base font-bold text-white mt-1">{reportData.gstin}</div>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/40">
              <div className="text-slate-400 font-sans">Financial Year</div>
              <div className="text-base font-bold text-white mt-1">{reportData.financialYear}</div>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/40">
              <div className="text-slate-400 font-sans">Taxable Value</div>
              <div className="text-base font-bold text-emerald-400 mt-1">₹{reportData.totalOutwardTaxableSupplies?.toLocaleString()}</div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Central Tax (CGST 50%):</span>
              <span className="font-bold text-white">₹{reportData.totalCGST?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">State Tax (SGST 50%):</span>
              <span className="font-bold text-white">₹{reportData.totalSGST?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Integrated Tax (IGST 100%):</span>
              <span className="font-bold text-blue-400">₹{reportData.totalIGST?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 pt-2 font-bold text-sm text-emerald-400">
              <span>Total Tax Liability Output:</span>
              <span>₹{(reportData.totalCGST + reportData.totalSGST + reportData.totalIGST)?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GSTReportsPage;
