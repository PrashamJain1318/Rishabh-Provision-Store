import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  Plus,
  Search,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
  FileText,
  DollarSign,
  AlertCircle,
  Edit3,
  Trash2,
  X,
  CreditCard,
  Building,
} from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "@rishabh-store/ui";

interface SupplierItem {
  id: string;
  companyName: string;
  ownerName: string;
  gst: string;
  pan: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  outstandingBalance: number;
  creditLimit: number;
  totalPurchases: number;
  pendingPaymentsCount: number;
  status: "Active" | "Inactive";
}

const initialSuppliers: SupplierItem[] = [
  {
    id: "SUP-001",
    companyName: "ITC Grocery Wholesalers Ltd",
    ownerName: "Sanjiv Puri",
    gst: "27AAACI1681G1ZM",
    pan: "AAACI1681G",
    phone: "+91 98201 12345",
    email: "wholesale.orders@itc.in",
    address: "ITC Centre, 4th Floor, MIDC Andheri East",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400093",
    outstandingBalance: 42000,
    creditLimit: 500000,
    totalPurchases: 850000,
    pendingPaymentsCount: 2,
    status: "Active",
  },
  {
    id: "SUP-002",
    companyName: "Adani Wilmar Edible Oils Supply",
    ownerName: "Angshu Mallick",
    gst: "24AABCA2238D1Z2",
    pan: "AABCA2238D",
    phone: "+91 98980 54321",
    email: "supply.fortune@adaniwilmar.com",
    address: "Adani Corporate House, SG Highway",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "382421",
    outstandingBalance: 18500,
    creditLimit: 300000,
    totalPurchases: 420000,
    pendingPaymentsCount: 1,
    status: "Active",
  },
  {
    id: "SUP-003",
    companyName: "Amul Anand Dairy Union Co",
    ownerName: "RS Sodhi",
    gst: "24AAAAA0000A1Z5",
    pan: "AAAAA0000A",
    phone: "+91 98250 99887",
    email: "dairy.orders@amul.coop",
    address: "Amul Dairy Road, Anand District",
    city: "Anand",
    state: "Gujarat",
    pincode: "388001",
    outstandingBalance: 7200,
    creditLimit: 200000,
    totalPurchases: 215000,
    pendingPaymentsCount: 1,
    status: "Active",
  },
];

export const SuppliersPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<SupplierItem[]>(initialSuppliers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    gst: "",
    pan: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    creditLimit: "500000",
    outstandingBalance: "0",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName.trim() || !formData.phone.trim()) return;

    const newSupplier: SupplierItem = {
      id: `SUP-00${suppliers.length + 1}`,
      companyName: formData.companyName,
      ownerName: formData.ownerName || "Manager",
      gst: formData.gst.toUpperCase() || "N/A",
      pan: formData.pan.toUpperCase() || "N/A",
      phone: formData.phone,
      email: formData.email || "orders@vendor.com",
      address: formData.address || "Main Market",
      city: formData.city || "Mumbai",
      state: formData.state || "Maharashtra",
      pincode: formData.pincode || "400001",
      outstandingBalance: parseFloat(formData.outstandingBalance) || 0,
      creditLimit: parseFloat(formData.creditLimit) || 500000,
      totalPurchases: 0,
      pendingPaymentsCount: 0,
      status: "Active",
    };

    setSuppliers([newSupplier, ...suppliers]);
    setIsModalOpen(false);
  };

  // Dashboard Aggregates
  const totalSuppliersCount = suppliers.length;
  const totalPurchaseVolume = suppliers.reduce((sum, s) => sum + s.totalPurchases, 0);
  const totalPendingInvoices = suppliers.reduce((sum, s) => sum + s.pendingPaymentsCount, 0);
  const totalOutstandingBalance = suppliers.reduce((sum, s) => sum + s.outstandingBalance, 0);

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.gst.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone.includes(searchQuery)
  );

  return (
    <DashboardLayout activeNavId="suppliers">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <Truck className="w-8 h-8 text-emerald-600" />
              Supplier Management & Vendor Ledger
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Wholesale vendor profiles, GSTIN & PAN validation, outstanding accounts payable, and credit terms
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Add Supplier
          </Button>
        </div>

        {/* 4 SUPPLIER DASHBOARD METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Suppliers */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Suppliers</p>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{totalSuppliersCount}</h3>
              <span className="text-[10px] font-bold text-emerald-600">Active Vendors</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Total Purchases */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Total Purchases</p>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                ₹{(totalPurchaseVolume / 100000).toFixed(2)}L
              </h3>
              <span className="text-[10px] font-bold text-blue-600">Cumulative Volume</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Pending Payments */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase">Pending Payments</p>
              <h3 className="text-2xl font-extrabold text-amber-600 mt-1">{totalPendingInvoices} Invoices</h3>
              <span className="text-[10px] font-bold text-amber-600">Action Needed</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Outstanding Balance */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-rose-200 dark:border-rose-900/50 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-rose-600 text-xs font-semibold uppercase">Outstanding Balance</p>
              <h3 className="text-2xl font-extrabold text-rose-600 mt-1">₹{totalOutstandingBalance.toLocaleString("en-IN")}</h3>
              <span className="text-[10px] font-bold text-rose-600">Accounts Payable</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search suppliers by Company, Owner, GSTIN, or Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <span className="text-xs font-semibold text-slate-500">Showing {filteredSuppliers.length} Vendors</span>
        </div>

        {/* Top Suppliers Table Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="p-4 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-600" />
            Top Supplier Vendors & Accounts Payable Directory
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/30 text-slate-500 uppercase font-bold tracking-wider">
                  <th className="py-4 px-6">Company & Owner</th>
                  <th className="py-4 px-6">GSTIN & PAN</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">City & State</th>
                  <th className="py-4 px-6">Outstanding / Credit Limit</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredSuppliers.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors font-medium">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{s.companyName}</p>
                      <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                        <User className="w-3 h-3 text-emerald-600" />
                        Prop: {s.ownerName}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono">
                      <p className="font-bold text-slate-800 dark:text-slate-200">GST: {s.gst}</p>
                      <p className="text-slate-400 text-[10px]">PAN: {s.pan}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-slate-800 dark:text-slate-200 font-semibold">{s.phone}</p>
                      <p className="text-slate-400 text-[10px] truncate max-w-xs">{s.email}</p>
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-300">
                      <p className="font-semibold">{s.city}, {s.state}</p>
                      <p className="text-slate-400 text-[10px]">{s.pincode}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-extrabold text-rose-600">₹{s.outstandingBalance.toLocaleString("en-IN")}</span>
                          <span className="text-slate-400 text-[10px]">/ ₹{(s.creditLimit / 1000).toFixed(0)}k</span>
                        </div>
                        <div className="w-28 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-rose-500 h-full rounded-full"
                            style={{ width: `${Math.min(100, (s.outstandingBalance / s.creditLimit) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-1">
                      <button className="p-2 text-slate-400 hover:text-emerald-600 rounded-lg">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Supplier Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-xl shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-emerald-600" />
                    Add Wholesale Supplier Profile
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddSupplier} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        required
                        placeholder="e.g. ITC Grocery Wholesalers Ltd"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Owner / Contact Person
                      </label>
                      <input
                        type="text"
                        name="ownerName"
                        placeholder="e.g. Sanjiv Puri"
                        value={formData.ownerName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        GSTIN (15 Digits)
                      </label>
                      <input
                        type="text"
                        name="gst"
                        placeholder="27AAACI1681G1ZM"
                        value={formData.gst}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        PAN Number (10 Digits)
                      </label>
                      <input
                        type="text"
                        name="pan"
                        placeholder="AAACI1681G"
                        value={formData.pan}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="text"
                        name="phone"
                        required
                        placeholder="+91 98201 12345"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="orders@vendor.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="ITC Centre, MIDC Andheri East"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        placeholder="Mumbai"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        placeholder="Maharashtra"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        placeholder="400093"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Credit Limit (₹)
                      </label>
                      <input
                        type="number"
                        name="creditLimit"
                        placeholder="500000"
                        value={formData.creditLimit}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Initial Outstanding (₹)
                      </label>
                      <input
                        type="number"
                        name="outstandingBalance"
                        placeholder="0"
                        value={formData.outstandingBalance}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-rose-600"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-5 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl font-semibold shadow-lg shadow-emerald-500/20"
                    >
                      Register Supplier
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default SuppliersPage;
