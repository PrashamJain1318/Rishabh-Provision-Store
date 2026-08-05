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
  Phone,
  Mail,
  Building,
  MapPin,
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

interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  gst?: string;
  address?: string;
  type: "Walk-in" | "Regular" | "Wholesale";
}

const initialCustomers: CustomerProfile[] = [
  { id: "CUST-000", name: "Walk-in Customer", phone: "N/A", type: "Walk-in" },
  { id: "CUST-001", name: "Ramesh Kumar (Wholesale)", phone: "+91 98201 11223", email: "ramesh@gmail.com", gst: "27AAACI1681G1ZM", address: "Shop 12, Main Market, Mumbai", type: "Wholesale" },
  { id: "CUST-002", name: "Sita Sharma", phone: "+91 98980 44556", email: "sita.sharma@yahoo.com", address: "Flat 402, Sunshine Heights, Mumbai", type: "Regular" },
];

const posCatalog: POSProduct[] = [
  { id: "P1", code: "8901058000123", sku: "ATT-AASH-5KG", name: "Aashirvaad Shudh Chakki Atta 5kg", brand: "Aashirvaad", category: "Atta & Flours", price: 245, mrp: 275, gst: 0, stock: 145, image: "https://images.unsplash.com/photo-1574323758207-f60101053e2c?w=300" },
  { id: "P2", code: "8906007280054", sku: "OIL-FORT-1L", name: "Fortune Kachi Ghani Mustard Oil 1L", brand: "Fortune", category: "Edible Oils", price: 142, mrp: 165, gst: 5, stock: 82, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300" },
  { id: "P3", code: "8901262010052", sku: "BUT-AMUL-500G", name: "Amul Pasteurised Cow Butter 500g", brand: "Amul", category: "Dairy & Chilled", price: 275, mrp: 280, gst: 12, stock: 48, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300" },
  { id: "P4", code: "8901058852310", sku: "SLT-TATA-1KG", name: "Tata Salt Iodized Vacuum Salt 1kg", brand: "Tata Consumer", category: "Masala & Spices", price: 27, mrp: 28, gst: 0, stock: 320, image: "https://images.unsplash.com/photo-1563822249510-04678c78fa85?w=300" },
];

export const POSPage: React.FC = () => {
  const [customersList, setCustomersList] = useState<CustomerProfile[]>(initialCustomers);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("CUST-000");

  // New Customer Modal
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [newCustName, setNewCustName] = useState("");
  const [newCustPhone, setNewCustPhone] = useState("");
  const [newCustEmail, setNewCustEmail] = useState("");
  const [newCustGst, setNewCustGst] = useState("");
  const [newCustAddress, setNewCustAddress] = useState("");

  const [rawSearchQuery, setRawSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([
    { id: "P1", code: "8901058000123", sku: "ATT-AASH-5KG", name: "Aashirvaad Shudh Chakki Atta 5kg", price: 245, originalPrice: 245, gst: 0, qty: 1 },
  ]);

  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [completedBillNo, setCompletedBillNo] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedCustomer = customersList.find((c) => c.id === selectedCustomerId) || initialCustomers[0];

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName.trim() || !newCustPhone.trim()) return;

    const created: CustomerProfile = {
      id: `CUST-00${customersList.length}`,
      name: newCustName.trim(),
      phone: newCustPhone.trim(),
      email: newCustEmail.trim() || undefined,
      gst: newCustGst.trim().toUpperCase() || undefined,
      address: newCustAddress.trim() || undefined,
      type: newCustGst ? "Wholesale" : "Regular",
    };

    setCustomersList([...customersList, created]);
    setSelectedCustomerId(created.id);
    setShowAddCustomerModal(false);
    setNewCustName("");
    setNewCustPhone("");
    setNewCustEmail("");
    setNewCustGst("");
    setNewCustAddress("");
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

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalGst = Math.round(cart.reduce((sum, item) => sum + (item.price * item.qty * item.gst) / 100, 0));
  const grandTotal = subtotal + totalGst;

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
            <p className="text-xs text-slate-400">Customer Management: Walk-in, Existing & Quick Registration</p>
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
        {/* Left Column: Product Grid (7 Cols) */}
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

        {/* Right Column: Customer Selection & Cart (5 Cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-900 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            {/* CUSTOMER MODULE SELECTOR & NEW CUSTOMER TRIGGER */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-300 uppercase flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-400" /> Customer Options
                </span>
                <button
                  onClick={() => setShowAddCustomerModal(true)}
                  className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800/80 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-emerald-900"
                >
                  <UserPlus className="w-3.5 h-3.5" /> + New Customer
                </button>
              </div>

              <select
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 font-bold focus:ring-1 focus:ring-emerald-500"
              >
                {customersList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.phone !== "N/A" ? `(${c.phone})` : ""} {c.gst ? `- GST: ${c.gst}` : ""}
                  </option>
                ))}
              </select>

              {/* Selected Customer Details */}
              {selectedCustomer.id !== "CUST-000" && (
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] space-y-1 text-slate-300 font-mono">
                  <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                  {selectedCustomer.email && <p><strong>Email:</strong> {selectedCustomer.email}</p>}
                  {selectedCustomer.gst && <p><strong className="text-emerald-400">GSTIN:</strong> {selectedCustomer.gst}</p>}
                  {selectedCustomer.address && <p><strong>Address:</strong> {selectedCustomer.address}</p>}
                </div>
              )}
            </div>

            {/* Shopping Cart Summary */}
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
            disabled={cart.length === 0}
            onClick={() => {
              setCompletedBillNo(`INV-2026-${Math.floor(1000 + Math.random() * 9000)}`);
              setShowReceiptModal(true);
            }}
            className="w-full mt-4 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20"
          >
            <Printer className="w-4 h-4 mr-2 inline" /> Checkout ({selectedCustomer.name})
          </Button>
        </div>
      </div>

      {/* CREATE NEW CUSTOMER MODAL */}
      <Modal isOpen={showAddCustomerModal} onClose={() => setShowAddCustomerModal(false)} title="Create New Customer Profile">
        <form onSubmit={handleCreateCustomer} className="space-y-3 text-slate-900 dark:text-slate-100">
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Customer Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Kumar / Anjali Mehta"
              value={newCustName}
              onChange={(e) => setNewCustName(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Mobile Phone *</label>
              <input
                type="text"
                required
                placeholder="+91 98201 12345"
                value={newCustPhone}
                onChange={(e) => setNewCustPhone(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">Email Address</label>
              <input
                type="email"
                placeholder="customer@email.com"
                value={newCustEmail}
                onChange={(e) => setNewCustEmail(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase mb-1">GSTIN Number (15 Digits)</label>
              <input
                type="text"
                placeholder="27AAACI1681G1ZM"
                value={newCustGst}
                onChange={(e) => setNewCustGst(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">Street Address</label>
              <input
                type="text"
                placeholder="Shop 12, Main Market"
                value={newCustAddress}
                onChange={(e) => setNewCustAddress(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button type="button" variant="outline" onClick={() => setShowAddCustomerModal(false)}>Cancel</Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">Register Customer</Button>
          </div>
        </form>
      </Modal>

      {/* Thermal Receipt Print Modal */}
      <Modal isOpen={showReceiptModal} onClose={() => setShowReceiptModal(false)} title="Thermal Bill Receipt">
        <div className="text-center space-y-4 text-slate-900 dark:text-slate-100">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 text-2xl flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div><h3 className="text-xl font-bold font-mono">Invoice {completedBillNo}</h3><p className="text-xs text-slate-500">Customer: {selectedCustomer.name}</p></div>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold" onClick={() => { setShowReceiptModal(false); setCart([]); }}>
            <Printer className="w-4 h-4 mr-2 inline" /> Print ESC/POS Thermal Bill
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default POSPage;
