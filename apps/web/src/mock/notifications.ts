export interface MockNotification {
  id: string;
  title: string;
  message: string;
  type: "stock" | "order" | "khata" | "system";
  timestamp: string;
  read: boolean;
}

export const mockNotifications: MockNotification[] = [
  {
    id: "NOTIF-001",
    title: "⚠️ Low Stock Warning",
    message: "Surf Excel Easy Wash Powder stock is down to 3 units. Reorder recommended.",
    type: "stock",
    timestamp: "10 mins ago",
    read: false,
  },
  {
    id: "NOTIF-002",
    title: "🛒 New Online Order Received",
    message: "Aakash Mehta placed order #ORD-9901 worth ₹820.00 via Customer App.",
    type: "order",
    timestamp: "15 mins ago",
    read: false,
  },
  {
    id: "NOTIF-003",
    title: "⏰ Expiry Date Alert",
    message: "Mother Dairy Milk Batch #BATCH-2026-06C expires in 1 day.",
    type: "stock",
    timestamp: "1 hour ago",
    read: true,
  },
  {
    id: "NOTIF-004",
    title: "📒 Khata Credit Limit Exceeded",
    message: "Vikram Singh's Khata balance reached ₹4,800 out of ₹10,000 credit limit.",
    type: "khata",
    timestamp: "3 hours ago",
    read: true,
  },
];
