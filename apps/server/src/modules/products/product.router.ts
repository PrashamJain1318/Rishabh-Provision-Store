import { Router } from "express";
import { getProducts, getProductByCode } from "./product.controller";

const router = Router();

router.get("/", getProducts);
router.get("/:code", getProductByCode);

export default router;
