import React, { useState } from "react";
import { Button, Modal } from "@rishabh-store/ui";
import {
  Search,
  Printer,
  Receipt,
  CreditCard,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { InvoicePrinter } from "../components/InvoicePrinter";
import { paymentService } from "../services/payment.service";

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
];

export const POSPage: React.FC = () => {
  const [catalog] = useState<POSProduct[]>(posCatalog);
  const [rawSearchQuery, setRawSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([
    { id: "P1", code: "8901058000123", sku: "ATT-AASH-5KG", name: "Aashirvaad Shudh Chakki Atta 5kg", price: 245, originalPrice: 245, gst: 0, qty: 1 },
    { id: "P2", code: "8906007280054", sku: "OIL-FORT-1L", name: "Fortune Kachi Ghani Mustard Oil 1L", price: 142, originalPrice: 142, gst: 5, qty: 1 },
  ]);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("Razorpay");
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [completedBillNo, setCompletedBillNo] = useState("");
  const [paymentStatusMessage, setPaymentStatusMessage] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const totalAmount = cart.reduce((a, b) => a + b.price * b.qty, 0);

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

  const handleRazorpayPayment = () => {
    if (cart.length === 0) return;
    setIsProcessingPayment(true);
    setPaymentStatusMessage("Initializing Razorpay Secure Payment Gateway...");

    const receiptId = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    paymentService.processRazorpayCheckout({
      amount: totalAmount,
      receipt: receiptId,
      customerName: "Ramesh Kumar",
      customerEmail: "ramesh@gmail.com",
      customerPhone: "9876543210",
      onSuccess: (response) => {
        setIsProcessingPayment(false);
        setCompletedBillNo(receiptId);
        setPaymentStatusMessage(`✅ Razorpay Payment Captured! Signature verified: ${response.razorpay_payment_id}`);
        setShowReceiptModal(true);
      },
      onFailure: (error) => {
        setIsProcessingPayment(false);
        setPaymentStatusMessage(`❌ Payment Status: ${error.message || "Payment cancelled or failed"}`);
      },
    });
  };

  const handleManualCheckout = () => {
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
            <p className="text-xs text-slate-400">Razorpay Payment Integration & ESC/POS Thermal Printing</p>
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

        {/* Right Column: Checkout & Razorpay Integration */}
        <div className="lg:col-span-5 p-6 bg-slate-900 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-400" /> Cart Invoice Overview ({cart.length} items)
            </h3>

            {paymentStatusMessage && (
              <div className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 ${
                paymentStatusMessage.includes("✅")
                  ? "bg-emerald-950 border border-emerald-800 text-emerald-300"
                  : paymentStatusMessage.includes("❌")
                  ? "bg-rose-950 border border-rose-800 text-rose-300"
                  : "bg-blue-950 border border-blue-800 text-blue-300"
              }`}>
                {paymentStatusMessage.includes("✅") ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {paymentStatusMessage}
              </div>
            )}

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between"><span>Subtotal:</span><span>₹{totalAmount}.00</span></div>
              <div className="bg-emerald-950 border border-emerald-800/60 rounded-xl p-3 text-center mt-3">
                <span className="text-[10px] uppercase text-emerald-300 font-extrabold tracking-wider">Grand Total</span>
                <div className="text-3xl font-extrabold text-white font-mono mt-0.5">₹{totalAmount}.00</div>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <Button
              disabled={cart.length === 0 || isProcessingPayment}
              onClick={handleRazorpayPayment}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-indigo-500/20"
            >
              <CreditCard className="w-4 h-4 mr-2 inline" /> Pay ₹{totalAmount} via Razorpay (UPI/Card/Netbanking)
            </Button>

            <Button
              disabled={cart.length === 0}
              onClick={handleManualCheckout}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl"
            >
              <Printer className="w-4 h-4 mr-2 inline" /> Cash Checkout & ESC/POS Print
            </Button>
          </div>
        </div>
      </div>

      {/* Tax Invoice Print Modal */}
      <Modal isOpen={showReceiptModal} onClose={() => setShowReceiptModal(false)} title="Official Tax Invoice Document">
        <InvoicePrinter
          invoiceNumber={completedBillNo}
          date={new Date().toLocaleString("en-IN")}
          cashierName="Prasham Jain"
          customerName="Ramesh Kumar"
          customerPhone="+91 98765 43210"
          customerGst="27AAACI1681G1ZM"
          items={cart}
          paymentMode={selectedPaymentMethod}
          onClose={() => {
            setShowReceiptModal(false);
            setCart([]);
          }}
        />
      </Modal>
    </div>
  );
};

export default POSPage;
