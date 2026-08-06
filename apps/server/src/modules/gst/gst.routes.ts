import { Router } from "express";
import {
  getGSTSettings,
  updateGSTSettings,
  calculateTax,
  getGSTSummary,
  getGSTReport,
  validateGST,
  getGSTInvoice,
} from "./gst.controller";

const router = Router();

router.get("/settings", getGSTSettings);
router.put("/settings", updateGSTSettings);
router.post("/calculate", calculateTax);
router.get("/summary", getGSTSummary);
router.get("/report", getGSTReport);
router.post("/validate", validateGST);
router.get("/invoice/:id", getGSTInvoice);

export default router;
