import { Request, Response } from "express";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

const mockNotifications = [
  {
    id: "NOTIF-001",
    type: "Order Placed",
    title: "Order Placed Successfully",
    message: "Your order #ORD-2026-9821 has been confirmed and is being packed.",
    read: false,
    actionUrl: "/orders/ORD-2026-9821",
    createdAt: new Date("2026-08-06T14:00:00Z").toISOString(),
  },
  {
    id: "NOTIF-002",
    type: "Order Shipped",
    title: "Out For Delivery 🛵",
    message: "Rider Vikram Singh is on his way with your grocery package.",
    read: false,
    actionUrl: "/orders/ORD-2026-9821",
    createdAt: new Date("2026-08-06T14:05:00Z").toISOString(),
  },
  {
    id: "NOTIF-003",
    type: "Loyalty Rewards",
    title: "15 Loyalty Points Earned! ⭐",
    message: "You earned 15 loyalty reward points on your recent order.",
    read: true,
    actionUrl: "/loyalty",
    createdAt: new Date("2026-08-05T18:30:00Z").toISOString(),
  },
  {
    id: "NOTIF-004",
    type: "Offers",
    title: "Diwali Special Offer 🎆",
    message: "Use code DIWALI20 to get 20% OFF on Dry Fruits & Sweets!",
    read: true,
    actionUrl: "/coupons",
    createdAt: new Date("2026-08-04T10:00:00Z").toISOString(),
  },
  {
    id: "NOTIF-005",
    type: "Low Wallet Balance",
    title: "Low Store Wallet Balance ⚠️",
    message: "Your wallet balance is ₹40. Top up now for fast 1-click checkout.",
    read: false,
    actionUrl: "/profile",
    createdAt: new Date("2026-08-03T12:00:00Z").toISOString(),
  },
];

export const getNotifications = asyncHandler(async (req: Request, res: Response) => {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;
  return sendSuccess({
    res,
    message: "In-app notifications fetched successfully",
    data: {
      unreadCount,
      notifications: mockNotifications,
    },
  });
});

export const markNotificationRead = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const notif = mockNotifications.find((n) => n.id === id);
  if (notif) notif.read = true;

  return sendSuccess({
    res,
    message: "Notification marked as read",
    data: { id, read: true },
  });
});

export const markAllNotificationsRead = asyncHandler(async (req: Request, res: Response) => {
  mockNotifications.forEach((n) => (n.read = true));
  return sendSuccess({
    res,
    message: "All in-app notifications marked as read",
    data: { allRead: true },
  });
});
