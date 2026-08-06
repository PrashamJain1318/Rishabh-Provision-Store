import { Router } from "express";
import {
  registerDeviceToken,
  sendPushNotification,
  getNotificationHistory,
  unregisterDeviceToken,
} from "./notification.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import { registerDeviceSchema, sendNotificationSchema } from "./notification.schema";

const router = Router();

router.post("/register-device", validateBody(registerDeviceSchema), registerDeviceToken);
router.post("/send", validateBody(sendNotificationSchema), sendPushNotification);
router.get("/history", getNotificationHistory);
router.delete("/device/:token", unregisterDeviceToken);

export default router;
