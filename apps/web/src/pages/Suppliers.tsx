import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Truck, CheckCircle, XCircle, Trash2, Edit3, X, MapPin, Mail, Phone, FileText, DollarSign } from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button } from "@rishabh-store/ui";

interface SupplierItem {
  id: string;
  companyName: string;
  gst: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  outstandingBalance: number;
  status: "Active" | "Inactive";
}

const initialSuppliers: SupplierItem[] = [
  {
    id: "SUP-001",
    companyName: "ITC Grocery Wholesalers Ltd",
    gst: "27AAACI1234A1Z5",
    email: "supply@itcgrocery.com",
    phone: "+91 98200 11223",
    address: "Plot 42, MIDC Industrial Area",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400093",
    outstandingBalance: 45000,
    status: "Active",
  },
  {
    id: "SUP-002",
    companyName: "Adani Wilmar Edible Oils Supply",
    gst: "24AAACA5678B1Z2",
    email: "orders@adaniwilmar.in",
    phone: "+91 98799 88776",
    address: "Adani House, Navrangpura",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380009",
    outstandingBalance: 125000,
    status: "Active",
  },
  {
    id: "SUP-003",
    companyName: "Amul Anand Dairy Union Co",
    gst: "24AAAAA9999C1Z9",
    email: "distributor@amul.coop",
    phone: "+91 98250 98250",
    address: "Dairy Road, Anand",
    city: "Anand",
    state: "Gujarat",
    pincode: "388001",
    outstandingBalance: 18400,
    status: "Active",
  },
];

export const SuppliersPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<SupplierItem[]>(initialSuppliers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [companyName, setCompanyName] = useState("");
  const [gst, setGst] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [outstandingBalance, setOutstandingBalance] = useState("0");

  const filteredSuppliers = suppliers.filter((sp) => {
    const matchesSearch =
      sp.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sp.gst.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sp.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || sp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !email.trim() || !phone.trim()) return;

    const newSupplier: SupplierItem = {
      id: `SUP-00${suppliers.length + 1}`,
      companyName,
      gst,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      outstandingBalance: parseFloat(outstandingBalance) || 0,
      status: "Active",
    };

    setSuppliers([newSupplier, ...suppliers]);
    setCompanyName("");
    setGst("");
    setEmail("");
    setPhone("");
    setAddress("");
    setCity("");
    setState("");
    setPincode("");
    setOutstandingBalance("0");
    setIsModalOpen(false);
  };

  const handleDeleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
  };

  return (
    <DashboardLayout activeNavId="suppliers">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <Truck className="w-8 h-8 text-emerald-600" />
              Wholesale Supplier Directory
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage vendor profiles, GSTIN registrations, supply locations, and accounts payable
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

        {/* Filters & Search */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search suppliers by company name, GSTIN, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            {(["All", "Active", "Inactive"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                  statusFilter === filter
                    ? "bg-slate-900 dark:bg-emerald-600 text-white shadow-md"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Company Name & GSTIN</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">Location Address</th>
                  <th className="py-4 px-6">Outstanding Balance</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {filteredSuppliers.map((sp) => (
                  <tr key={sp.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                        {sp.companyName}
                      </div>
                      {sp.gst && (
                        <p className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                          <FileText className="w-3 h-3 text-slate-400" />
                          GSTIN: {sp.gst}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-6 space-y-0.5">
                      <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {sp.email}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {sp.phone}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 dark:text-slate-300">
                      <p className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {sp.city}, {sp.state}
                      </p>
                      <p className="text-slate-400 text-[11px] truncate max-w-xs">{sp.address} - {sp.pincode}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 font-bold text-xs px-3 py-1 bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-800">
                        <DollarSign className="w-3.5 h-3.5" />
                        ₹{sp.outstandingBalance.toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          sp.status === "Active"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-rose-100 text-rose-800 border border-rose-200"
                        }`}
                      >
                        {sp.status === "Active" ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        )}
                        {sp.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSupplier(sp.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
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
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-xl shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-emerald-600" />
                    Add New Supplier Profile
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddSupplier} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dabur India Ltd"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        GSTIN Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 27AAACD1234A1Z5"
                        value={gst}
                        onChange={(e) => setGst(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="orders@supplier.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98200 00000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                      placeholder="Warehouse Address / MIDC Area..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
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
                        placeholder="Mumbai"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        placeholder="Maharashtra"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        placeholder="400093"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Initial Outstanding Balance (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={outstandingBalance}
                      onChange={(e) => setOutstandingBalance(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    />
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
                      Save Supplier
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
