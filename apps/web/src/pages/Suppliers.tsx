import React from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Table, Column, Button } from "@rishabh-store/ui";

interface Supplier {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  pendingPO: number;
  status: string;
}

const mockSuppliers: Supplier[] = [
  { id: "SUPP-01", name: "Hindustan Unilever Ltd", category: "Personal Care & Soaps", contactPerson: "Suresh Sharma", phone: "+91 98220 12345", pendingPO: 2, status: "Active" },
  { id: "SUPP-02", name: "Adani Wilmar (Fortune)", category: "Edible Oils & Ghee", contactPerson: "Rajesh Patel", phone: "+91 98980 54321", pendingPO: 1, status: "Active" },
  { id: "SUPP-03", name: "Gujarat Cooperative Milk (Amul)", category: "Dairy & Milk", contactPerson: "Mehul Shah", phone: "+91 97120 99887", pendingPO: 0, status: "Active" },
  { id: "SUPP-04", name: "Tata Consumer Products", category: "Tea, Salt & Pulses", contactPerson: "Ankit Verma", phone: "+91 99001 11223", pendingPO: 3, status: "Pending Dispatch" },
];

const columns: Column<Supplier>[] = [
  { key: "id", header: "Supplier Code" },
  { key: "name", header: "Supplier Name" },
  { key: "category", header: "Product Category" },
  { key: "contactPerson", header: "Contact Person" },
  { key: "phone", header: "Phone Number" },
  { key: "pendingPO", header: "Pending Purchase Orders" },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
        {row.status}
      </span>
    ),
  },
];

export const SuppliersPage: React.FC = () => {
  return (
    <DashboardLayout activeNavId="suppliers">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-section-title text-slate-900 dark:text-slate-100 font-bold">Supplier Directory & Purchase Orders</h1>
            <p className="text-sm text-slate-500">Manage vendor profiles, wholesale purchase orders, and accounts payable.</p>
          </div>
          <Button variant="primary">+ Create Purchase Order</Button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft-sm">
          <Table columns={columns} data={mockSuppliers} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuppliersPage;
