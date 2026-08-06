import { Router } from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./product.controller";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";
import { createProductSchema, updateProductSchema, productQuerySchema } from "./product.schema";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.get("/", validateQuery(productQuerySchema), getProducts);
router.get("/:id", getProductById);
router.post("/", authenticate, authorize("OWNER", "MANAGER"), validateBody(createProductSchema), createProduct);
router.patch("/:id", authenticate, authorize("OWNER", "MANAGER"), validateBody(updateProductSchema), updateProduct);
router.delete("/:id", authenticate, authorize("OWNER", "MANAGER"), deleteProduct);

export default router;
