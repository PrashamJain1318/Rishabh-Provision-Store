import { Router } from "express";
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "./category.controller";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";
import { createCategorySchema, updateCategorySchema, categoryQuerySchema } from "./category.schema";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.get("/", validateQuery(categoryQuerySchema), getCategories);
router.get("/:id", getCategoryById);
router.post("/", authorize("OWNER", "MANAGER"), validateBody(createCategorySchema), createCategory);
router.patch("/:id", authorize("OWNER", "MANAGER"), validateBody(updateCategorySchema), updateCategory);
router.delete("/:id", authorize("OWNER", "MANAGER"), deleteCategory);

export default router;
