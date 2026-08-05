import { Router } from "express";
import { getPurchases, createPurchase } from "./purchase.controller";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";
import { createPurchaseSchema, purchaseQuerySchema } from "./purchase.schema";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.get("/", validateQuery(purchaseQuerySchema), getPurchases);
router.post("/", authorize("OWNER", "MANAGER"), validateBody(createPurchaseSchema), createPurchase);

export default router;
