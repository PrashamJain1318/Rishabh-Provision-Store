import { Request, Response } from "express";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

const merchantNotifications = [
  {
    id: "NOTIF-101",
    type: "Low Stock",
    title: "Low Stock Alert ⚠️",
    message: "Aashirvaad Atta 5kg has only 12 units remaining (Min threshold: 25). Reorder PO auto-drafted.",
    read: false,
    actionUrl: "/dashboard/inventory-intelligence",
    createdAt: new Date("2026-08-06T14:00:00Z").toISOString(),
  },
  {
    id: "NOTIF-102",
    type: "Expiring Products",
    title: "Near Expiry Alert ⏰",
    message: "Amul Butter Batch #BAT-9821 (8 units) expires in 3 days. Discount clearance suggested.",
    read: false,
    actionUrl: "/dashboard/inventory-intelligence",
    createdAt: new Date("2026-08-06T13:30:00Z").toISOString(),
  },
  {
    id: "NOTIF-103",
    type: "High Sales Day",
    title: "High Sales Volume Record! 🚀",
    message: "Today's sales reached ₹24,500 (+32% above daily average). Great performance!",
    read: false,
    actionUrl: "/dashboard/financial-analytics",
    createdAt: new Date("2026-08-06T12:00:00Z").toISOString(),
  },
  {
    id: "NOTIF-104",
    type: "New Customer",
    title: "New Customer Profile Registered 👤",
    message: "Ramesh Kumar signed up online & earned 100 welcome bonus loyalty points.",
    read: true,
    actionUrl: "/dashboard/customers",
    createdAt: new Date("2026-08-06T10:15:00Z").toISOString(),
  },
  {
    id: "NOTIF-105",
    type: "Failed Payment",
    title: "Failed Gateway Payment 💳",
    message: "Payment of ₹490 failed for Order #ORD-2026-9821 via HDFC UPI Gateway. Customer retrying.",
    read: true,
    actionUrl: "/dashboard/orders",
    createdAt: new Date("2026-08-06T09:30:00Z").toISOString(),
  },
  {
    id: "NOTIF-106",
    type: "Daily Summary",
    title: "Daily Business Briefing 📊",
    message: "Yesterday's Business: ₹18,450 turnover, 142 orders fulfilled, ₹3,520 net profit (19.1% margin).",
    read: true,
    actionUrl: "/dashboard",
    createdAt: new Date("2026-08-06T08:00:00Z").toISOString(),
  },
  {
    id: "NOTIF-107",
    type: "Weekly Summary",
    title: "Weekly Performance Audit 📈",
    message: "Weekly Turnover: ₹1,25,000 (+12.4% MoM) with a 53.4% customer repeat purchase rate.",
    read: true,
    actionUrl: "/dashboard/reports",
    createdAt: new Date("2026-08-03T08:00:00Z").toISOString(),
  },
];

export const getNotifications = asyncHandler(async (req: Request, res: Response) => {
  const unreadCount = merchantNotifications.filter((n) => !n.read).length;
  return sendSuccess({
    res,
    message: "Merchant notification center alerts fetched successfully",
    data: {
      unreadCount,
      notifications: merchantNotifications,
    },
  });
});

export const markNotificationRead = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const notif = merchantNotifications.find((n) => n.id === id);
  if (notif) notif.read = true;

  return sendSuccess({
    res,
    message: "Notification marked as read",
    data: { id, read: true },
  });
});

export const markAllNotificationsRead = asyncHandler(async (req: Request, res: Response) => {
  merchantNotifications.forEach((n) => (n.read = true));
  return sendSuccess({
    res,
    message: "All merchant notification alerts marked as read",
    data: { allRead: true },
  });
});
