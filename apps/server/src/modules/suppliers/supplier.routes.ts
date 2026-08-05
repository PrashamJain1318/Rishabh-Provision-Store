import { Router } from "express";
import { getSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier } from "./supplier.controller";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";
import { createSupplierSchema, updateSupplierSchema, supplierQuerySchema } from "./supplier.schema";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.get("/", validateQuery(supplierQuerySchema), getSuppliers);
router.get("/:id", getSupplierById);
router.post("/", authorize("OWNER", "MANAGER"), validateBody(createSupplierSchema), createSupplier);
router.patch("/:id", authorize("OWNER", "MANAGER"), validateBody(updateSupplierSchema), updateSupplier);
router.delete("/:id", authorize("OWNER", "MANAGER"), deleteSupplier);

export default router;
