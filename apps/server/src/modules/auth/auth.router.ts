import { Router } from "express";
import { register, login, refresh, logout, getProfile } from "./auth.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import { authenticate } from "../../middlewares/auth.middleware";
import { registerSchema, loginSchema } from "./auth.schema";

const router = Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", authenticate, getProfile);

export default router;
