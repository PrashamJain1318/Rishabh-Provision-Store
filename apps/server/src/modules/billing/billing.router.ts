import { Router } from "express";
import { processPOSCheckout } from "./billing.controller";

const router = Router();

router.post("/checkout", processPOSCheckout);

export default router;
