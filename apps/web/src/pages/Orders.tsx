import React from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Table, Column } from "@rishabh-store/ui";

interface OrderItem {
  id: string;
  channel: string;
  customerName: string;
  itemsCount: number;
  totalAmount: string;
  status: "Pending" | "Dispatched" | "Delivered" | "Cancelled";
  orderDate: string;
}

const mockOrders: OrderItem[] = [
  { id: "#ORD-9901", channel: "Online App", customerName: "Aakash Mehta", itemsCount: 6, totalAmount: "₹ 820.00", status: "Pending", orderDate: "10 mins ago" },
  { id: "#ORD-9900", channel: "WhatsApp Order", customerName: "Sanjay Patel", itemsCount: 4, totalAmount: "₹ 540.00", status: "Dispatched", orderDate: "35 mins ago" },
  { id: "#ORD-9899", channel: "Online App", customerName: "Neha Sharma", itemsCount: 12, totalAmount: "₹ 1,890.00", status: "Delivered", orderDate: "2 hours ago" },
];

const columns: Column<OrderItem>[] = [
  { key: "id", header: "Order ID" },
  { key: "channel", header: "Channel" },
  { key: "customerName", header: "Customer Name" },
  { key: "itemsCount", header: "Item Count" },
  { key: "totalAmount", header: "Total Value" },
  {
    key: "status",
    header: "Fulfillment Status",
    render: (row) => (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        row.status === "Pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" :
        row.status === "Dispatched" ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" :
        row.status === "Delivered" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" :
        "bg-red-100 text-red-700"
      }`}>
        {row.status}
      </span>
    ),
  },
  { key: "orderDate", header: "Time" },
];

export const OrdersPage: React.FC = () => {
  return (
    <DashboardLayout activeNavId="orders">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-section-title text-slate-900 dark:text-slate-100 font-bold">Omnichannel Order Stream</h1>
          <p className="text-sm text-slate-500">Manage online storefront orders, WhatsApp home delivery requests, and fulfillment status.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft-sm">
          <Table columns={columns} data={mockOrders} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;
