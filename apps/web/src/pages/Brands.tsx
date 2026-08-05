import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Tag, CheckCircle, XCircle, Trash2, Edit3, X, Building2 } from "lucide-react";
import { Button } from "@rishabh-store/ui";

interface BrandItem {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  status: "Active" | "Inactive";
  productsCount: number;
}

const initialBrands: BrandItem[] = [
  {
    id: "BRD-001",
    name: "Aashirvaad",
    slug: "aashirvaad",
    logo: "https://images.unsplash.com/photo-1574323758207-f60101053e2c?w=100",
    description: "ITC Premium Whole Wheat Atta & Spices",
    status: "Active",
    productsCount: 42,
  },
  {
    id: "BRD-002",
    name: "Fortune",
    slug: "fortune",
    logo: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100",
    description: "Adani Wilmar Edible Oils & Pulses",
    status: "Active",
    productsCount: 35,
  },
  {
    id: "BRD-003",
    name: "Amul",
    slug: "amul",
    logo: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100",
    description: "The Taste of India Dairy Products",
    status: "Active",
    productsCount: 68,
  },
  {
    id: "BRD-004",
    name: "Tata Consumer",
    slug: "tata-consumer",
    logo: "https://images.unsplash.com/photo-1563822249510-04678c78fa85?w=100",
    description: "Tata Salt, Sampann Pulses & Tea",
    status: "Active",
    productsCount: 51,
  },
];

export const Brands: React.FC = () => {
  const [brands, setBrands] = useState<BrandItem[]>(initialBrands);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandDesc, setNewBrandDesc] = useState("");
  const [newBrandLogo, setNewBrandLogo] = useState("");

  const filteredBrands = brands.filter((brand) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || brand.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;

    const newBrand: BrandItem = {
      id: `BRD-00${brands.length + 1}`,
      name: newBrandName,
      slug: newBrandName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      logo: newBrandLogo.trim() || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100",
      description: newBrandDesc,
      status: "Active",
      productsCount: 0,
    };

    setBrands([newBrand, ...brands]);
    setNewBrandName("");
    setNewBrandDesc("");
    setNewBrandLogo("");
    setIsModalOpen(false);
  };

  const handleDeleteBrand = (id: string) => {
    setBrands(brands.filter((b) => b.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Building2 className="w-8 h-8 text-emerald-600" />
            Brand Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage grocery manufacturer brands, logos, and catalog inventory counts
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Add Brand
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search brands by name or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
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
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6">Logo</th>
                <th className="py-4 px-6">Brand Name</th>
                <th className="py-4 px-6">Slug</th>
                <th className="py-4 px-6">Products Count</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredBrands.map((brand) => (
                <tr key={brand.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="py-4 px-6">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-sm group-hover:scale-105 transition-transform"
                    />
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">
                    {brand.name}
                    <p className="text-xs text-slate-400 font-normal">{brand.description}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-mono text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg border border-slate-200">
                      {brand.slug}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-700">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200/60">
                      <Tag className="w-3.5 h-3.5" />
                      {brand.productsCount} SKUs
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        brand.status === "Active"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-rose-100 text-rose-800 border border-rose-200"
                      }`}
                    >
                      {brand.status === "Active" ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      )}
                      {brand.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBrand(brand.id)}
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

      {/* Add Brand Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-slate-100 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                  Add New Brand
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddBrand} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dabur"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Logo Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newBrandLogo}
                    onChange={(e) => setNewBrandLogo(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Short brand overview & Manufacturer details..."
                    value={newBrandDesc}
                    onChange={(e) => setNewBrandDesc(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
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
                    Create Brand
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Brands;
