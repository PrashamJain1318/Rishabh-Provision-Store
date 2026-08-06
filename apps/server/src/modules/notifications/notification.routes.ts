import { Router } from "express";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "./notification.controller";

const router = Router();

router.get("/", getNotifications);
router.patch("/:id/read", markNotificationRead);
router.post("/mark-all-read", markAllNotificationsRead);

export default router;
