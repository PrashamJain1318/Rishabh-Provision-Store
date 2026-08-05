import React, { useState } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Table, Column, SearchBar, Button } from "@rishabh-store/ui";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  mrp: string;
  stock: number;
  unit: string;
}

const mockProducts: Product[] = [
  { id: "PROD-001", name: "Aashirvaad Shuddh Chakki Atta (5kg)", category: "Atta & Flours", price: "₹ 245", mrp: "₹ 275", stock: 45, unit: "bag" },
  { id: "PROD-002", name: "Fortune Sunlite Sunflower Oil (1L)", category: "Edible Oils", price: "₹ 135", mrp: "₹ 155", stock: 8, unit: "pouch" },
  { id: "PROD-003", name: "Amul Butter Pasteurized (500g)", category: "Dairy & Chilled", price: "₹ 275", mrp: "₹ 275", stock: 18, unit: "pack" },
  { id: "PROD-004", name: "Tata Salt Vacuum Evaporated (1kg)", category: "Salt & Sugar", price: "₹ 28", mrp: "₹ 28", stock: 120, unit: "pkt" },
  { id: "PROD-005", name: "Surf Excel Easy Wash Powder (1kg)", category: "Detergents", price: "₹ 140", mrp: "₹ 155", stock: 3, unit: "pkt" },
];

export const ProductsPage: React.FC = () => {
  const [query, setQuery] = useState("");

  const filtered = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())
  );

  const columns: Column<Product>[] = [
    { key: "id", header: "Code" },
    { key: "name", header: "Product Name" },
    { key: "category", header: "Category" },
    { key: "price", header: "Selling Price" },
    { key: "mrp", header: "MRP" },
    {
      key: "stock",
      header: "Stock Quantity",
      render: (row) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
          row.stock <= 5 ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" :
          row.stock <= 15 ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" :
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
        }`}>
          {row.stock} {row.unit}s
        </span>
      ),
    },
  ];

  return (
    <DashboardLayout activeNavId="products">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-section-title text-slate-900 dark:text-slate-100 font-bold">Product Catalog</h1>
            <p className="text-sm text-slate-500">Manage grocery catalog, MRP, selling price, and category tags.</p>
          </div>
          <Button variant="primary">+ Add New Product</Button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft-sm">
          <div className="mb-4 max-w-md">
            <SearchBar value={query} onChange={setQuery} placeholder="Search product by name, brand or barcode..." />
          </div>
          <Table columns={columns} data={filtered} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductsPage;
