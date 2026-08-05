import React, { useState } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Table, Column, SearchBar, Button, ProductCard, Pagination } from "@rishabh-store/ui";
import { LayoutGrid, List } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  mrp: string;
  stock: number;
  unit: string;
  rating: number;
  image: string;
}

const mockCatalogProducts: Product[] = [
  { id: "PROD-001", name: "Aashirvaad Shuddh Chakki Atta (5kg)", category: "Atta & Flours", price: "₹ 245", mrp: "₹ 275", stock: 45, unit: "bag", rating: 4.8, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80" },
  { id: "PROD-002", name: "Fortune Sunlite Sunflower Oil (1L)", category: "Edible Oils", price: "₹ 135", mrp: "₹ 155", stock: 8, unit: "pouch", rating: 4.6, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80" },
  { id: "PROD-003", name: "Amul Butter Pasteurized (500g)", category: "Dairy & Chilled", price: "₹ 275", mrp: "₹ 275", stock: 18, unit: "pack", rating: 4.9, image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80" },
  { id: "PROD-004", name: "Tata Salt Vacuum Evaporated (1kg)", category: "Salt & Sugar", price: "₹ 28", mrp: "₹ 28", stock: 120, unit: "pkt", rating: 4.7, image: "https://images.unsplash.com/photo-1518110168401-f2877ee2c088?auto=format&fit=crop&w=400&q=80" },
  { id: "PROD-005", name: "Surf Excel Easy Wash Powder (1kg)", category: "Detergents", price: "₹ 140", mrp: "₹ 155", stock: 3, unit: "pkt", rating: 4.5, image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80" },
  { id: "PROD-006", name: "Mother Dairy Toned Milk (500ml)", category: "Dairy & Chilled", price: "₹ 27", mrp: "₹ 27", stock: 30, unit: "pkt", rating: 4.8, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80" },
  { id: "PROD-007", name: "Toor Dal Desi Premium (1kg)", category: "Pulses & Dals", price: "₹ 165", mrp: "₹ 180", stock: 25, unit: "pkt", rating: 4.7, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80" },
  { id: "PROD-008", name: "Britannia Good Day Butter (200g)", category: "Snacks & Biscuits", price: "₹ 40", mrp: "₹ 45", stock: 50, unit: "pkt", rating: 4.6, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80" },
];

const categories = ["All Categories", "Atta & Flours", "Edible Oils", "Dairy & Chilled", "Salt & Sugar", "Detergents", "Pulses & Dals", "Snacks & Biscuits"];

export const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter products by search query and category
  const filteredProducts = mockCatalogProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const columns: Column<Product>[] = [
    { key: "id", header: "SKU Code" },
    { key: "name", header: "Product Name" },
    { key: "category", header: "Category" },
    { key: "price", header: "Selling Price" },
    { key: "mrp", header: "MRP" },
    {
      key: "stock",
      header: "Stock Quantity",
      render: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            row.stock <= 5
              ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
              : row.stock <= 15
              ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
          }`}
        >
          {row.stock} {row.unit}s
        </span>
      ),
    },
    {
      key: "id",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert(`Edit ${row.name}`)}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout activeNavId="products">
      <div className="flex flex-col gap-6">
        {/* Page Title & Action Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-section-title text-slate-900 dark:text-slate-100 font-bold">
              Product Catalog
            </h1>
            <p className="text-sm text-slate-500">
              Manage inventory products, MRP, selling price, and category tags.
            </p>
          </div>
          <Button variant="primary" onClick={() => alert("Add Product Modal Opened")}>
            + Add New Product
          </Button>
        </div>

        {/* Search, Category Filter & View Mode Switcher Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full">
            {/* Search Bar */}
            <div className="w-full sm:w-72">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by product name or SKU..."
              />
            </div>

            {/* Category Dropdown Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-48 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* View Switcher (Grid vs Table) */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-xl transition-all ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-soft-sm"
                  : "text-slate-500"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-xl transition-all ${
                viewMode === "table"
                  ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-soft-sm"
                  : "text-slate-500"
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Grid View OR Product Table Datagrid View */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                name={prod.name}
                category={prod.category}
                price={prod.price}
                originalPrice={prod.mrp}
                rating={prod.rating}
                inStock={prod.stock > 0}
                image={prod.image}
                onAddToCart={() => alert(`Added ${prod.name} to cart!`)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft-sm">
            <Table columns={columns} data={filteredProducts} />
          </div>
        )}

        {/* Pagination Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-soft-sm flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Showing {filteredProducts.length} of {mockCatalogProducts.length} Products
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={3}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductsPage;
