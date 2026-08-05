import { Router } from "express";
import { getUnits, getUnitById, createUnit, updateUnit, deleteUnit } from "./unit.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import { createUnitSchema, updateUnitSchema } from "./unit.schema";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.get("/", getUnits);
router.get("/:id", getUnitById);
router.post("/", authorize("OWNER", "MANAGER"), validateBody(createUnitSchema), createUnit);
router.patch("/:id", authorize("OWNER", "MANAGER"), validateBody(updateUnitSchema), updateUnit);
router.delete("/:id", authorize("OWNER", "MANAGER"), deleteUnit);

export default router;
