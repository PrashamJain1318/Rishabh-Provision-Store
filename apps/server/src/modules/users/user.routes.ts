import { Router } from "express";
import { getUsers, createUser } from "./user.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import { createUserSchema } from "./user.schema";
import { authorizeRoles } from "../../middlewares/role.middleware";

const router = Router();

router.get("/", authorizeRoles("Owner", "Manager"), getUsers);
router.post("/", authorizeRoles("Owner", "Manager"), validateBody(createUserSchema), createUser);

export default router;
