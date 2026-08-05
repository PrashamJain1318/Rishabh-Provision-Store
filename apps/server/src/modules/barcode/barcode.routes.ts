import { Router } from "express";
import { generateBarcode, printBulkBarcodes } from "./barcode.controller";

const router = Router();

router.post("/generate", generateBarcode);
router.post("/print-bulk", printBulkBarcodes);

export default router;
