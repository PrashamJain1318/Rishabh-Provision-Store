import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Layers, CheckCircle, Trash2, Edit3, X, ChevronRight, Tag } from "lucide-react";
import { Button } from "@rishabh-store/ui";

interface SubcategoryItem {
  id: string;
  name: string;
  slug: string;
  itemsCount: number;
}

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  icon: string;
  description: string;
  status: "Active" | "Inactive";
  itemsCount: number;
  subcategories: SubcategoryItem[];
}

const initialCategories: CategoryItem[] = [
  {
    id: "CAT-001",
    name: "Atta & Flours",
    slug: "atta",
    image: "https://images.unsplash.com/photo-1574323758207-f60101053e2c?w=150",
    icon: "wheat",
    description: "Chakki fresh wheat atta, maida, besan, and grain flours",
    status: "Active",
    itemsCount: 42,
    subcategories: [
      { id: "SUB-101", name: "Chakki Fresh Atta", slug: "chakki-atta", itemsCount: 18 },
      { id: "SUB-102", name: "Multigrain Atta", slug: "multigrain-atta", itemsCount: 10 },
      { id: "SUB-103", name: "Maida Flour", slug: "maida", itemsCount: 8 },
      { id: "SUB-104", name: "Besan Gram Flour", slug: "besan", itemsCount: 6 },
    ],
  },
  {
    id: "CAT-002",
    name: "Rice & Grains",
    slug: "rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150",
    icon: "grain",
    description: "Basmati rice, boiled rice, poha, and organic grains",
    status: "Active",
    itemsCount: 38,
    subcategories: [
      { id: "SUB-201", name: "Basmati Premium Rice", slug: "basmati-rice", itemsCount: 15 },
      { id: "SUB-202", name: "Sona Masoori Rice", slug: "daily-rice", itemsCount: 12 },
      { id: "SUB-203", name: "Poha Flakes", slug: "poha", itemsCount: 6 },
      { id: "SUB-204", name: "Brown Organic Rice", slug: "brown-rice", itemsCount: 5 },
    ],
  },
  {
    id: "CAT-003",
    name: "Edible Oils & Ghee",
    slug: "oil",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150",
    icon: "droplet",
    description: "Sunflower oil, mustard oil, cow ghee, and vanaspati",
    status: "Active",
    itemsCount: 29,
    subcategories: [
      { id: "SUB-301", name: "Mustard Oil", slug: "mustard-oil", itemsCount: 8 },
      { id: "SUB-302", name: "Sunflower Oil", slug: "sunflower-oil", itemsCount: 9 },
      { id: "SUB-303", name: "Olive Oil", slug: "olive-oil", itemsCount: 5 },
      { id: "SUB-304", name: "Groundnut Oil", slug: "groundnut-oil", itemsCount: 7 },
    ],
  },
  {
    id: "CAT-004",
    name: "Masala & Spices",
    slug: "masala",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=150",
    icon: "flame",
    description: "Turmeric, chili powder, coriander, and blended spices",
    status: "Active",
    itemsCount: 75,
    subcategories: [
      { id: "SUB-401", name: "Whole Spices", slug: "whole-spices", itemsCount: 25 },
      { id: "SUB-402", name: "Ground Powdered Spices", slug: "powdered-spices", itemsCount: 30 },
      { id: "SUB-403", name: "Garam Masala Blends", slug: "blended-masala", itemsCount: 20 },
    ],
  },
];

export const Categories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [catImage, setCatImage] = useState("");
  const [catSubcategoriesStr, setCatSubcategoriesStr] = useState("");

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.subcategories.some((sub) => sub.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    const parsedSubcategories: SubcategoryItem[] = catSubcategoriesStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((subName, i) => ({
        id: `SUB-${Date.now()}-${i}`,
        name: subName,
        slug: subName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        itemsCount: 0,
      }));

    const newCategory: CategoryItem = {
      id: `CAT-0${categories.length + 1}`,
      name: catName,
      slug: catName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      image: catImage.trim() || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=150",
      icon: "layers",
      description: catDesc,
      status: "Active",
      itemsCount: 0,
      subcategories: parsedSubcategories,
    };

    setCategories([newCategory, ...categories]);
    setCatName("");
    setCatDesc("");
    setCatImage("");
    setCatSubcategoriesStr("");
    setIsModalOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Layers className="w-8 h-8 text-emerald-600" />
            Category & Subcategory Taxonomy
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Organize grocery catalog items into parent categories and nested subcategories
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </Button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search categories or subcategories (e.g. Mustard Oil)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
          />
        </div>

        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          Categories: {categories.length}
        </span>
      </div>

      {/* Categories Grid Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCategories.map((cat) => (
          <motion.div
            key={cat.id}
            whileHover={{ scale: 1.01 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-lg overflow-hidden flex flex-col sm:flex-row group"
          >
            {/* Left Image & Metadata Banner */}
            <div className="sm:w-48 relative h-48 sm:h-auto overflow-hidden shrink-0">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-3 left-3 flex flex-col gap-1 text-white">
                <span className="font-mono text-[10px] px-2 py-0.5 bg-emerald-600/90 rounded-full font-bold w-max">
                  {cat.slug}
                </span>
                <span className="text-xs font-semibold">
                  {cat.itemsCount} Total SKUs
                </span>
              </div>
            </div>

            {/* Right Details & Subcategories */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    {cat.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{cat.description}</p>
              </div>

              {/* Nested Subcategories Pills */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Subcategories ({cat.subcategories.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.subcategories.map((sub) => (
                    <span
                      key={sub.id}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg text-xs font-semibold border border-slate-200/80 transition-colors"
                    >
                      <ChevronRight className="w-3 h-3 text-emerald-500" />
                      {sub.name}
                      <span className="text-[10px] text-slate-400 font-normal">({sub.itemsCount})</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Category Modal */}
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
                  <Layers className="w-5 h-5 text-emerald-600" />
                  Add New Category & Subcategories
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddCategory} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Category Name * (e.g. Edible Oils & Ghee)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Edible Oils & Ghee"
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Subcategories (Comma separated e.g. Mustard Oil, Sunflower Oil, Olive Oil)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mustard Oil, Sunflower Oil, Olive Oil, Groundnut Oil"
                    value={catSubcategoriesStr}
                    onChange={(e) => setCatSubcategoriesStr(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Banner Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={catImage}
                    onChange={(e) => setCatImage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Overview of oils, fats, and ghee variants..."
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
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
                    Create Category
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

export default Categories;
