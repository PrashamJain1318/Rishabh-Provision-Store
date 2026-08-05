import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Package,
  CheckCircle,
  XCircle,
  Trash2,
  Edit3,
  X,
  Grid,
  List,
  Filter,
  Tag,
  Barcode,
  Building2,
  Scale,
  Truck,
  Check,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  Calendar,
  Layers,
  Image as ImageIcon,
  AlertTriangle,
  RotateCcw,
  Upload,
} from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Button, BarcodeRenderer, BarcodeFormat } from "@rishabh-store/ui";

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  sku: string;
  barcode: string;
  barcodeFormat: BarcodeFormat;
  brand: string;
  category: string;
  subcategory: string;
  supplier: string;
  unit: string;
  description: string;
  purchasePrice: number;
  sellingPrice: number;
  mrp: number;
  discount: number;
  gst: number;
  stock: number;
  minimumStock: number;
  maximumStock: number;
  expiryDate: string;
  batchNumber: string;
  images: string[];
  status: "Active" | "Inactive" | "Out of Stock";
}

const initialProducts: ProductItem[] = [
  {
    id: "PROD-001",
    name: "Aashirvaad Shudh Chakki Whole Wheat Atta 5kg",
    slug: "aashirvaad-shudh-chakki-whole-wheat-atta-5kg",
    sku: "ATT-AASH-5KG",
    barcode: "8901058000123",
    barcodeFormat: "EAN13",
    brand: "Aashirvaad",
    category: "Atta & Flours",
    subcategory: "Chakki Fresh Atta",
    supplier: "ITC Grocery Wholesalers Ltd",
    unit: "kg",
    description: "100% pure whole wheat flour milled from selected golden grains",
    purchasePrice: 210,
    sellingPrice: 245,
    mrp: 275,
    discount: 10.9,
    gst: 0,
    stock: 145,
    minimumStock: 20,
    maximumStock: 500,
    expiryDate: "2026-11-30",
    batchNumber: "BAT-ATT-2026A",
    images: ["https://images.unsplash.com/photo-1574323758207-f60101053e2c?w=400"],
    status: "Active",
  },
  {
    id: "PROD-002",
    name: "Fortune Kachi Ghani Pure Mustard Oil 1L Pouch",
    slug: "fortune-kachi-ghani-pure-mustard-oil-1l-pouch",
    sku: "OIL-FORT-1L",
    barcode: "8906007280054",
    barcodeFormat: "EAN13",
    brand: "Fortune",
    category: "Edible Oils & Ghee",
    subcategory: "Mustard Oil",
    supplier: "Adani Wilmar Edible Oils Supply",
    unit: "L",
    description: "Traditional cold-pressed mustard oil with pungent aroma",
    purchasePrice: 128,
    sellingPrice: 142,
    mrp: 165,
    discount: 13.9,
    gst: 5,
    stock: 82,
    minimumStock: 15,
    maximumStock: 300,
    expiryDate: "2027-02-28",
    batchNumber: "BAT-OIL-2026B",
    images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"],
    status: "Active",
  },
  {
    id: "PROD-003",
    name: "Amul Pasteurised Pure Cow Butter 500g Pack",
    slug: "amul-pasteurised-pure-cow-butter-500g-pack",
    sku: "BUT-AMUL-500G",
    barcode: "8901262010052",
    barcodeFormat: "EAN13",
    brand: "Amul",
    category: "Dairy & Chilled",
    subcategory: "Butter & Cheese Blocks",
    supplier: "Amul Anand Dairy Union Co",
    unit: "pkt",
    description: "Utterly butterly delicious fresh pasteurised butter",
    purchasePrice: 240,
    sellingPrice: 275,
    mrp: 280,
    discount: 1.8,
    gst: 12,
    stock: 48,
    minimumStock: 10,
    maximumStock: 200,
    expiryDate: "2026-09-15",
    batchNumber: "BAT-AMUL-2026C",
    images: ["https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400"],
    status: "Active",
  },
  {
    id: "PROD-004",
    name: "Tata Salt Vacuum Evaporated Iodized Salt 1kg",
    slug: "tata-salt-vacuum-evaporated-iodized-salt-1kg",
    sku: "SLT-TATA-1KG",
    barcode: "8901058852310",
    barcodeFormat: "EAN13",
    brand: "Tata Consumer",
    category: "Masala & Spices",
    subcategory: "Powdered Ground Spices",
    supplier: "ITC Grocery Wholesalers Ltd",
    unit: "kg",
    description: "Desh ka namak - high purity iodized vacuum salt",
    purchasePrice: 22,
    sellingPrice: 27,
    mrp: 28,
    discount: 3.5,
    gst: 0,
    stock: 320,
    minimumStock: 50,
    maximumStock: 1000,
    expiryDate: "2028-05-31",
    batchNumber: "BAT-SLT-2026D",
    images: ["https://images.unsplash.com/photo-1563822249510-04678c78fa85?w=400"],
    status: "Active",
  },
];

const FORM_STEPS = ["Basic Information", "Pricing", "Supplier", "Inventory", "Images", "Review"];

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");

  // 8 SIMULTANEOUS FILTERS
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [brandFilter, setBrandFilter] = useState("All");
  const [supplierFilter, setSupplierFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [gstFilter, setGstFilter] = useState("All");
  const [stockStatusFilter, setStockStatusFilter] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedBarcodeProduct, setSelectedBarcodeProduct] = useState<ProductItem | null>(null);

  // Multi-step Wizard Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    barcode: "",
    barcodeFormat: "EAN13" as BarcodeFormat,
    category: "Atta & Flours",
    subcategory: "Chakki Fresh Atta",
    brand: "Aashirvaad",
    unit: "kg",
    description: "",
    purchasePrice: "210",
    sellingPrice: "245",
    mrp: "275",
    discount: "10.9",
    gst: "0",
    stock: "100",
    minimumStock: "10",
    maximumStock: "500",
    batchNumber: "BAT-2026-X",
    expiryDate: "2027-12-31",
    supplier: "ITC Grocery Wholesalers Ltd",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetAllFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All");
    setBrandFilter("All");
    setSupplierFilter("All");
    setStatusFilter("All");
    setGstFilter("All");
    setStockStatusFilter("All");
    setMinPrice("");
    setMaxPrice("");
  };

  const handleNextStep = () => {
    if (currentStep < FORM_STEPS.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: ProductItem = {
      id: `PROD-00${products.length + 1}`,
      name: formData.name || "Sample Grocery Item",
      slug: (formData.name || "Sample Item").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      sku: formData.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      barcode: formData.barcode || "8901058009999",
      barcodeFormat: formData.barcodeFormat,
      brand: formData.brand,
      category: formData.category,
      subcategory: formData.subcategory,
      supplier: formData.supplier,
      unit: formData.unit,
      description: formData.description,
      purchasePrice: parseFloat(formData.purchasePrice) || 100,
      sellingPrice: parseFloat(formData.sellingPrice) || 120,
      mrp: parseFloat(formData.mrp) || 130,
      discount: parseFloat(formData.discount) || 0,
      gst: parseFloat(formData.gst) || 0,
      stock: parseInt(formData.stock) || 50,
      minimumStock: parseInt(formData.minimumStock) || 10,
      maximumStock: parseInt(formData.maximumStock) || 500,
      expiryDate: formData.expiryDate || "2027-12-31",
      batchNumber: formData.batchNumber || "BAT-2026-X",
      images: formData.imageUrl ? [formData.imageUrl] : ["https://images.unsplash.com/photo-1542838132-92c53300491e?w=400"],
      status: "Active",
    };

    setProducts([newProduct, ...products]);
    setIsModalOpen(false);
    setCurrentStep(0);
  };

  // 8 SIMULTANEOUS FILTERS ENGINE
  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.barcode.toLowerCase().includes(q);

    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    const matchesBrand = brandFilter === "All" || p.brand === brandFilter;
    const matchesSupplier = supplierFilter === "All" || p.supplier === supplierFilter;
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    const matchesGst = gstFilter === "All" || p.gst === parseInt(gstFilter);

    const minP = minPrice !== "" ? parseFloat(minPrice) : 0;
    const maxP = maxPrice !== "" ? parseFloat(maxPrice) : Infinity;
    const matchesPrice = p.sellingPrice >= minP && p.sellingPrice <= maxP;

    let matchesStock = true;
    if (stockStatusFilter === "in_stock") matchesStock = p.stock > 10;
    if (stockStatusFilter === "low_stock") matchesStock = p.stock > 0 && p.stock <= 10;
    if (stockStatusFilter === "out_of_stock") matchesStock = p.stock === 0;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesSupplier &&
      matchesStatus &&
      matchesGst &&
      matchesPrice &&
      matchesStock
    );
  });

  return (
    <DashboardLayout activeNavId="products">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <Package className="w-8 h-8 text-emerald-600" />
              Master Product Catalog & Barcode Engine
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Multi-step Wizard ➔ Basic Info ➔ Pricing ➔ Supplier ➔ Inventory ➔ Images ➔ Review
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Add Product Wizard
          </Button>
        </div>

        {/* Toolbar & 8 Simultaneous Filters Panel */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search across Product Name, EAN Barcode, SKU Code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={resetAllFilters}
                className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Filters
              </button>

              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === "grid" ? "bg-white dark:bg-slate-700 text-emerald-600 shadow-sm" : "text-slate-400"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === "table" ? "bg-white dark:bg-slate-700 text-emerald-600 shadow-sm" : "text-slate-400"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 8 SIMULTANEOUS FILTER GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">1. Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
              >
                <option value="All">All</option>
                <option value="Atta & Flours">Atta & Flours</option>
                <option value="Edible Oils & Ghee">Edible Oils & Ghee</option>
                <option value="Dairy & Chilled">Dairy & Chilled</option>
                <option value="Masala & Spices">Masala & Spices</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">2. Brand</label>
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
              >
                <option value="All">All</option>
                <option value="Aashirvaad">Aashirvaad</option>
                <option value="Fortune">Fortune</option>
                <option value="Amul">Amul</option>
                <option value="Tata Consumer">Tata</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">3. Supplier</label>
              <select
                value={supplierFilter}
                onChange={(e) => setSupplierFilter(e.target.value)}
                className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
              >
                <option value="All">All</option>
                <option value="ITC Grocery Wholesalers Ltd">ITC</option>
                <option value="Adani Wilmar Edible Oils Supply">Adani</option>
                <option value="Amul Anand Dairy Union Co">Amul</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">4. Min Price (₹)</label>
              <input
                type="number"
                placeholder="₹0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">5. Max Price (₹)</label>
              <input
                type="number"
                placeholder="₹1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">6. Stock Level</label>
              <select
                value={stockStatusFilter}
                onChange={(e) => setStockStatusFilter(e.target.value)}
                className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
              >
                <option value="All">All Stock</option>
                <option value="in_stock">In Stock (&gt;10)</option>
                <option value="low_stock">Low Stock (1-10)</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">7. Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">8. GST Tax</label>
              <select
                value={gstFilter}
                onChange={(e) => setGstFilter(e.target.value)}
                className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
              >
                <option value="All">All GST</option>
                <option value="0">0% GST</option>
                <option value="5">5% GST</option>
                <option value="12">12% GST</option>
                <option value="18">18% GST</option>
              </select>
            </div>
          </div>
        </div>

        {/* View Mode Rendering */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-lg overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold bg-slate-900/80 text-white px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {product.sku}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="font-bold text-xs bg-emerald-600 text-white px-2.5 py-1 rounded-full shadow-md">
                      ₹{product.sellingPrice} <span className="text-[10px] line-through text-emerald-200">₹{product.mrp}</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      {product.category} • {product.brand} • {product.gst}% GST
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 mt-0.5">
                      {product.name}
                    </h3>
                  </div>

                  <div
                    onClick={() => setSelectedBarcodeProduct(product)}
                    className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors"
                  >
                    <BarcodeRenderer value={product.barcode} format={product.barcodeFormat} height={32} width={1.5} />
                    <span className="text-[9px] font-mono text-slate-400 mt-1 flex items-center gap-1">
                      <Barcode className="w-3 h-3 text-emerald-600" />
                      EAN Tag: {product.barcode}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      Stock: <strong className="text-slate-900 dark:text-slate-100">{product.stock} {product.unit}</strong>
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      EXP: {product.expiryDate}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-4 px-6">Product Name</th>
                    <th className="py-4 px-6">SKU & EAN Barcode</th>
                    <th className="py-4 px-6">Category / Brand / Supplier</th>
                    <th className="py-4 px-6">Selling Price / GST</th>
                    <th className="py-4 px-6">Stock Level</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-slate-100 text-xs">{p.name}</p>
                          <p className="text-[11px] text-slate-400">{p.supplier}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold font-mono text-xs text-slate-800 dark:text-slate-200">{p.sku}</p>
                        <p className="text-slate-400 font-mono text-[10px]">Barcode: {p.barcode}</p>
                      </td>
                      <td className="py-4 px-6 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <p>{p.category}</p>
                        <span className="text-[10px] text-emerald-600 font-bold">{p.brand}</span>
                      </td>
                      <td className="py-4 px-6 font-bold text-xs text-slate-900 dark:text-slate-100">
                        ₹{p.sellingPrice} <span className="text-emerald-600 text-[10px]">({p.gst}% GST)</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                          {p.stock} {p.unit}
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
        )}

        {/* 6-STEP MULTI-STEP PRODUCT FORM WIZARD MODAL */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-2xl shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Package className="w-5 h-5 text-emerald-600" />
                      Add Product Wizard
                    </h3>
                    <p className="text-xs text-slate-500">Step {currentStep + 1} of {FORM_STEPS.length}: {FORM_STEPS[currentStep]}</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmitProduct} className="space-y-4">
                  {/* Step 0: Basic Information */}
                  {currentStep === 0 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                          Product Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Aashirvaad Shudh Chakki Atta 5kg"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                            SKU Code *
                          </label>
                          <input
                            type="text"
                            name="sku"
                            required
                            placeholder="ATT-AASH-5KG"
                            value={formData.sku}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                            Barcode Format
                          </label>
                          <select
                            name="barcodeFormat"
                            value={formData.barcodeFormat}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                          >
                            <option value="EAN13">EAN-13 (Standard Retail)</option>
                            <option value="CODE128">Code 128 (Alphanumeric)</option>
                            <option value="UPC">UPC (Universal Product)</option>
                            <option value="QR">QR Code (Matrix)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                            Barcode Digits
                          </label>
                          <input
                            type="text"
                            name="barcode"
                            placeholder="8901058000123"
                            value={formData.barcode}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                            Category *
                          </label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                          >
                            <option value="Atta & Flours">Atta & Flours</option>
                            <option value="Rice & Grains">Rice & Grains</option>
                            <option value="Edible Oils & Ghee">Edible Oils & Ghee</option>
                            <option value="Masala & Spices">Masala & Spices</option>
                            <option value="Dairy & Chilled">Dairy & Chilled</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                            Brand
                          </label>
                          <select
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                          >
                            <option value="Aashirvaad">Aashirvaad</option>
                            <option value="Fortune">Fortune</option>
                            <option value="Amul">Amul</option>
                            <option value="Tata Consumer">Tata Consumer</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                            Unit *
                          </label>
                          <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                          >
                            <option value="kg">Kilogram (kg)</option>
                            <option value="g">Gram (g)</option>
                            <option value="L">Liter (L)</option>
                            <option value="ml">Milliliter (ml)</option>
                            <option value="pkt">Packet (pkt)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 1: Pricing */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                            Purchase Price (₹) *
                          </label>
                          <input
                            type="number"
                            name="purchasePrice"
                            required
                            placeholder="210"
                            value={formData.purchasePrice}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                            Selling Price (₹) *
                          </label>
                          <input
                            type="number"
                            name="sellingPrice"
                            required
                            placeholder="245"
                            value={formData.sellingPrice}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                            MRP (₹) *
                          </label>
                          <input
                            type="number"
                            name="mrp"
                            required
                            placeholder="275"
                            value={formData.mrp}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                            Discount (%)
                          </label>
                          <input
                            type="number"
                            name="discount"
                            placeholder="10.9"
                            value={formData.discount}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                            GST Tax Rate (%)
                          </label>
                          <select
                            name="gst"
                            value={formData.gst}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                          >
                            <option value="0">0% GST (Exempted)</option>
                            <option value="5">5% GST (Essential)</option>
                            <option value="12">12% GST (Processed)</option>
                            <option value="18">18% GST (Standard)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Supplier */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                          Select Wholesale Supplier Vendor *
                        </label>
                        <select
                          name="supplier"
                          value={formData.supplier}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
                        >
                          <option value="ITC Grocery Wholesalers Ltd">ITC Grocery Wholesalers Ltd</option>
                          <option value="Adani Wilmar Edible Oils Supply">Adani Wilmar Edible Oils Supply</option>
                          <option value="Amul Anand Dairy Union Co">Amul Anand Dairy Union Co</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Inventory */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                            Initial Stock *
                          </label>
                          <input
                            type="number"
                            name="stock"
                            required
                            placeholder="100"
                            value={formData.stock}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                            Min Stock Alert
                          </label>
                          <input
                            type="number"
                            name="minimumStock"
                            placeholder="10"
                            value={formData.minimumStock}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                            Max Stock Cap
                          </label>
                          <input
                            type="number"
                            name="maximumStock"
                            placeholder="500"
                            value={formData.maximumStock}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                            Batch Code *
                          </label>
                          <input
                            type="text"
                            name="batchNumber"
                            required
                            placeholder="BAT-2026-AUG-01"
                            value={formData.batchNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                            Expiry Date *
                          </label>
                          <input
                            type="date"
                            name="expiryDate"
                            required
                            value={formData.expiryDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Images */}
                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                          Product Image CDN URL (Cloudinary Upload Stream)
                        </label>
                        <input
                          type="url"
                          name="imageUrl"
                          placeholder="https://res.cloudinary.com/..."
                          value={formData.imageUrl}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                        />
                      </div>

                      <div className="p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 bg-slate-50/50 dark:bg-slate-800/30">
                        <Upload className="w-8 h-8 text-emerald-600" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Drag & Drop Image to Upload to Cloudinary CDN</span>
                        <p className="text-[10px] text-slate-400">Supports JPG, PNG, WEBP up to 5MB</p>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Review */}
                  {currentStep === 5 && (
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Product Specification Review</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>SKU:</strong> {formData.sku}</p>
                        <p><strong>Selling Price:</strong> ₹{formData.sellingPrice}</p>
                        <p><strong>MRP:</strong> ₹{formData.mrp}</p>
                        <p><strong>Initial Stock:</strong> {formData.stock} {formData.unit}</p>
                        <p><strong>Supplier:</strong> {formData.supplier}</p>
                      </div>

                      {formData.barcode && (
                        <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex flex-col items-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Generated Barcode Label ({formData.barcodeFormat})</span>
                          <BarcodeRenderer value={formData.barcode} format={formData.barcodeFormat} height={45} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={currentStep === 0}
                      className="px-4 py-2 text-sm text-slate-600 bg-slate-100 rounded-xl font-semibold disabled:opacity-50"
                    >
                      Previous
                    </Button>

                    {currentStep < FORM_STEPS.length - 1 ? (
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        className="px-5 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl font-semibold shadow-lg shadow-emerald-500/20"
                      >
                        Next <ChevronRight className="w-4 h-4 inline ml-1" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="px-6 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl font-semibold shadow-lg shadow-emerald-500/20"
                      >
                        <Check className="w-4 h-4 inline mr-1" /> Register Product
                      </Button>
                    )}
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

export default ProductsPage;
