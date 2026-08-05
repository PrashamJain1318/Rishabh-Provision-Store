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
} from "lucide-react";

interface POSProduct {
  id: string;
  code: string;
  name: string;
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
  name: string;
  price: number;
  gst: number;
  qty: number;
  discountPct?: number;
}

interface HeldBill {
  id: string;
  customerName: string;
  items: CartItem[];
  timestamp: string;
  total: number;
}

const posCatalog: POSProduct[] = [
  { id: "P1", code: "8901058000123", name: "Aashirvaad Shudh Chakki Atta 5kg", category: "Atta & Flours", price: 245, mrp: 275, gst: 0, stock: 145, image: "https://images.unsplash.com/photo-1574323758207-f60101053e2c?w=300" },
  { id: "P2", code: "8906007280054", name: "Fortune Kachi Ghani Mustard Oil 1L", category: "Edible Oils", price: 142, mrp: 165, gst: 5, stock: 82, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300" },
  { id: "P3", code: "8901262010052", name: "Amul Pasteurised Cow Butter 500g", category: "Dairy & Chilled", price: 275, mrp: 280, gst: 12, stock: 48, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300" },
  { id: "P4", code: "8901058852310", name: "Tata Salt Iodized Vacuum Salt 1kg", category: "Masala & Spices", price: 27, mrp: 28, gst: 0, stock: 320, image: "https://images.unsplash.com/photo-1563822249510-04678c78fa85?w=300" },
  { id: "P5", code: "890103005005", name: "Surf Excel Easy Wash Detergent 1kg", category: "Cleaning", price: 140, mrp: 155, gst: 18, stock: 12, image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300" },
  { id: "P6", code: "890103006006", name: "Mother Dairy Toned Fresh Milk 500ml", category: "Dairy & Chilled", price: 27, mrp: 27, gst: 0, stock: 30, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300" },
];

export const POSPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([
    { id: "P1", code: "8901058000123", name: "Aashirvaad Shudh Chakki Atta 5kg", price: 245, gst: 0, qty: 1 },
    { id: "P3", code: "8901262010052", name: "Amul Pasteurised Cow Butter 500g", price: 275, gst: 12, qty: 2 },
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState("Walk-in Cashier");
  const [couponCode, setCouponCode] = useState("");
  const [flatDiscount, setFlatDiscount] = useState(0);
  const [paymentMode, setPaymentMode] = useState<"CASH" | "CARD" | "UPI" | "SPLIT" | "KHATA">("CASH");

  // Hold Bills Park Drawer State
  const [heldBills, setHeldBills] = useState<HeldBill[]>([]);
  const [showHeldBillsModal, setShowHeldBillsModal] = useState(false);

  // Return & Refund Modal State
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnInvoiceNo, setReturnInvoiceNo] = useState("");

  // Thermal Receipt Modal State
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [completedBillNo, setCompletedBillNo] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Barcode Scanner Global Keypress Listener (auto-adds on 13-digit scan)
  useEffect(() => {
    let scanBuffer = "";
    let lastKeyTime = Date.now();

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastKeyTime > 100) scanBuffer = "";
      lastKeyTime = currentTime;

      if (e.key === "Enter") {
        if (scanBuffer.length >= 8) {
          const matchedProd = posCatalog.find((p) => p.code === scanBuffer || p.id === scanBuffer);
          if (matchedProd) {
            addToCart(matchedProd);
            setSearchQuery("");
          }
          scanBuffer = "";
        }
      } else if (e.key.length === 1) {
        scanBuffer += e.key;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Add item to cart
  const addToCart = (product: POSProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [
        ...prev,
        { id: product.id, code: product.code, name: product.name, price: product.price, gst: product.gst, qty: 1 },
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

  // Hold / Resume Bill Execution
  const handleHoldBill = () => {
    if (cart.length === 0) return;
    const newHeld: HeldBill = {
      id: `HOLD-00${heldBills.length + 1}`,
      customerName: selectedCustomer,
      items: cart,
      timestamp: new Date().toLocaleTimeString("en-IN"),
      total: grandTotal,
    };
    setHeldBills([newHeld, ...heldBills]);
    setCart([]);
  };

  const handleResumeBill = (bill: HeldBill) => {
    setCart(bill.items);
    setSelectedCustomer(bill.customerName);
    setHeldBills(heldBills.filter((b) => b.id !== bill.id));
    setShowHeldBillsModal(false);
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalGst = Math.round(cart.reduce((sum, item) => sum + (item.price * item.qty * item.gst) / 100, 0));
  const grandTotal = Math.max(0, subtotal - flatDiscount + totalGst);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const newBillNo = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setCompletedBillNo(newBillNo);
    setShowReceiptModal(true);
  };

  const filteredCatalog = posCatalog.filter((product) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(q) || product.code.includes(q);
    const matchesCat = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* POS Top Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between shadow-soft-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-lg shadow-soft-sm">
            ⚡
          </div>
          <div>
            <h2 className="font-extrabold text-base text-white">Rishabh Express POS Terminal #1</h2>
            <p className="text-xs text-slate-400">Cashier: Prasham Jain | Active Shift #108</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => setShowHeldBillsModal(true)}
            className="px-3 py-1.5 rounded-xl bg-amber-950/80 text-amber-400 font-bold border border-amber-800/60 flex items-center gap-1.5 hover:bg-amber-900"
          >
            <PauseCircle className="w-4 h-4" />
            Held Bills ({heldBills.length})
          </button>

          <button
            onClick={() => setShowReturnModal(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 font-bold border border-slate-700 flex items-center gap-1.5 hover:bg-slate-700"
          >
            <RotateCcw className="w-4 h-4 text-rose-400" />
            Returns & Refunds
          </button>

          <a href="/dashboard">
            <Button size="sm" className="bg-slate-800 text-white hover:bg-slate-700 font-bold rounded-xl">
              Exit POS ➔
            </Button>
          </a>
        </div>
      </header>

      {/* POS Layout Split */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* Left Column: Categories + Product Search + Product Grid (7 Cols) */}
        <div className="lg:col-span-7 border-r border-slate-800 p-6 flex flex-col gap-4 overflow-y-auto">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Instant Scan EAN Barcode or type Name/SKU..."
              className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-400 text-base pl-12 pr-32 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              autoFocus
            />
            <span className="absolute right-4 top-3.5 text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Scanner Active
            </span>
          </div>

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

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto pr-1">
            {filteredCatalog.map((prod) => (
              <div
                key={prod.id}
                onClick={() => addToCart(prod)}
                className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-3 flex flex-col justify-between cursor-pointer transition-all shadow-soft-sm group"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <img src={prod.image} alt={prod.name} className="w-11 h-11 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 group-hover:text-emerald-400 line-clamp-1">
                      {prod.name}
                    </h4>
                    <span className="text-[10px] text-slate-400">{prod.category}</span>
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

        {/* Right Column: Shopping Cart + Customer + Discounts + Checkout (5 Cols) */}
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
                <option value="Sita Sharma">Sita Sharma</option>
              </select>
            </div>

            {/* Shopping Cart List */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 max-h-56 overflow-y-auto space-y-2">
              {cart.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  Cart is empty. Click a product on the left or scan barcode.
                </div>
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
                          <p className="text-[10px] text-slate-400 font-mono">₹{item.price} • {item.gst}% GST</p>
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
                        <td className="py-2.5 text-right font-mono text-emerald-400 font-bold">
                          ₹{item.price * item.qty}
                        </td>
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

            {/* Calculations & GST Summary */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal ({cart.reduce((a, b) => a + b.qty, 0)} items):</span>
                <span>₹{subtotal}.00</span>
              </div>
              <div className="flex justify-between">
                <span>Automated GST Tax:</span>
                <span>₹{totalGst}.00</span>
              </div>

              <div className="bg-emerald-950 border border-emerald-800/60 rounded-xl p-3 text-center mt-3">
                <span className="text-[10px] uppercase text-emerald-300 font-extrabold tracking-wider">
                  Grand Total Payable
                </span>
                <div className="text-3xl font-extrabold text-white font-mono mt-0.5">₹{grandTotal}.00</div>
              </div>
            </div>

            {/* Payment Mode Selector */}
            <div className="grid grid-cols-4 gap-2 text-xs font-bold">
              <button
                onClick={() => setPaymentMode("CASH")}
                className={`py-2 rounded-xl transition-all ${
                  paymentMode === "CASH" ? "bg-emerald-600 text-white ring-2 ring-emerald-400" : "bg-slate-950 text-slate-400"
                }`}
              >
                💵 CASH
              </button>
              <button
                onClick={() => setPaymentMode("CARD")}
                className={`py-2 rounded-xl transition-all ${
                  paymentMode === "CARD" ? "bg-blue-600 text-white ring-2 ring-blue-400" : "bg-slate-950 text-slate-400"
                }`}
              >
                💳 CARD
              </button>
              <button
                onClick={() => setPaymentMode("UPI")}
                className={`py-2 rounded-xl transition-all ${
                  paymentMode === "UPI" ? "bg-purple-600 text-white ring-2 ring-purple-400" : "bg-slate-950 text-slate-400"
                }`}
              >
                📲 UPI / QR
              </button>
              <button
                onClick={() => setPaymentMode("KHATA")}
                className={`py-2 rounded-xl transition-all ${
                  paymentMode === "KHATA" ? "bg-amber-600 text-white ring-2 ring-amber-400" : "bg-slate-950 text-slate-400"
                }`}
              >
                📒 KHATA
              </button>
            </div>
          </div>

          {/* Action Buttons: Hold Bill & Checkout */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <button
              onClick={handleHoldBill}
              disabled={cart.length === 0}
              className="py-3 bg-amber-950 hover:bg-amber-900 border border-amber-800/80 text-amber-300 rounded-xl font-bold text-xs flex items-center justify-center gap-1 disabled:opacity-50"
            >
              <PauseCircle className="w-4 h-4" /> Hold Bill
            </button>

            <Button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="col-span-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20"
            >
              <Printer className="w-4 h-4 mr-1.5 inline" /> Checkout & Thermal Print
            </Button>
          </div>
        </div>
      </div>

      {/* Held Bills Park Drawer Modal */}
      <Modal isOpen={showHeldBillsModal} onClose={() => setShowHeldBillsModal(false)} title="Parked / Held Bills Drawer">
        <div className="space-y-4 text-slate-900 dark:text-slate-100">
          {heldBills.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-6">No held bills currently parked.</p>
          ) : (
            <div className="space-y-3">
              {heldBills.map((b) => (
                <div key={b.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs">{b.id} - {b.customerName}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">{b.items.length} items • ₹{b.total} • Held at {b.timestamp}</p>
                  </div>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl" onClick={() => handleResumeBill(b)}>
                    Resume Bill ➔
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>

      {/* Thermal Receipt Print Modal */}
      <Modal isOpen={showReceiptModal} onClose={() => setShowReceiptModal(false)} title="58mm / 80mm ESC/POS Thermal Receipt">
        <div className="text-center space-y-4 text-slate-900 dark:text-slate-100">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 text-2xl flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Transaction Complete!</h3>
            <p className="text-xs text-slate-500 font-mono mt-1">Tax Invoice {completedBillNo}</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 text-left font-mono text-xs space-y-2 border border-slate-200 dark:border-slate-700">
            <div className="text-center font-bold text-sm border-b border-slate-200 dark:border-slate-700 pb-2">
              RISHABH PROVISION STORE
              <p className="text-[10px] font-normal text-slate-400">GSTIN: 27AAACI1681G1ZM | Store #1</p>
            </div>
            <div className="flex justify-between"><span>Customer:</span><span>{selectedCustomer}</span></div>
            <div className="flex justify-between"><span>Payment Mode:</span><span>{paymentMode}</span></div>
            <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 font-bold text-sm text-emerald-600 dark:text-emerald-400">
              <span>Total Paid:</span>
              <span>₹{grandTotal}.00</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              onClick={() => {
                alert(`Printed 80mm ESC/POS Thermal Receipt ${completedBillNo}`);
                setShowReceiptModal(false);
                setCart([]);
              }}
            >
              <Printer className="w-4 h-4 mr-2 inline" /> Print ESC/POS Thermal Bill
            </Button>
            <Button variant="outline" onClick={() => setShowReceiptModal(false)}>
              Done
            </Button>
          </div>
        </div>
      </Modal>

      {/* Return & Refund Modal */}
      <Modal isOpen={showReturnModal} onClose={() => setShowReturnModal(false)} title="Process Return & Refund">
        <div className="space-y-4 text-slate-900 dark:text-slate-100">
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Enter Invoice / Bill # *</label>
            <input
              type="text"
              placeholder="e.g. INV-2026-8891"
              value={returnInvoiceNo}
              onChange={(e) => setReturnInvoiceNo(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono"
            />
          </div>
          <Button
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold"
            onClick={() => {
              alert(`Refund of ₹245.00 processed for Invoice ${returnInvoiceNo}`);
              setShowReturnModal(false);
              setReturnInvoiceNo("");
            }}
          >
            Issue Return & Process Refund
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default POSPage;
