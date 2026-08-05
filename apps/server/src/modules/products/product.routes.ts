import { Router } from "express";
import { getProducts, getProductByCode } from "./product.controller";
import { validateQuery, validateParams } from "../../middlewares/validate.middleware";
import { productQuerySchema, productSchema } from "./product.schema";

const router = Router();

router.get("/", validateQuery(productQuerySchema), getProducts);
router.get("/:code", getProductByCode);

export default router;
