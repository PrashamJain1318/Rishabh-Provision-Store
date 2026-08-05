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
  Wallet,
  Globe,
  ArrowRight,
  Check,
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

type PaymentMethod = "Cash" | "UPI" | "Credit Card" | "Debit Card" | "Net Banking" | "Wallet" | "Split Payment";

const posCatalog: POSProduct[] = [
  { id: "P1", code: "8901058000123", sku: "ATT-AASH-5KG", name: "Aashirvaad Shudh Chakki Atta 5kg", brand: "Aashirvaad", category: "Atta & Flours", price: 245, mrp: 275, gst: 0, stock: 145, image: "https://images.unsplash.com/photo-1574323758207-f60101053e2c?w=300" },
  { id: "P2", code: "8906007280054", sku: "OIL-FORT-1L", name: "Fortune Kachi Ghani Mustard Oil 1L", brand: "Fortune", category: "Edible Oils", price: 142, mrp: 165, gst: 5, stock: 82, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300" },
  { id: "P3", code: "8901262010052", sku: "BUT-AMUL-500G", name: "Amul Pasteurised Cow Butter 500g", brand: "Amul", category: "Dairy & Chilled", price: 275, mrp: 280, gst: 12, stock: 48, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300" },
];

export const POSPage: React.FC = () => {
  const [catalog, setCatalog] = useState<POSProduct[]>(posCatalog);
  const [rawSearchQuery, setRawSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([
    { id: "P1", code: "8901058000123", sku: "ATT-AASH-5KG", name: "Aashirvaad Shudh Chakki Atta 5kg", price: 245, originalPrice: 245, gst: 0, qty: 1 },
  ]);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>("Cash");

  // SPLIT PAYMENT MODAL STATE
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [cashSplitAmount, setCashSplitAmount] = useState<string>("100");
  const [digitalSplitAmount, setDigitalSplitAmount] = useState<string>("145");

  // UPI QR MODAL STATE
  const [showUpiModal, setShowUpiModal] = useState(false);

  // SUCCESS ORDER STATE
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

  const taxableValue = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalGstAmount = cart.reduce((sum, item) => sum + (item.price * item.qty * item.gst) / 100, 0);
  const grandTotal = Math.round(taxableValue + totalGstAmount);

  // AUTOMATED ORDER SETTLEMENT WORKFLOW
  // Cart -> Payment -> Invoice -> Receipt -> Stock Reduced -> Order Saved
  const handleInitiatePayment = () => {
    if (cart.length === 0) return;

    if (selectedPaymentMethod === "UPI") {
      setShowUpiModal(true);
    } else if (selectedPaymentMethod === "Split Payment") {
      setCashSplitAmount((grandTotal / 2).toFixed(0));
      setDigitalSplitAmount((grandTotal / 2).toFixed(0));
      setShowSplitModal(true);
    } else {
      executeFinalCheckout();
    }
  };

  const executeFinalCheckout = () => {
    const newBillNo = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    // STOCK REDUCED AUTOMATICALLY IN INVENTORY CATALOG
    setCatalog((prevCatalog) =>
      prevCatalog.map((prod) => {
        const cartMatch = cart.find((c) => c.id === prod.id);
        if (cartMatch) {
          return { ...prod, stock: Math.max(0, prod.stock - cartMatch.qty) };
        }
        return prod;
      })
    );

    setCompletedBillNo(newBillNo);
    setShowUpiModal(false);
    setShowSplitModal(false);
    setShowReceiptModal(true);
  };

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
            <p className="text-xs text-slate-400">Payment Engine: Cash, UPI, Credit/Debit Card, NetBanking, Wallet & Split Payments</p>
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
            {catalog.map((prod) => (
              <div
                key={prod.id}
                onClick={() => addToCart(prod)}
                className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-3 flex flex-col justify-between cursor-pointer transition-all shadow-soft-sm group"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <img src={prod.image} alt={prod.name} className="w-11 h-11 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 line-clamp-1">{prod.name}</h4>
                    <span className="text-[10px] text-emerald-400 font-mono">{prod.sku}</span>
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

        {/* Right Column: Multi-Method Payment Selector (5 Cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-900 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" /> Select Payment Method
            </h3>

            {/* 7 PAYMENT METHOD SELECTION GRID */}
            <div className="grid grid-cols-3 gap-2 text-xs font-bold font-mono">
              {[
                { id: "Cash", icon: DollarSign, label: "💵 Cash" },
                { id: "UPI", icon: QrCode, label: "📲 UPI QR" },
                { id: "Credit Card", icon: CreditCard, label: "💳 Credit Card" },
                { id: "Debit Card", icon: CreditCard, label: "💳 Debit Card" },
                { id: "Net Banking", icon: Globe, label: "🌐 NetBanking" },
                { id: "Wallet", icon: Wallet, label: "👛 Wallet" },
                { id: "Split Payment", icon: Calculator, label: "⚖️ Split Pay" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedPaymentMethod(m.id as PaymentMethod)}
                  className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 border transition-all ${
                    selectedPaymentMethod === m.id
                      ? "bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/20 scale-[1.02]"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850"
                  }`}
                >
                  <m.icon className="w-5 h-5" />
                  <span className="text-[10px]">{m.label}</span>
                </button>
              ))}
            </div>

            {/* Total Payable Summary */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between"><span>Taxable Subtotal:</span><span>₹{taxableValue.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Automated GST:</span><span>₹{totalGstAmount.toFixed(2)}</span></div>
              <div className="bg-emerald-950 border border-emerald-800/60 rounded-xl p-3 text-center mt-3">
                <span className="text-[10px] uppercase text-emerald-300 font-extrabold tracking-wider">Grand Total Payable</span>
                <div className="text-3xl font-extrabold text-white font-mono mt-0.5">₹{grandTotal}.00</div>
              </div>
            </div>
          </div>

          <Button
            disabled={cart.length === 0}
            onClick={handleInitiatePayment}
            className="w-full mt-4 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20"
          >
            Process {selectedPaymentMethod} Payment (₹{grandTotal}) <ArrowRight className="w-4 h-4 ml-1 inline" />
          </Button>
        </div>
      </div>

      {/* UPI DYNAMIC QR CODE MODAL */}
      <Modal isOpen={showUpiModal} onClose={() => setShowUpiModal(false)} title="Scan & Pay via UPI Dynamic QR">
        <div className="text-center space-y-4 text-slate-900 dark:text-slate-100 p-2">
          <div className="w-48 h-48 bg-white p-3 rounded-2xl mx-auto border-2 border-emerald-500 shadow-xl flex items-center justify-center">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=rishabhstore@upi%26pn=RishabhStore%26am=${grandTotal}%26cu=INR`}
              alt="UPI QR Code"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h4 className="font-extrabold text-lg text-emerald-600 font-mono">₹{grandTotal}.00</h4>
            <p className="text-xs text-slate-500">Scan using PhonePe, GPay, Paytm, or BHIM UPI</p>
          </div>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold" onClick={executeFinalCheckout}>
            <Check className="w-4 h-4 mr-1 inline" /> Confirm UPI Payment Received
          </Button>
        </div>
      </Modal>

      {/* SPLIT PAYMENT MODAL */}
      <Modal isOpen={showSplitModal} onClose={() => setShowSplitModal(false)} title="Process Split Payment">
        <div className="space-y-4 text-slate-900 dark:text-slate-100">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Cash Portion (₹)</label>
              <input
                type="number"
                value={cashSplitAmount}
                onChange={(e) => setCashSplitAmount(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1">UPI / Card Portion (₹)</label>
              <input
                type="number"
                value={digitalSplitAmount}
                onChange={(e) => setDigitalSplitAmount(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold font-mono text-emerald-600"
              />
            </div>
          </div>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold" onClick={executeFinalCheckout}>
            Complete Split Settlement (₹{grandTotal})
          </Button>
        </div>
      </Modal>

      {/* Thermal Receipt Print Modal */}
      <Modal isOpen={showReceiptModal} onClose={() => setShowReceiptModal(false)} title="Thermal Bill Receipt">
        <div className="text-center space-y-4 text-slate-900 dark:text-slate-100">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 text-2xl flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-mono">Invoice {completedBillNo}</h3>
            <p className="text-xs text-slate-500">Paid via {selectedPaymentMethod} | Stock Automatically Deducted</p>
          </div>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold" onClick={() => { setShowReceiptModal(false); setCart([]); }}>
            <Printer className="w-4 h-4 mr-2 inline" /> Print ESC/POS Thermal Bill
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default POSPage;
