import { Router } from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./product.controller";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";
import { createProductSchema, updateProductSchema, productQuerySchema } from "./product.schema";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.get("/", validateQuery(productQuerySchema), getProducts);
router.get("/:id", getProductById);
router.post("/", authorize("OWNER", "MANAGER"), validateBody(createProductSchema), createProduct);
router.patch("/:id", authorize("OWNER", "MANAGER"), validateBody(updateProductSchema), updateProduct);
router.delete("/:id", authorize("OWNER", "MANAGER"), deleteProduct);

export default router;
