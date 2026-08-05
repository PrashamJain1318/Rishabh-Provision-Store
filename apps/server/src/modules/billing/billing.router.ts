import { Router } from "express";
import { processPOSCheckout, processReturnOrExchange } from "./billing.controller";

const router = Router();

router.post("/checkout", processPOSCheckout);
router.post("/returns", processReturnOrExchange);

export default router;
