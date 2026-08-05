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
  AlertCircle,
  Barcode,
  Edit3,
  FileText,
  Lock,
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
  notes?: string;
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

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [notFoundBarcode, setNotFoundBarcode] = useState<string | null>(null);

  const [cart, setCart] = useState<CartItem[]>([
    { id: "P1", code: "8901058000123", sku: "ATT-AASH-5KG", name: "Aashirvaad Shudh Chakki Atta 5kg", price: 245, originalPrice: 245, gst: 0, qty: 1, notes: "Fresh batch" },
  ]);

  // Price Override Modal State
  const [overrideItem, setOverrideItem] = useState<CartItem | null>(null);
  const [overridePrice, setOverridePrice] = useState("");
  const [managerPin, setManagerPin] = useState("");
  const [pinError, setPinError] = useState("");

  // Line Item Note Edit State
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState("Walk-in Cashier");
  const [flatDiscount, setFlatDiscount] = useState(0);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [completedBillNo, setCompletedBillNo] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  // 150ms Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(rawSearchQuery);
      setSelectedIndex(0);
    }, 150);
    return () => clearTimeout(handler);
  }, [rawSearchQuery]);

  // Add Product to Cart
  const addToCart = (product: POSProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [
        ...prev,
        {
          id: product.id,
          code: product.code,
          sku: product.sku,
          name: product.name,
          price: product.price,
          originalPrice: product.price,
          gst: product.gst,
          qty: 1,
        },
      ];
    });
  };

  const updateQty = (id: string, newQty: number) => {
    if (newQty <= 0) {
      removeItem(id);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item)));
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Manager Price Override Execution
  const handleApplyPriceOverride = (e: React.FormEvent) => {
    e.preventDefault();
    if (managerPin !== "1234") {
      setPinError("❌ Invalid Manager PIN. (Use 1234)");
      return;
    }
    if (!overrideItem) return;

    const newP = parseFloat(overridePrice);
    if (isNaN(newP) || newP < 0) return;

    setCart((prev) => prev.map((item) => (item.id === overrideItem.id ? { ...item, price: newP } : item)));
    setOverrideItem(null);
    setManagerPin("");
    setPinError("");
  };

  const handleSaveNote = (id: string) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, notes: noteText } : item)));
    setEditingNoteId(null);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalGst = Math.round(cart.reduce((sum, item) => sum + (item.price * item.qty * item.gst) / 100, 0));
  const grandTotal = Math.max(0, subtotal - flatDiscount + totalGst);

  const filteredCatalog = posCatalog.filter((product) => {
    const q = debouncedQuery.toLowerCase().trim();
    return (
      !q ||
      product.name.toLowerCase().includes(q) ||
      product.code.includes(q) ||
      product.sku.toLowerCase().includes(q)
    );
  });

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
            <p className="text-xs text-slate-400">Cart Features: Manual Price Override (PIN Protected) & Line Notes</p>
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
              ref={searchInputRef}
              type="text"
              value={rawSearchQuery}
              onChange={(e) => setRawSearchQuery(e.target.value)}
              placeholder="🔍 Search products or scan barcode..."
              className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-400 text-sm pl-12 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto">
            {filteredCatalog.map((prod) => (
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

        {/* Right Column: Advanced Shopping Cart (5 Cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-900 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-400" /> POS Active Shopping Cart ({cart.length} items)
            </h3>

            {/* Cart Table with Direct Qty Input, Price Override & Notes */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 max-h-72 overflow-y-auto space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">Cart is empty. Click a product on the left.</div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800 uppercase text-[10px] font-bold">
                      <th className="pb-2">Product</th>
                      <th className="pb-2 text-center">Qty Input</th>
                      <th className="pb-2 text-right">Price (₹)</th>
                      <th className="pb-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {cart.map((item) => (
                      <tr key={item.id} className="align-top">
                        <td className="py-3 font-bold text-slate-200">
                          <p>{item.name}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{item.sku}</span>

                          {/* Line Item Notes */}
                          {item.notes ? (
                            <p className="text-[10px] text-emerald-400 italic mt-0.5 flex items-center gap-1">
                              <FileText className="w-3 h-3" /> Note: {item.notes}
                            </p>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingNoteId(item.id);
                                setNoteText(item.notes || "");
                              }}
                              className="text-[9px] text-slate-500 hover:text-slate-300 underline mt-0.5 block"
                            >
                              + Add Item Note
                            </button>
                          )}
                        </td>

                        {/* Quantity Controls (Direct numeric input + minus/plus buttons) */}
                        <td className="py-3 text-center">
                          <div className="inline-flex items-center gap-1 bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                            <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-1 text-slate-400 hover:text-white">
                              <Minus className="w-3 h-3" />
                            </button>
                            <input
                              type="number"
                              value={item.qty}
                              onChange={(e) => updateQty(item.id, parseInt(e.target.value) || 1)}
                              className="w-10 bg-slate-950 text-center font-mono font-extrabold text-xs text-white rounded focus:outline-none border border-slate-700 py-0.5"
                            />
                            <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-1 text-slate-400 hover:text-white">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </td>

                        {/* Price Display & Manual Price Override Trigger */}
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <span className="font-mono text-emerald-400 font-bold text-sm">₹{item.price * item.qty}</span>
                            <button
                              onClick={() => {
                                setOverrideItem(item);
                                setOverridePrice(item.price.toString());
                              }}
                              title="Manual Price Override (Manager Only)"
                              className="text-slate-500 hover:text-amber-400 p-0.5"
                            >
                              <Lock className="w-3 h-3" />
                            </button>
                          </div>
                          {item.price !== item.originalPrice && (
                            <span className="text-[9px] line-through text-slate-500 block font-mono">Original ₹{item.originalPrice}</span>
                          )}
                        </td>

                        {/* Delete Button */}
                        <td className="py-3 text-right">
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

            {/* Subtotal & GST */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between"><span>Subtotal:</span><span>₹{subtotal}.00</span></div>
              <div className="flex justify-between"><span>Automated GST:</span><span>₹{totalGst}.00</span></div>
              <div className="bg-emerald-950 border border-emerald-800/60 rounded-xl p-3 text-center mt-3">
                <span className="text-[10px] uppercase text-emerald-300 font-extrabold tracking-wider">Grand Total Payable</span>
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

      {/* Manual Price Override Modal */}
      <Modal isOpen={!!overrideItem} onClose={() => setOverrideItem(null)} title="Manager Price Override">
        <form onSubmit={handleApplyPriceOverride} className="space-y-4 text-slate-900 dark:text-slate-100">
          <div>
            <p className="text-xs font-bold text-slate-500 mb-1">Target Product: {overrideItem?.name}</p>
            <p className="text-xs text-slate-400 font-mono">Original Price: ₹{overrideItem?.originalPrice}</p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">New Custom Selling Price (₹) *</label>
            <input
              type="number"
              required
              value={overridePrice}
              onChange={(e) => setOverridePrice(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Manager PIN Security Code *</label>
            <input
              type="password"
              required
              placeholder="Enter PIN (e.g. 1234)"
              value={managerPin}
              onChange={(e) => setManagerPin(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono"
            />
            {pinError && <p className="text-xs text-rose-600 font-bold mt-1">{pinError}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOverrideItem(null)}>Cancel</Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">Apply Price Override</Button>
          </div>
        </form>
      </Modal>

      {/* Note Edit Modal */}
      <Modal isOpen={!!editingNoteId} onClose={() => setEditingNoteId(null)} title="Add Line Item Custom Note">
        <div className="space-y-4 text-slate-900 dark:text-slate-100">
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Item Note / Instructions</label>
            <input
              type="text"
              placeholder="e.g. Packed in paper bag / Special discount..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
            />
          </div>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold" onClick={() => editingNoteId && handleSaveNote(editingNoteId)}>
            Save Item Note
          </Button>
        </div>
      </Modal>

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
