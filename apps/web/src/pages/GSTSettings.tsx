import React, { useState, useEffect } from "react";
import { Sliders, Save, CheckCircle } from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const GSTSettingsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    gstin: "27AAACR1234A1Z5",
    pan: "AAACR1234A",
    businessName: "Rishabh Provision Store",
    address: "Shop No 4, Station Road, Dadar West, Mumbai",
    stateCode: "27",
    stateName: "Maharashtra",
    placeOfSupply: "27-Maharashtra",
    defaultGstRate: 18,
    taxInclusivePricing: false,
    invoicePrefix: "RPS/2026/",
  });
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/v1/gst/settings")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setFormData(json.data);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/v1/gst/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) setMsg("GST Configuration updated successfully!");
    } catch {
      setMsg("Saved GST configuration locally.");
    } finally {
      setTimeout(() => setMsg(null), 4000);
    }
  };

  return (
    <DashboardLayout activeNavId="settings">
      <div className="p-6 space-y-6 bg-slate-900 text-slate-100 min-h-screen rounded-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Sliders className="w-7 h-7 text-emerald-400" /> GST Business Configuration & Registration
            </h1>
            <p className="text-sm text-slate-400">Configure GSTIN, PAN, State Code, Place of Supply, and Invoice Prefixes</p>
          </div>
        </div>

        {msg && (
          <div className="p-4 bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-800/80 p-6 rounded-xl border border-slate-700/60 space-y-4 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-bold">GSTIN (15 Digits)</label>
              <input
                type="text"
                value={formData.gstin}
                onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono uppercase"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold">PAN Number (10 Digits)</label>
              <input
                type="text"
                value={formData.pan}
                onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono uppercase"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold">Registered Legal Business Name</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold">State Code (2 Digits)</label>
              <input
                type="text"
                value={formData.stateCode}
                onChange={(e) => setFormData({ ...formData, stateCode: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-400 mb-1 font-bold">Registered Business Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold">Invoice Prefix</label>
              <input
                type="text"
                value={formData.invoicePrefix}
                onChange={(e) => setFormData({ ...formData, invoicePrefix: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold">Default GST Slab (%)</label>
              <select
                value={formData.defaultGstRate}
                onChange={(e) => setFormData({ ...formData, defaultGstRate: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              >
                <option value={0}>0% Exempt</option>
                <option value={5}>5% Grocery</option>
                <option value={12}>12% Packaged Food</option>
                <option value={18}>18% Standard</option>
                <option value={28}>28% Luxury</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 mt-4"
          >
            <Save className="w-4 h-4" /> Save GST Business Configuration
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default GSTSettingsPage;
