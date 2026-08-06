import { z } from "zod";

export const registerDeviceSchema = z.object({
  token: z.string().min(1, "Device token is required"),
  platform: z.enum(["WEB", "ANDROID", "IOS"]).optional().default("WEB"),
});

export const sendNotificationSchema = z.object({
  userId: z.string().optional(),
  token: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
  type: z
    .enum([
      "ORDER_PLACED",
      "ORDER_CONFIRMED",
      "ORDER_SHIPPED",
      "ORDER_DELIVERED",
      "ORDER_CANCELLED",
      "LOW_STOCK",
      "DAILY_SUMMARY",
      "PROMOTION",
    ])
    .optional()
    .default("PROMOTION"),
  data: z.record(z.string()).optional(),
});
