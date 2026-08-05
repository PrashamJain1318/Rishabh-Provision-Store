import React, { useState, useEffect, useRef } from "react";
import { Button, Modal } from "@rishabh-store/ui";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Tag,
  UserCheck,
  Printer,
  CheckCircle,
  PauseCircle,
  RotateCcw,
  CreditCard,
  QrCode,
  DollarSign,
  Receipt,
  Keyboard,
  AlertCircle,
  Barcode,
  Edit3,
  FileText,
  Lock,
  Percent,
  Calculator,
} from "lucide-react";

interface POSProduct {
  id: string;
  code: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  mrp: number;
  gst: number;
  stock: number;
  image: string;
}

interface CartItem {
  id: string;
  code: string;
  sku: string;
  name: string;
  price: number;
  originalPrice: number;
  gst: number;
  qty: number;
}

const posCatalog: POSProduct[] = [
  { id: "P1", code: "8901058000123", sku: "ATT-AASH-5KG", name: "Aashirvaad Shudh Chakki Atta 5kg", brand: "Aashirvaad", category: "Atta & Flours", price: 245, mrp: 275, gst: 0, stock: 145, image: "https://images.unsplash.com/photo-1574323758207-f60101053e2c?w=300" },
  { id: "P2", code: "8906007280054", sku: "OIL-FORT-1L", name: "Fortune Kachi Ghani Mustard Oil 1L", brand: "Fortune", category: "Edible Oils", price: 142, mrp: 165, gst: 5, stock: 82, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300" },
  { id: "P3", code: "8901262010052", sku: "BUT-AMUL-500G", name: "Amul Pasteurised Cow Butter 500g", brand: "Amul", category: "Dairy & Chilled", price: 275, mrp: 280, gst: 12, stock: 48, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300" },
  { id: "P4", code: "890103005005", sku: "DET-SURF-1KG", name: "Surf Excel Easy Wash Detergent 1kg", brand: "Hindustan Unilever", category: "Cleaning", price: 140, mrp: 155, gst: 18, stock: 12, image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300" },
  { id: "P5", code: "890102009009", sku: "DRK-COCA-2L", name: "Coca Cola Soft Drink 2.25L Bottle", brand: "Coca Cola", category: "Beverages", price: 95, mrp: 99, gst: 28, stock: 65, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300" },
];

export const POSPage: React.FC = () => {
  const [rawSearchQuery, setRawSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([
    { id: "P1", code: "8901058000123", sku: "ATT-AASH-5KG", name: "Aashirvaad Shudh Chakki Atta 5kg", price: 245, originalPrice: 245, gst: 0, qty: 1 },
    { id: "P2", code: "8906007280054", sku: "OIL-FORT-1L", name: "Fortune Kachi Ghani Mustard Oil 1L", price: 142, originalPrice: 142, gst: 5, qty: 1 },
    { id: "P3", code: "8901262010052", sku: "BUT-AMUL-500G", name: "Amul Pasteurised Cow Butter 500g", price: 275, originalPrice: 275, gst: 12, qty: 1 },
    { id: "P5", code: "890102009009", sku: "DRK-COCA-2L", name: "Coca Cola Soft Drink 2.25L Bottle", price: 95, originalPrice: 95, gst: 28, qty: 1 },
  ]);

  const [saleType, setSaleType] = useState<"INTRA_STATE" | "INTER_STATE">("INTRA_STATE");
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [completedBillNo, setCompletedBillNo] = useState("");

  const addToCart = (product: POSProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [
        ...prev,
        { id: product.id, code: product.code, sku: product.sku, name: product.name, price: product.price, originalPrice: product.price, gst: product.gst, qty: 1 },
      ];
    });
  };

  // AUTOMATED GST CALCULATIONS (Taxable Value, CGST, SGST, IGST, Grand Total)
  const taxableValue = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const totalGstAmount = cart.reduce((sum, item) => {
    const lineTotal = item.price * item.qty;
    return sum + (lineTotal * item.gst) / 100;
  }, 0);

  const cgst = saleType === "INTRA_STATE" ? totalGstAmount / 2 : 0;
  const sgst = saleType === "INTRA_STATE" ? totalGstAmount / 2 : 0;
  const igst = saleType === "INTER_STATE" ? totalGstAmount : 0;
  const grandTotal = Math.round(taxableValue + totalGstAmount);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between shadow-soft-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-lg shadow-soft-sm">
            ⚡
          </div>
          <div>
            <h2 className="font-extrabold text-base text-white">Rishabh Express POS Terminal #1</h2>
            <p className="text-xs text-slate-400">Automated Indian GST Engine: 0%, 5%, 12%, 18%, 28% (CGST + SGST / IGST)</p>
          </div>
        </div>

        <a href="/dashboard">
          <Button size="sm" className="bg-slate-800 text-white hover:bg-slate-700 font-bold rounded-xl">
            Exit ➔
          </Button>
        </a>
      </header>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* Left Column: Product Grid */}
        <div className="lg:col-span-7 border-r border-slate-800 p-6 flex flex-col gap-4 overflow-y-auto">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input
              type="text"
              value={rawSearchQuery}
              onChange={(e) => setRawSearchQuery(e.target.value)}
              placeholder="🔍 Search products or scan barcode..."
              className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-400 text-sm pl-12 pr-4 py-3 rounded-2xl font-mono"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto">
            {posCatalog.map((prod) => (
              <div
                key={prod.id}
                onClick={() => addToCart(prod)}
                className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-3 flex flex-col justify-between cursor-pointer transition-all shadow-soft-sm group"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <img src={prod.image} alt={prod.name} className="w-11 h-11 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 line-clamp-1">{prod.name}</h4>
                    <span className="text-[10px] text-emerald-400 font-mono">{prod.sku} • {prod.gst}% GST</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-2 mt-1">
                  <span className="text-sm font-extrabold text-emerald-400 font-mono">₹{prod.price}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono">
                    {prod.stock} in stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Automated GST Engine Breakdown (5 Cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-900 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" /> Automated GST Tax Computation
            </h3>

            {/* INTRA-STATE VS INTER-STATE SELECTOR */}
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-bold">Tax Jurisdiction:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSaleType("INTRA_STATE")}
                  className={`px-3 py-1 rounded-xl font-bold transition-all ${
                    saleType === "INTRA_STATE" ? "bg-emerald-600 text-white" : "bg-slate-900 text-slate-400"
                  }`}
                >
                  Intra-State (CGST+SGST)
                </button>
                <button
                  onClick={() => setSaleType("INTER_STATE")}
                  className={`px-3 py-1 rounded-xl font-bold transition-all ${
                    saleType === "INTER_STATE" ? "bg-blue-600 text-white" : "bg-slate-900 text-slate-400"
                  }`}
                >
                  Inter-State (IGST)
                </button>
              </div>
            </div>

            {/* GST FINANCIAL BREAKDOWN BOX */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2.5 text-xs font-mono text-slate-300">
              <div className="flex justify-between font-bold text-slate-100">
                <span>Taxable Value (Subtotal):</span>
                <span>₹{taxableValue.toFixed(2)}</span>
              </div>

              {saleType === "INTRA_STATE" ? (
                <>
                  <div className="flex justify-between text-emerald-400">
                    <span>CGST (Central Tax):</span>
                    <span>+ ₹{cgst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>SGST (State Tax):</span>
                    <span>+ ₹{sgst.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-blue-400">
                  <span>IGST (Integrated Tax):</span>
                  <span>+ ₹{igst.toFixed(2)}</span>
                </div>
              )}

              <div className="bg-emerald-950 border border-emerald-800/60 rounded-xl p-3 text-center mt-3">
                <span className="text-[10px] uppercase text-emerald-300 font-extrabold tracking-wider">Grand Total (Inclusive)</span>
                <div className="text-3xl font-extrabold text-white font-mono mt-0.5">₹{grandTotal}.00</div>
              </div>
            </div>
          </div>

          <Button
            disabled={cart.length === 0}
            onClick={() => {
              setCompletedBillNo(`INV-2026-${Math.floor(1000 + Math.random() * 9000)}`);
              setShowReceiptModal(true);
            }}
            className="w-full mt-4 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20"
          >
            <Printer className="w-4 h-4 mr-2 inline" /> Checkout & Thermal Print
          </Button>
        </div>
      </div>

      {/* ESC/POS Thermal Receipt Modal with Full GST Breakdown */}
      <Modal isOpen={showReceiptModal} onClose={() => setShowReceiptModal(false)} title="GST Tax Invoice Thermal Print">
        <div className="text-center space-y-4 text-slate-900 dark:text-slate-100">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 text-2xl flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-mono">TAX INVOICE {completedBillNo}</h3>
            <p className="text-xs text-slate-500">GSTIN: 27AAACI1681G1ZM</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 text-left font-mono text-xs space-y-2 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between"><span>Taxable Value:</span><span>₹{taxableValue.toFixed(2)}</span></div>
            {saleType === "INTRA_STATE" ? (
              <>
                <div className="flex justify-between text-emerald-600"><span>CGST:</span><span>₹{cgst.toFixed(2)}</span></div>
                <div className="flex justify-between text-emerald-600"><span>SGST:</span><span>₹{sgst.toFixed(2)}</span></div>
              </>
            ) : (
              <div className="flex justify-between text-blue-600"><span>IGST:</span><span>₹{igst.toFixed(2)}</span></div>
            )}
            <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 font-bold text-sm text-emerald-600 dark:text-emerald-400">
              <span>Grand Total:</span>
              <span>₹{grandTotal}.00</span>
            </div>
          </div>

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold" onClick={() => { setShowReceiptModal(false); setCart([]); }}>
            <Printer className="w-4 h-4 mr-2 inline" /> Print Official GST Receipt
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default POSPage;
