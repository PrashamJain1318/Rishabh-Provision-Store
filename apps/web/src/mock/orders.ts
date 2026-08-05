export interface MockOrder {
  id: string;
  orderNo: string;
  customerName: string;
  channel: "POS Bill" | "Online App" | "WhatsApp Delivery";
  itemsCount: number;
  subtotal: number;
  gst: number;
  totalAmount: number;
  paymentMode: "Cash" | "UPI / QR" | "Khata Udhar Credit";
  status: "Completed" | "Pending" | "Dispatched" | "Cancelled";
  createdAt: string;
}

export const mockOrders: MockOrder[] = [
  {
    id: "ORD-101",
    orderNo: "#BILL-1043",
    customerName: "Walk-in Cashier",
    channel: "POS Bill",
    itemsCount: 3,
    subtotal: 428,
    gst: 22,
    totalAmount: 450,
    paymentMode: "Cash",
    status: "Completed",
    createdAt: "2 mins ago",
  },
  {
    id: "ORD-102",
    orderNo: "#ORD-9901",
    customerName: "Aakash Mehta",
    channel: "Online App",
    itemsCount: 6,
    subtotal: 780,
    gst: 40,
    totalAmount: 820,
    paymentMode: "UPI / QR",
    status: "Pending",
    createdAt: "10 mins ago",
  },
  {
    id: "ORD-103",
    orderNo: "#BILL-1042",
    customerName: "Rahul Sharma",
    channel: "POS Bill",
    itemsCount: 8,
    subtotal: 1220,
    gst: 60,
    totalAmount: 1280,
    paymentMode: "UPI / QR",
    status: "Completed",
    createdAt: "15 mins ago",
  },
  {
    id: "ORD-104",
    orderNo: "#ORD-9900",
    customerName: "Sanjay Patel",
    channel: "WhatsApp Delivery",
    itemsCount: 4,
    subtotal: 514,
    gst: 26,
    totalAmount: 540,
    paymentMode: "Cash",
    status: "Dispatched",
    createdAt: "35 mins ago",
  },
  {
    id: "ORD-105",
    orderNo: "#BILL-1041",
    customerName: "Ramesh Kumar (Khata)",
    channel: "POS Bill",
    itemsCount: 5,
    subtotal: 620,
    gst: 30,
    totalAmount: 650,
    paymentMode: "Khata Udhar Credit",
    status: "Completed",
    createdAt: "42 mins ago",
  },
];
