import { Router } from "express";
import { getProducts, getProductByCode } from "./product.controller";
import { validateQuery, validateParams } from "../../middlewares/validate.middleware";
import { getProductsQuerySchema, getProductParamSchema } from "../../validators/product.validator";

const router = Router();

router.get("/", validateQuery(getProductsQuerySchema), getProducts);
router.get("/:code", validateParams(getProductParamSchema), getProductByCode);

export default router;
