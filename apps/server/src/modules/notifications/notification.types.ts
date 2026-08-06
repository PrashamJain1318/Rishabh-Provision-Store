export type NotificationPlatform = "WEB" | "ANDROID" | "IOS";
export type NotificationEventType =
  | "ORDER_PLACED"
  | "ORDER_CONFIRMED"
  | "ORDER_SHIPPED"
  | "ORDER_DELIVERED"
  | "ORDER_CANCELLED"
  | "LOW_STOCK"
  | "DAILY_SUMMARY"
  | "PROMOTION";

export interface IDeviceToken {
  id?: string;
  userId: string;
  token: string;
  platform: NotificationPlatform;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INotificationHistory {
  id?: string;
  userId?: string;
  title: string;
  body: string;
  type: NotificationEventType;
  data?: Record<string, string>;
  status: "SENT" | "FAILED" | "QUEUED";
  fcmMessageId?: string;
  errorMessage?: string;
  createdAt?: Date;
}

export interface IRegisterDeviceInput {
  userId?: string;
  token: string;
  platform?: NotificationPlatform;
}

export interface ISendNotificationInput {
  userId?: string;
  token?: string;
  title: string;
  body: string;
  type?: NotificationEventType;
  data?: Record<string, string>;
}
