import { Router } from "express";
import { getInventoryLogs, adjustStock } from "./inventory.controller";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";
import { stockAdjustmentSchema, inventoryLogQuerySchema } from "./inventory.schema";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.get("/logs", validateQuery(inventoryLogQuerySchema), getInventoryLogs);
router.post("/adjust", authorize("OWNER", "MANAGER"), validateBody(stockAdjustmentSchema), adjustStock);

export default router;
