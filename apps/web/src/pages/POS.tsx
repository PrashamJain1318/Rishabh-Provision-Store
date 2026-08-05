import React, { useState, useEffect, useRef } from "react";
import { Button, Modal } from "@rishabh-store/ui";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Tag,
  UserCheck,
  UserPlus,
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
  Gift,
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
  itemDiscountVal?: number;
  itemDiscountType?: "percentage" | "fixed";
  notes?: string;
}

const posCatalog: POSProduct[] = [
  { id: "P1", code: "8901058000123", sku: "ATT-AASH-5KG", name: "Aashirvaad Shudh Chakki Atta 5kg", brand: "Aashirvaad", category: "Atta & Flours", price: 245, mrp: 275, gst: 0, stock: 145, image: "https://images.unsplash.com/photo-1574323758207-f60101053e2c?w=300" },
  { id: "P2", code: "8906007280054", sku: "OIL-FORT-1L", name: "Fortune Kachi Ghani Mustard Oil 1L", brand: "Fortune", category: "Edible Oils", price: 142, mrp: 165, gst: 5, stock: 82, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300" },
  { id: "P3", code: "8901262010052", sku: "BUT-AMUL-500G", name: "Amul Pasteurised Cow Butter 500g", brand: "Amul", category: "Dairy & Chilled", price: 275, mrp: 280, gst: 12, stock: 48, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300" },
];

export const POSPage: React.FC = () => {
  const [rawSearchQuery, setRawSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([
    { id: "P1", code: "8901058000123", sku: "ATT-AASH-5KG", name: "Aashirvaad Shudh Chakki Atta 5kg", price: 245, originalPrice: 245, gst: 0, qty: 2 },
  ]);

  // COUPON & DISCOUNT ENGINE STATE
  const [couponCode, setCouponCode] = useState("");
  const [activeCouponMessage, setActiveCouponMessage] = useState<string | null>(null);
  const [cartDiscountType, setCartDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [cartDiscountVal, setCartDiscountVal] = useState<number>(0);

  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [completedBillNo, setCompletedBillNo] = useState("");

  // Apply Coupon Logic (Percentage, Flat, Buy X Get Y)
  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === "SAVE10") {
      setCartDiscountType("percentage");
      setCartDiscountVal(10);
      setActiveCouponMessage("🎉 Coupon SAVE10 Applied: 10% Off Cart Subtotal!");
    } else if (code === "FLAT50") {
      setCartDiscountType("fixed");
      setCartDiscountVal(50);
      setActiveCouponMessage("🎉 Coupon FLAT50 Applied: Flat ₹50 Off!");
    } else if (code === "BUY2GET1") {
      // Buy 2 Get 1 Free Promo
      setCart((prev) =>
        prev.map((item) => (item.qty >= 2 ? { ...item, qty: item.qty + 1, itemDiscountVal: item.price } : item))
      );
      setActiveCouponMessage("🎁 Promo BUY2GET1 Applied: 1 Unit Free added to items with Qty >= 2!");
    } else {
      setActiveCouponMessage("❌ Invalid Coupon Code. Try SAVE10, FLAT50, or BUY2GET1.");
    }
  };

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

  // Financial Calculations
  const subtotal = cart.reduce((sum, item) => {
    const itemTotal = item.price * item.qty;
    const itemDisc = item.itemDiscountVal
      ? item.itemDiscountType === "percentage"
        ? (itemTotal * item.itemDiscountVal) / 100
        : item.itemDiscountVal
      : 0;
    return sum + Math.max(0, itemTotal - itemDisc);
  }, 0);

  const computedCartDiscount =
    cartDiscountType === "percentage" ? (subtotal * cartDiscountVal) / 100 : cartDiscountVal;

  const totalGst = Math.round(cart.reduce((sum, item) => sum + (item.price * item.qty * item.gst) / 100, 0));
  const grandTotal = Math.max(0, subtotal - computedCartDiscount + totalGst);

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
            <p className="text-xs text-slate-400">Discounts & Coupons Engine: Percentage, Flat, Item-Level & BOGO Promos</p>
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

        {/* Right Column: Discounts & Coupons Panel (5 Cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-900 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-400" /> Discounts & Promotional Coupons
            </h3>

            {/* COUPON REDEEM INPUT */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Coupon Code (e.g. SAVE10, FLAT50, BUY2GET1)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono font-bold text-white uppercase focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl"
                >
                  Apply Coupon
                </button>
              </div>

              {activeCouponMessage && (
                <p className="text-xs font-bold text-emerald-400 font-mono">{activeCouponMessage}</p>
              )}
            </div>

            {/* CART-LEVEL MANUAL DISCOUNT */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs font-mono">
              <span className="font-bold text-slate-300 uppercase">Cart-Level Manual Discount</span>
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={cartDiscountType}
                  onChange={(e) => setCartDiscountType(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 text-white rounded-xl px-2 py-1.5 font-bold"
                >
                  <option value="percentage">% Percentage</option>
                  <option value="fixed">₹ Fixed Amount</option>
                </select>

                <input
                  type="number"
                  placeholder="0"
                  value={cartDiscountVal}
                  onChange={(e) => setCartDiscountVal(parseFloat(e.target.value) || 0)}
                  className="col-span-2 bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5 font-bold text-right"
                />
              </div>
            </div>

            {/* Shopping Cart Breakdown */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between"><span>Subtotal:</span><span>₹{subtotal}.00</span></div>
              {computedCartDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Cart Discount ({cartDiscountType === "percentage" ? `${cartDiscountVal}%` : `₹${cartDiscountVal}`}):</span>
                  <span>- ₹{computedCartDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between"><span>Automated GST:</span><span>₹{totalGst}.00</span></div>

              <div className="bg-emerald-950 border border-emerald-800/60 rounded-xl p-3 text-center mt-3">
                <span className="text-[10px] uppercase text-emerald-300 font-extrabold tracking-wider">Grand Total Payable</span>
                <div className="text-3xl font-extrabold text-white font-mono mt-0.5">₹{grandTotal.toFixed(2)}</div>
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

      {/* Thermal Receipt Print Modal */}
      <Modal isOpen={showReceiptModal} onClose={() => setShowReceiptModal(false)} title="Thermal Bill Receipt">
        <div className="text-center space-y-4 text-slate-900 dark:text-slate-100">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 text-2xl flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div><h3 className="text-xl font-bold font-mono">Invoice {completedBillNo}</h3></div>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold" onClick={() => { setShowReceiptModal(false); setCart([]); }}>
            <Printer className="w-4 h-4 mr-2 inline" /> Print ESC/POS Thermal Bill
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default POSPage;
