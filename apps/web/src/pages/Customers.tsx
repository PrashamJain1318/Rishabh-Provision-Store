import React from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Table, Column, Button } from "@rishabh-store/ui";

interface CustomerLedger {
  id: string;
  name: string;
  phone: string;
  creditLimit: string;
  dueBalance: number;
  status: string;
}

const mockCustomers: CustomerLedger[] = [
  { id: "CUST-101", name: "Ramesh Kumar", phone: "+91 98250 11223", creditLimit: "₹ 5,000", dueBalance: 1250, status: "Active" },
  { id: "CUST-102", name: "Sita Sharma", phone: "+91 97123 44556", creditLimit: "₹ 3,000", dueBalance: 0, status: "Cleared" },
  { id: "CUST-103", name: "Vikram Singh", phone: "+91 99887 66554", creditLimit: "₹ 10,000", dueBalance: 4800, status: "Overdue" },
];

const columns: Column<CustomerLedger>[] = [
  { key: "id", header: "Customer ID" },
  { key: "name", header: "Customer Name" },
  { key: "phone", header: "Phone Number" },
  { key: "creditLimit", header: "Credit Limit" },
  {
    key: "dueBalance",
    header: "Khata Udhar Balance",
    render: (row) => (
      <span className={`font-mono font-bold ${row.dueBalance > 0 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600"}`}>
        ₹ {row.dueBalance.toFixed(2)}
      </span>
    ),
  },
  {
    key: "status",
    header: "Khata Status",
    render: (row) => (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        row.status === "Overdue" ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" :
        row.status === "Active" ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" :
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
      }`}>
        {row.status}
      </span>
    ),
  },
];

export const CustomersPage: React.FC = () => {
  return (
    <DashboardLayout activeNavId="customers">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-section-title text-slate-900 dark:text-slate-100 font-bold">Customer Directory & Khata Ledger</h1>
            <p className="text-sm text-slate-500">Manage customer accounts, Udhar credit limits, and WhatsApp payment reminders.</p>
          </div>
          <Button variant="primary">+ Add Customer</Button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft-sm">
          <Table columns={columns} data={mockCustomers} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomersPage;
