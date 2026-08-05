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
  PlayCircle,
  RotateCcw,
  CreditCard,
  QrCode,
  DollarSign,
  Receipt,
  Clock,
  ShieldCheck,
  Percent,
  Keyboard,
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
  gst: number;
  qty: number;
}

interface HeldBill {
  id: string;
  customerName: string;
  items: CartItem[];
  timestamp: string;
  total: number;
}

const posCatalog: POSProduct[] = [
  { id: "P1", code: "8901058000123", sku: "ATT-AASH-5KG", name: "Aashirvaad Shudh Chakki Atta 5kg", brand: "Aashirvaad", category: "Atta & Flours", price: 245, mrp: 275, gst: 0, stock: 145, image: "https://images.unsplash.com/photo-1574323758207-f60101053e2c?w=300" },
  { id: "P2", code: "8906007280054", sku: "OIL-FORT-1L", name: "Fortune Kachi Ghani Mustard Oil 1L", brand: "Fortune", category: "Edible Oils", price: 142, mrp: 165, gst: 5, stock: 82, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300" },
  { id: "P3", code: "8901262010052", sku: "BUT-AMUL-500G", name: "Amul Pasteurised Cow Butter 500g", brand: "Amul", category: "Dairy & Chilled", price: 275, mrp: 280, gst: 12, stock: 48, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300" },
  { id: "P4", code: "8901058852310", sku: "SLT-TATA-1KG", name: "Tata Salt Iodized Vacuum Salt 1kg", brand: "Tata Consumer", category: "Masala & Spices", price: 27, mrp: 28, gst: 0, stock: 320, image: "https://images.unsplash.com/photo-1563822249510-04678c78fa85?w=300" },
  { id: "P5", code: "890103005005", sku: "DET-SURF-1KG", name: "Surf Excel Easy Wash Detergent 1kg", brand: "Hindustan Unilever", category: "Cleaning", price: 140, mrp: 155, gst: 18, stock: 12, image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300" },
  { id: "P6", code: "890103006006", sku: "MLK-MD-500ML", name: "Mother Dairy Toned Fresh Milk 500ml", brand: "Mother Dairy", category: "Dairy & Chilled", price: 27, mrp: 27, gst: 0, stock: 30, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300" },
];

export const POSPage: React.FC = () => {
  const [rawSearchQuery, setRawSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Arrow Key Navigation Index
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [cart, setCart] = useState<CartItem[]>([
    { id: "P1", code: "8901058000123", sku: "ATT-AASH-5KG", name: "Aashirvaad Shudh Chakki Atta 5kg", price: 245, gst: 0, qty: 1 },
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState("Walk-in Cashier");
  const [flatDiscount, setFlatDiscount] = useState(0);
  const [paymentMode, setPaymentMode] = useState<"CASH" | "CARD" | "UPI" | "SPLIT" | "KHATA">("CASH");

  // Hold Bills & Returns Modals
  const [heldBills, setHeldBills] = useState<HeldBill[]>([]);
  const [showHeldBillsModal, setShowHeldBillsModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [completedBillNo, setCompletedBillNo] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  // 300ms Debounce Effect for Instant Search Performance
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(rawSearchQuery);
      setSelectedIndex(0);
    }, 150);
    return () => clearTimeout(handler);
  }, [rawSearchQuery]);

  // Multi-facet Filter Catalog
  const filteredCatalog = posCatalog.filter((product) => {
    const q = debouncedQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      product.name.toLowerCase().includes(q) ||
      product.code.includes(q) ||
      product.sku.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.brand.toLowerCase().includes(q);

    const matchesCat = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Global Keyboard Navigation (F2, F8, F4, ArrowDown, ArrowUp, Enter, Escape)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // F2 / Ctrl+F: Focus Search Bar
      if (e.key === "F2" || (e.ctrlKey && e.key.toLowerCase() === "f")) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // F8: Express Checkout
      else if (e.key === "F8") {
        e.preventDefault();
        if (cart.length > 0) handleCheckout();
      }
      // F4: Hold Bills Drawer
      else if (e.key === "F4") {
        e.preventDefault();
        setShowHeldBillsModal((prev) => !prev);
      }
      // Escape: Clear Search or Close Modal
      else if (e.key === "Escape") {
        setRawSearchQuery("");
        setShowReceiptModal(false);
        setShowHeldBillsModal(false);
      }
      // Arrow Key Navigation in Search Results
      else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredCatalog.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }
      // Enter to Add Highlighted Product to Cart
      else if (e.key === "Enter" && document.activeElement === searchInputRef.current) {
        if (filteredCatalog.length > 0 && filteredCatalog[selectedIndex]) {
          addToCart(filteredCatalog[selectedIndex]);
          setRawSearchQuery("");
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [filteredCatalog, selectedIndex, cart]);

  const addToCart = (product: POSProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [
        ...prev,
        { id: product.id, code: product.code, sku: product.sku, name: product.name, price: product.price, gst: product.gst, qty: 1 },
      ];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalGst = Math.round(cart.reduce((sum, item) => sum + (item.price * item.qty * item.gst) / 100, 0));
  const grandTotal = Math.max(0, subtotal - flatDiscount + totalGst);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const newBillNo = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setCompletedBillNo(newBillNo);
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
            <p className="text-xs text-slate-400">Cashier: Prasham Jain | Instant Keyboard Shortcuts Active</p>
          </div>
        </div>

        {/* Keyboard Shortcuts Bar */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono font-bold">
          <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-emerald-400 border border-slate-700">F2: Search</span>
          <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-emerald-400 border border-slate-700">↑↓: Navigate</span>
          <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-emerald-400 border border-slate-700">↵: Add to Cart</span>
          <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-emerald-400 border border-slate-700">F4: Hold Bills</span>
          <span className="px-2.5 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800">F8: Checkout</span>
          <a href="/dashboard">
            <Button size="sm" className="bg-slate-800 text-white hover:bg-slate-700 font-bold rounded-xl ml-2">
              Exit ➔
            </Button>
          </a>
        </div>
      </header>

      {/* Main Terminal Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* Left Column: Instant Multi-Facet Search & Keyboard Nav Grid (7 Cols) */}
        <div className="lg:col-span-7 border-r border-slate-800 p-6 flex flex-col gap-4 overflow-y-auto">
          {/* Instant Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={rawSearchQuery}
              onChange={(e) => setRawSearchQuery(e.target.value)}
              placeholder="🔍 Search across Barcode, SKU, Product Name, Category, Brand..."
              className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-400 text-sm pl-12 pr-32 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              autoFocus
            />
            <span className="absolute right-4 top-3.5 text-[11px] text-emerald-400 font-mono font-bold flex items-center gap-1">
              <Keyboard className="w-3.5 h-3.5" /> F2 Focus
            </span>
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
            {["All", "Atta & Flours", "Edible Oils", "Dairy & Chilled", "Masala & Spices", "Cleaning"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white shadow-soft-sm"
                    : "bg-slate-900 text-slate-400 hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Arrow Key Navigable Product Catalog Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto pr-1">
            {filteredCatalog.map((prod, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={prod.id}
                  onClick={() => {
                    setSelectedIndex(index);
                    addToCart(prod);
                  }}
                  className={`bg-slate-900 rounded-2xl p-3 flex flex-col justify-between cursor-pointer transition-all shadow-soft-sm border ${
                    isSelected
                      ? "border-emerald-500 ring-2 ring-emerald-500/40 bg-slate-850 scale-[1.02]"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <img src={prod.image} alt={prod.name} className="w-11 h-11 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 line-clamp-1">{prod.name}</h4>
                      <span className="text-[10px] text-emerald-400 font-mono">{prod.sku} • {prod.brand}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-800 pt-2 mt-1">
                    <span className="text-sm font-extrabold text-emerald-400 font-mono">₹{prod.price}</span>
                    {isSelected && (
                      <span className="text-[9px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                        ↵ Press Enter
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Shopping Cart & Express Checkout (5 Cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-900 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-slate-300">Customer:</span>
              </div>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-white text-xs rounded-xl px-3 py-1.5 font-bold"
              >
                <option value="Walk-in Cashier">Walk-in Customer</option>
                <option value="Ramesh Kumar (Khata)">Ramesh Kumar (Khata Credit)</option>
              </select>
            </div>

            {/* Cart Table */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 max-h-56 overflow-y-auto space-y-2">
              {cart.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">Cart is empty. Use ↑↓ arrows + Enter to add.</div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800 uppercase text-[10px] font-bold">
                      <th className="pb-2">Item Name</th>
                      <th className="pb-2 text-center">Qty</th>
                      <th className="pb-2 text-right">Total</th>
                      <th className="pb-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td className="py-2.5 font-bold text-slate-200">
                          {item.name}
                          <p className="text-[10px] text-slate-400 font-mono">{item.sku} • ₹{item.price}</p>
                        </td>
                        <td className="py-2.5 text-center">
                          <div className="inline-flex items-center gap-1 bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                            <button onClick={() => updateQty(item.id, -1)} className="p-1 text-slate-400 hover:text-white">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono font-extrabold text-xs px-1 text-white">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="p-1 text-slate-400 hover:text-white">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="py-2.5 text-right font-mono text-emerald-400 font-bold">₹{item.price * item.qty}</td>
                        <td className="py-2.5 text-right">
                          <button onClick={() => removeItem(item.id)} className="text-rose-400 hover:text-rose-300 p-1">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Calculations & GST */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between"><span>Subtotal:</span><span>₹{subtotal}.00</span></div>
              <div className="flex justify-between"><span>GST Tax:</span><span>₹{totalGst}.00</span></div>

              <div className="bg-emerald-950 border border-emerald-800/60 rounded-xl p-3 text-center mt-3">
                <span className="text-[10px] uppercase text-emerald-300 font-extrabold tracking-wider">Grand Total</span>
                <div className="text-3xl font-extrabold text-white font-mono mt-0.5">₹{grandTotal}.00</div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full mt-4 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20"
          >
            <Printer className="w-4 h-4 mr-2 inline" /> Checkout & Thermal Print (F8)
          </Button>
        </div>
      </div>

      {/* Thermal Receipt Print Modal */}
      <Modal isOpen={showReceiptModal} onClose={() => setShowReceiptModal(false)} title="Thermal Bill Receipt">
        <div className="text-center space-y-4 text-slate-900 dark:text-slate-100">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 text-2xl flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-mono">Invoice {completedBillNo}</h3>
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
