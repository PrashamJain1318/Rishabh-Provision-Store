import React, { useState } from "react";
import { Button } from "@rishabh-store/ui";

interface CartLineItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export const POSPage: React.FC = () => {
  const [cart, setCart] = useState<CartLineItem[]>([
    { id: "P1", name: "Aashirvaad Shuddh Chakki Atta 5kg", price: 245, qty: 1 },
    { id: "P2", name: "Amul Butter Pasteurized 500g", price: 275, qty: 2 },
    { id: "P3", name: "Tata Salt 1kg", price: 28, qty: 3 },
  ]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + gst;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top POS Header Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-bold flex items-center justify-center text-sm">⚡</div>
          <div>
            <h2 className="font-bold text-base text-white">Rishabh POS Terminal 1</h2>
            <p className="text-xs text-slate-400">Cashier: Ramesh Sharma | Shift #4</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 font-mono font-semibold">F2: Search Product</span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 font-mono font-semibold">F8: Payment & Checkout</span>
          <a href="/dashboard">
            <Button size="sm" variant="secondary">Exit POS</Button>
          </a>
        </div>
      </header>

      {/* Main Terminal Split Screen */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* Left Side: Product Grid & Barcode Scanner Input (7 cols) */}
        <div className="lg:col-span-7 border-r border-slate-800 p-6 flex flex-col gap-4 overflow-y-auto">
          {/* Barcode Scanner Input */}
          <div className="relative">
            <input
              type="text"
              autoFocus
              placeholder="🔍 Scan barcode or press F2 to search product..."
              className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-lg px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
            <span className="absolute right-4 top-3.5 text-xs text-slate-400 font-mono">[Ready for Scan]</span>
          </div>

          {/* Quick Select Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-medium cursor-pointer">All Staples</span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer">Dairy & Milk</span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer">Edible Oils</span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer">Soaps & Detergents</span>
          </div>

          {/* Cart Table Grid */}
          <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-y-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 text-xs uppercase">
                  <th className="pb-2">Item Name</th>
                  <th className="pb-2 text-center">Qty</th>
                  <th className="pb-2 text-right">Price</th>
                  <th className="pb-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {cart.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900">
                    <td className="py-3 font-medium text-slate-200">{item.name}</td>
                    <td className="py-3 text-center">
                      <span className="bg-slate-800 px-2.5 py-1 rounded-lg text-xs font-mono font-bold">{item.qty}</span>
                    </td>
                    <td className="py-3 text-right font-mono text-slate-300">₹ {item.price}</td>
                    <td className="py-3 text-right font-mono font-bold text-emerald-400">₹ {item.price * item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Total Bill & Express Payment Actions (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-950 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-2">Checkout Bill Summary</h3>
            <div className="space-y-2 text-sm text-slate-300 font-mono">
              <div className="flex justify-between">
                <span>Subtotal Items ({cart.reduce((a, b) => a + b.qty, 0)}):</span>
                <span>₹ {subtotal}.00</span>
              </div>
              <div className="flex justify-between">
                <span>GST (Estimated 5%):</span>
                <span>₹ {gst}.00</span>
              </div>
              <div className="flex justify-between text-xs text-emerald-400">
                <span>Discount / Promo:</span>
                <span>- ₹ 0.00</span>
              </div>
            </div>

            <div className="bg-emerald-950 border border-emerald-800/50 rounded-2xl p-4 text-center my-4">
              <span className="text-xs uppercase text-emerald-300 font-semibold tracking-wider">Grand Total Payable</span>
              <div className="text-4xl font-extrabold text-white font-mono mt-1">₹ {grandTotal}.00</div>
            </div>

            {/* Payment Mode Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button className="py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-soft-sm hover:bg-emerald-500">
                💵 CASH
              </button>
              <button className="py-3 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-soft-sm hover:bg-blue-500">
                📲 UPI / QR
              </button>
              <button className="py-3 bg-amber-600 text-white font-bold text-xs rounded-xl shadow-soft-sm hover:bg-amber-500">
                📒 KHATA (Udhar)
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <Button size="lg" variant="primary" className="w-full text-base font-bold">
              🖨️ PRINT THERMAL RECEIPT & COMPLETE BILL
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSPage;
