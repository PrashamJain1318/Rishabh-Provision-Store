import React, { useState } from "react";
import { Button, Modal } from "@rishabh-store/ui";
import { Search, Plus, Minus, Trash2, Tag, UserCheck, Printer, CheckCircle } from "lucide-react";

interface POSProduct {
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  stock: number;
  image: string;
}

interface CartItem {
  id: string;
  code: string;
  name: string;
  price: number;
  qty: number;
}

const posCatalog: POSProduct[] = [
  { id: "P1", code: "890103001001", name: "Aashirvaad Atta 5kg", category: "Atta & Flours", price: 245, mrp: 275, stock: 45, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=300&q=80" },
  { id: "P2", code: "890103002002", name: "Fortune Sunlite Oil 1L", category: "Edible Oils", price: 135, mrp: 155, stock: 8, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80" },
  { id: "P3", code: "890103003003", name: "Amul Butter 500g", category: "Dairy & Chilled", price: 275, mrp: 275, stock: 18, image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=300&q=80" },
  { id: "P4", code: "890103004004", name: "Tata Salt 1kg", category: "Salt & Sugar", price: 28, mrp: 28, stock: 120, image: "https://images.unsplash.com/photo-1518110168401-f2877ee2c088?auto=format&fit=crop&w=300&q=80" },
  { id: "P5", code: "890103005005", name: "Surf Excel Powder 1kg", category: "Detergents", price: 140, mrp: 155, stock: 12, image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=300&q=80" },
  { id: "P6", code: "890103006006", name: "Mother Dairy Milk 500ml", category: "Dairy & Chilled", price: 27, mrp: 27, stock: 30, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300&q=80" },
];

export const POSPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([
    { id: "P1", code: "890103001001", name: "Aashirvaad Atta 5kg", price: 245, qty: 1 },
    { id: "P3", code: "890103003003", name: "Amul Butter 500g", price: 275, qty: 2 },
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState("Walk-in Cashier");
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState<"CASH" | "UPI" | "KHATA">("CASH");
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [completedBillNo, setCompletedBillNo] = useState("");

  // Add item to cart
  const addToCart = (product: POSProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: product.id, code: product.code, name: product.name, price: product.price, qty: 1 }];
    });
  };

  // Adjust quantity
  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  // Remove item
  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Apply Coupon
  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "WELCOME10") {
      setDiscountAmount(50);
    } else {
      alert("Invalid Coupon Code. Try WELCOME10");
    }
  };

  // Financial Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = Math.round((subtotal - discountAmount) * 0.05); // 5% GST
  const grandTotal = Math.max(0, subtotal - discountAmount + gst);

  // Complete Bill & Checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty! Add products to checkout.");
      return;
    }
    const newBillNo = `#BILL-10${Math.floor(10 + Math.random() * 90)}`;
    setCompletedBillNo(newBillNo);
    setShowReceiptModal(true);
  };

  // Filter Catalog
  const filteredCatalog = posCatalog.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.includes(searchQuery);
    const matchesCat = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top POS Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between shadow-soft-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-emerald-500 text-white font-extrabold flex items-center justify-center text-base shadow-soft-sm">
            ⚡
          </div>
          <div>
            <h2 className="font-bold text-base text-white">Rishabh POS Terminal #1</h2>
            <p className="text-xs text-slate-400">Cashier: Ramesh Sharma | Shift #4 Active</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="px-2.5 py-1 rounded-xl bg-emerald-950 text-emerald-400 font-mono font-semibold border border-emerald-800/50">
            F2: Search Product
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-emerald-950 text-emerald-400 font-mono font-semibold border border-emerald-800/50">
            F8: Express Checkout
          </span>
          <a href="/dashboard">
            <Button size="sm" variant="secondary">
              Exit Terminal ➔
            </Button>
          </a>
        </div>
      </header>

      {/* Main Terminal 2-Column Split */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* Left Column: Product Search & Product Grid (7 Cols) */}
        <div className="lg:col-span-7 border-r border-slate-800 p-6 flex flex-col gap-4 overflow-y-auto">
          {/* Top Search Product Input */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Scan barcode or type product name/SKU..."
              className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-400 text-base pl-12 pr-28 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              autoFocus
            />
            <span className="absolute right-4 top-3.5 text-xs text-emerald-400 font-mono font-semibold">
              [Barcode Ready]
            </span>
          </div>

          {/* Category Quick Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
            {["All", "Atta & Flours", "Edible Oils", "Dairy & Chilled", "Salt & Sugar", "Detergents"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-emerald-600 text-white shadow-soft-sm"
                      : "bg-slate-900 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          {/* Product Grid Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto pr-1">
            {filteredCatalog.map((prod) => (
              <div
                key={prod.id}
                onClick={() => addToCart(prod)}
                className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-3 flex flex-col justify-between cursor-pointer transition-all shadow-soft-sm group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 group-hover:text-emerald-400 line-clamp-1">
                      {prod.name}
                    </h4>
                    <span className="text-[10px] text-slate-400">{prod.category}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-2 mt-1">
                  <span className="text-sm font-bold text-emerald-400 font-mono">
                    ₹ {prod.price}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono">
                    {prod.stock} in stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Shopping Cart, Customer, Coupon & Payment Summary (5 Cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-900 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            {/* Customer Lookup Selector */}
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-300">Customer:</span>
              </div>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-white text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
              >
                <option value="Walk-in Cashier">Walk-in Cashier</option>
                <option value="Ramesh Kumar (Khata)">Ramesh Kumar (Khata Credit)</option>
                <option value="Sita Sharma">Sita Sharma</option>
              </select>
            </div>

            {/* Shopping Cart Items List Table */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 max-h-56 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  Cart is empty. Click a product on the left to add items.
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800 uppercase text-[10px]">
                      <th className="pb-2">Item Name</th>
                      <th className="pb-2 text-center">Qty</th>
                      <th className="pb-2 text-right">Price</th>
                      <th className="pb-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td className="py-2.5 font-medium text-slate-200">{item.name}</td>
                        <td className="py-2.5 text-center">
                          <div className="inline-flex items-center gap-1 bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="p-1 text-slate-400 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono font-bold text-xs px-1 text-white">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="p-1 text-slate-400 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="py-2.5 text-right font-mono text-emerald-400 font-bold">
                          ₹ {item.price * item.qty}
                        </td>
                        <td className="py-2.5 text-right">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Coupon Code Redeem Input */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code (e.g. WELCOME10)"
                  className="w-full bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono uppercase"
                />
              </div>
              <button
                onClick={applyCoupon}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-xl transition-all"
              >
                Apply
              </button>
            </div>

            {/* Payment Summary Breakdown */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal ({cart.reduce((a, b) => a + b.qty, 0)} items):</span>
                <span>₹ {subtotal}.00</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon Discount:</span>
                  <span>- ₹ {discountAmount}.00</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST (Estimated 5%):</span>
                <span>₹ {gst}.00</span>
              </div>

              <div className="bg-emerald-950 border border-emerald-800/60 rounded-xl p-3 text-center mt-3">
                <span className="text-[10px] uppercase text-emerald-300 font-bold tracking-wider">
                  Grand Total Payable
                </span>
                <div className="text-3xl font-extrabold text-white font-mono mt-0.5">
                  ₹ {grandTotal}.00
                </div>
              </div>
            </div>

            {/* Payment Mode Selector Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPaymentMode("CASH")}
                className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                  paymentMode === "CASH"
                    ? "bg-emerald-600 text-white shadow-soft-sm ring-2 ring-emerald-400"
                    : "bg-slate-950 text-slate-400 hover:bg-slate-800"
                }`}
              >
                💵 CASH
              </button>
              <button
                onClick={() => setPaymentMode("UPI")}
                className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                  paymentMode === "UPI"
                    ? "bg-blue-600 text-white shadow-soft-sm ring-2 ring-blue-400"
                    : "bg-slate-950 text-slate-400 hover:bg-slate-800"
                }`}
              >
                📲 UPI / QR
              </button>
              <button
                onClick={() => setPaymentMode("KHATA")}
                className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                  paymentMode === "KHATA"
                    ? "bg-amber-600 text-white shadow-soft-sm ring-2 ring-amber-400"
                    : "bg-slate-950 text-slate-400 hover:bg-slate-800"
                }`}
              >
                📒 KHATA (Udhar)
              </button>
            </div>
          </div>

          {/* Express Checkout Button */}
          <div className="mt-4">
            <Button
              size="lg"
              variant="primary"
              onClick={handleCheckout}
              className="w-full text-base font-bold py-3.5"
            >
              🖨️ CHECKOUT & PRINT THERMAL BILL (F8)
            </Button>
          </div>
        </div>
      </div>

      {/* Thermal Receipt Print Modal */}
      <Modal isOpen={showReceiptModal} onClose={() => setShowReceiptModal(false)} title="Thermal Bill Receipt">
        <div className="text-center space-y-4 text-slate-900 dark:text-slate-100">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 text-2xl flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Transaction Complete!</h3>
            <p className="text-xs text-slate-500 font-mono mt-1">Bill Invoice {completedBillNo}</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 text-left font-mono text-xs space-y-2 border border-slate-200 dark:border-slate-700">
            <div className="text-center font-bold text-sm border-b border-slate-200 dark:border-slate-700 pb-2">
              RISHABH PROVISION STORE
            </div>
            <div className="flex justify-between">
              <span>Customer:</span>
              <span>{selectedCustomer}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Mode:</span>
              <span>{paymentMode}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 font-bold text-sm text-emerald-600 dark:text-emerald-400">
              <span>Total Paid:</span>
              <span>₹ {grandTotal}.00</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => {
                alert(`Printing ${completedBillNo}...`);
                setShowReceiptModal(false);
                setCart([]);
              }}
            >
              <Printer className="w-4 h-4 mr-2 inline" /> Print Receipt
            </Button>
            <Button variant="outline" onClick={() => setShowReceiptModal(false)}>
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default POSPage;
