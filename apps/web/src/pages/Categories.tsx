import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Layers, CheckCircle, XCircle, Trash2, Edit3, X, Tag, Wheat, Flame, Coffee, Cookie, Milk, Smile, Sparkles, Droplet } from "lucide-react";
import { Button } from "@rishabh-store/ui";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  icon: string;
  description: string;
  status: "Active" | "Inactive";
  itemsCount: number;
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
  },
  {
    id: "CAT-005",
    name: "Beverages & Tea",
    slug: "beverages",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=150",
    icon: "coffee",
    description: "Assam tea bags, instant coffee, juices, and health drinks",
    status: "Active",
    itemsCount: 54,
  },
  {
    id: "CAT-006",
    name: "Snacks & Biscuits",
    slug: "snacks",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=150",
    icon: "cookie",
    description: "Namkeen, potato chips, cream biscuits, and dry fruits",
    status: "Active",
    itemsCount: 88,
  },
  {
    id: "CAT-007",
    name: "Dairy & Chilled",
    slug: "dairy",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=150",
    icon: "milk",
    description: "Fresh pouch milk, butter, paneer, and curd",
    status: "Active",
    itemsCount: 22,
  },
  {
    id: "CAT-008",
    name: "Personal Care",
    slug: "personal-care",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=150",
    icon: "smile",
    description: "Bathing soaps, shampoos, toothpaste, and skin creams",
    status: "Active",
    itemsCount: 63,
  },
  {
    id: "CAT-009",
    name: "Cleaning & Household",
    slug: "cleaning",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=150",
    icon: "sparkles",
    description: "Detergent powders, floor cleaners, and dishwash bars",
    status: "Active",
    itemsCount: 47,
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

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    const newCategory: CategoryItem = {
      id: `CAT-0${categories.length + 1}`,
      name: catName,
      slug: catName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      image: catImage.trim() || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=150",
      icon: "layers",
      description: catDesc,
      status: "Active",
      itemsCount: 0,
    };

    setCategories([newCategory, ...categories]);
    setCatName("");
    setCatDesc("");
    setCatImage("");
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
            Category Taxonomy
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Organize grocery catalog items into structured categories and storefront collections
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
            placeholder="Search categories by name or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
          />
        </div>

        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          Total Categories: {categories.length}
        </span>
      </div>

      {/* Categories Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => (
          <motion.div
            key={cat.id}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-lg overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative h-36 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <span className="font-mono text-xs px-2.5 py-0.5 bg-emerald-600/90 backdrop-blur-sm rounded-full font-bold">
                  {cat.slug}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-slate-900/80 backdrop-blur-sm rounded-md">
                  {cat.itemsCount} SKUs
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{cat.description}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  {cat.status}
                </span>
                <div className="flex items-center gap-1">
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
                  Add New Category
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
                    Category Name * (e.g. Masala & Spices)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Masala & Spices"
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
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
                    rows={3}
                    placeholder="Category overview & item inclusions..."
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
