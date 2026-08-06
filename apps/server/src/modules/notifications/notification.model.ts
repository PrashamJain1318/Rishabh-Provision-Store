import mongoose, { Schema, Document } from "mongoose";
import { IDeviceToken, INotificationHistory } from "./notification.types";

export interface IDeviceTokenDocument extends Omit<IDeviceToken, "id">, Document {}
export interface INotificationHistoryDocument extends Omit<INotificationHistory, "id">, Document {}

const deviceTokenSchema = new Schema<IDeviceTokenDocument>(
  {
    userId: { type: String, required: true, index: true },
    token: { type: String, required: true, unique: true, index: true },
    platform: { type: String, enum: ["WEB", "ANDROID", "IOS"], default: "WEB" },
  },
  { timestamps: true }
);

const notificationHistorySchema = new Schema<INotificationHistoryDocument>(
  {
    userId: { type: String, index: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "ORDER_PLACED",
        "ORDER_CONFIRMED",
        "ORDER_SHIPPED",
        "ORDER_DELIVERED",
        "ORDER_CANCELLED",
        "LOW_STOCK",
        "DAILY_SUMMARY",
        "PROMOTION",
      ],
      default: "PROMOTION",
      index: true,
    },
    data: { type: Schema.Types.Mixed },
    status: { type: String, enum: ["SENT", "FAILED", "QUEUED"], default: "SENT", index: true },
    fcmMessageId: { type: String },
    errorMessage: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const DeviceTokenModel = mongoose.model<IDeviceTokenDocument>("DeviceToken", deviceTokenSchema);
export const NotificationHistoryModel = mongoose.model<INotificationHistoryDocument>(
  "NotificationHistory",
  notificationHistorySchema
);
