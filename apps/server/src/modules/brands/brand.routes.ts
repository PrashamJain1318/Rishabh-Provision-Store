import { Router } from "express";
import { getBrands, getBrandById, createBrand, updateBrand, deleteBrand } from "./brand.controller";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";
import { createBrandSchema, updateBrandSchema, brandQuerySchema } from "./brand.schema";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.get("/", validateQuery(brandQuerySchema), getBrands);
router.get("/:id", getBrandById);
router.post("/", authorize("OWNER", "MANAGER"), validateBody(createBrandSchema), createBrand);
router.patch("/:id", authorize("OWNER", "MANAGER"), validateBody(updateBrandSchema), updateBrand);
router.delete("/:id", authorize("OWNER", "MANAGER"), deleteBrand);

export default router;
