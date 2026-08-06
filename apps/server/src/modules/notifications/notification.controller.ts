import { Request, Response } from "express";
import { notificationService } from "./notification.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const registerDeviceToken = asyncHandler(async (req: Request, res: Response) => {
  const { token, platform } = req.body;
  if (!token) {
    return sendError({ res, statusCode: 400, message: "Device token is required." });
  }

  const userId = (req as any).user?.id || req.body.userId || "GUEST_USER";
  const registered = await notificationService.registerDevice({ userId, token, platform });

  return sendSuccess({
    res,
    statusCode: 201,
    message: "Device token registered successfully for push notifications",
    data: registered,
  });
});

export const sendPushNotification = asyncHandler(async (req: Request, res: Response) => {
  const { userId, token, title, body, type, data } = req.body;

  if (!title || !body) {
    return sendError({ res, statusCode: 400, message: "Title and body are required to send notification." });
  }

  const result = await notificationService.sendNotification({ userId, token, title, body, type, data });

  return sendSuccess({
    res,
    statusCode: 200,
    message: "Push notification processed successfully",
    data: result,
  });
});

export const getNotificationHistory = asyncHandler(async (req: Request, res: Response) => {
  const result = await notificationService.getHistory(req.query);

  return sendSuccess({
    res,
    message: "Notification history retrieved successfully",
    data: result,
  });
});

export const unregisterDeviceToken = asyncHandler(async (req: Request, res: Response) => {
  const token = req.params.token as string;
  if (!token) {
    return sendError({ res, statusCode: 400, message: "Token parameter is required." });
  }

  await notificationService.unregisterDevice(token);

  return sendSuccess({
    res,
    message: "Device token unregistered successfully",
    data: { token },
  });
});
