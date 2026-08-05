import { Router } from "express";
import {
  getDeliveryDrivers,
  createDeliveryDriver,
  assignDriverToOrder,
} from "./delivery.controller";

const router = Router();

router.get("/drivers", getDeliveryDrivers);
router.post("/drivers", createDeliveryDriver);
router.post("/assign", assignDriverToOrder);

export default router;
