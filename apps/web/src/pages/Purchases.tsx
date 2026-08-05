import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, ShoppingBag, Truck, CheckCircle, Clock, FileText, Calendar, DollarSign, ArrowRight, Check, X } from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "@rishabh-store/ui";

interface PurchaseInwardItem {
  id: string;
  invoiceNumber: string;
  supplierName: string;
  productName: string;
  sku: string;
  quantity: number;
  purchasePrice: number;
  totalAmount: number;
  batchNumber: string;
  expiryDate: string;
  paymentStatus: "Paid" | "Pending" | "Partial";
  timestamp: string;
}

const initialPurchases: PurchaseInwardItem[] = [
  {
    id: "PUR-001",
    invoiceNumber: "INV-9821-ITC",
    supplierName: "ITC Grocery Wholesalers Ltd",
    productName: "Aashirvaad Shudh Chakki Atta 5kg",
    sku: "ATT-AASH-5KG",
    quantity: 50,
    purchasePrice: 210,
    totalAmount: 10500,
    batchNumber: "BAT-ATT-2026A",
    expiryDate: "2026-11-30",
    paymentStatus: "Paid",
    timestamp: "2026-08-03 02:15 PM",
  },
  {
    id: "PUR-002",
    invoiceNumber: "INV-5541-AMUL",
    supplierName: "Amul Anand Dairy Union Co",
    productName: "Amul Pasteurised Cow Butter 500g",
    sku: "BUT-AMUL-500G",
    quantity: 30,
    purchasePrice: 240,
    totalAmount: 7200,
    batchNumber: "BAT-AMUL-2026C",
    expiryDate: "2026-09-15",
    paymentStatus: "Pending",
    timestamp: "2026-08-05 11:45 AM",
  },
];

export const PurchasesPage: React.FC = () => {
  const [purchases, setPurchases] = useState<PurchaseInwardItem[]>(initialPurchases);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State following strict Supplier -> Invoice -> Product -> Quantity -> Batch -> Expiry -> Stock Update flow
  const [supplierName, setSupplierName] = useState("ITC Grocery Wholesalers Ltd");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [productName, setProductName] = useState("Fortune Kachi Ghani Mustard Oil 1L");
  const [sku, setSku] = useState("OIL-FORT-1L");
  const [quantity, setQuantity] = useState("40");
  const [purchasePrice, setPurchasePrice] = useState("128");
  const [batchNumber, setBatchNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"Paid" | "Pending" | "Partial">("Pending");

  const handleInwardPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceNumber.trim() || !batchNumber.trim() || !expiryDate) return;

    const qtyNum = parseInt(quantity) || 1;
    const priceNum = parseFloat(purchasePrice) || 0;
    const totalAmt = qtyNum * priceNum;

    const newPurchase: PurchaseInwardItem = {
      id: `PUR-00${purchases.length + 1}`,
      invoiceNumber: invoiceNumber.toUpperCase(),
      supplierName,
      productName,
      sku,
      quantity: qtyNum,
      purchasePrice: priceNum,
      totalAmount: totalAmt,
      batchNumber,
      expiryDate,
      paymentStatus,
      timestamp: new Date().toLocaleString("en-IN"),
    };

    setPurchases([newPurchase, ...purchases]);
    setInvoiceNumber("");
    setBatchNumber("");
    setExpiryDate("");
    setIsModalOpen(false);
  };

  const filteredPurchases = purchases.filter(
    (p) =>
      p.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.batchNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout activeNavId="suppliers">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-emerald-600" />
              Purchase Inward & Inventory Auto-Stock Update
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Flow: Supplier ➔ Invoice ➔ Products ➔ Quantity ➔ Batch ➔ Expiry ➔ Automatic Stock & Ledger Update
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            New Purchase Inward
          </Button>
        </div>

        {/* Search */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search purchases by Invoice #, Supplier, or Batch code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            Inward Invoices: {purchases.length}
          </span>
        </div>

        {/* Table Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Invoice # & Supplier</th>
                  <th className="py-4 px-6">Inward Product</th>
                  <th className="py-4 px-6 text-center">Qty Inward (+)</th>
                  <th className="py-4 px-6 font-mono">Batch Code & Expiry</th>
                  <th className="py-4 px-6">Invoice Total (₹)</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Inward Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredPurchases.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900 dark:text-slate-100 font-mono text-xs">{p.invoiceNumber}</p>
                      <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                        <Truck className="w-3 h-3 text-emerald-600" />
                        {p.supplierName}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900 dark:text-slate-100">{p.productName}</p>
                      <span className="font-mono text-[10px] text-slate-400">{p.sku}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-extrabold rounded-full">
                        +{p.quantity} Units
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono">
                      <p className="font-bold text-slate-800 dark:text-slate-200">{p.batchNumber}</p>
                      <p className="text-slate-400 text-[10px]">EXP: {p.expiryDate}</p>
                    </td>
                    <td className="py-4 px-6 font-extrabold text-sm text-slate-900 dark:text-slate-100">
                      ₹{p.totalAmount.toLocaleString("en-IN")}
                      <p className="text-[10px] text-slate-400 font-normal">@ ₹{p.purchasePrice}/unit</p>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.paymentStatus === "Paid"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        {p.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-mono text-[11px] text-slate-400">{p.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Purchase Inward Modal Wizard */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-xl shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-emerald-600" />
                    Process Purchase Inward & Auto-Stock Update
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleInwardPurchase} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        1. Supplier Selection *
                      </label>
                      <select
                        value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                      >
                        <option value="ITC Grocery Wholesalers Ltd">ITC Grocery Wholesalers Ltd</option>
                        <option value="Adani Wilmar Edible Oils Supply">Adani Wilmar Edible Oils Supply</option>
                        <option value="Amul Anand Dairy Union Co">Amul Anand Dairy Union Co</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        2. Invoice Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. INV-2026-8891"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      3. Target Product *
                    </label>
                    <select
                      value={sku}
                      onChange={(e) => {
                        setSku(e.target.value);
                        if (e.target.value === "OIL-FORT-1L") setProductName("Fortune Kachi Ghani Mustard Oil 1L");
                        if (e.target.value === "ATT-AASH-5KG") setProductName("Aashirvaad Shudh Chakki Atta 5kg");
                      }}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
                    >
                      <option value="OIL-FORT-1L">Fortune Kachi Ghani Mustard Oil 1L (OIL-FORT-1L)</option>
                      <option value="ATT-AASH-5KG">Aashirvaad Shudh Chakki Atta 5kg (ATT-AASH-5KG)</option>
                      <option value="BUT-AMUL-500G">Amul Pasteurised Cow Butter 500g (BUT-AMUL-500G)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        4. Quantity Inward *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="50"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Purchase Unit Price (₹) *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="128"
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        5. Batch Code *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="BAT-2026-AUG-01"
                        value={batchNumber}
                        onChange={(e) => setBatchNumber(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        6. Expiry Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                    <span>
                      Total Inward Invoice Value: <strong>₹{(parseInt(quantity) || 0) * (parseFloat(purchasePrice) || 0)}</strong>
                    </span>
                    <span className="font-bold flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      Auto-Updates Product Stock
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-5 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl font-semibold shadow-lg shadow-emerald-500/20"
                    >
                      Process Inward & Update Stock
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default PurchasesPage;
