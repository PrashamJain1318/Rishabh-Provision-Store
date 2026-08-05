import { z } from "zod";
import { UserRoleEnum } from "../../types/roles";

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address format"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Phone number must be a valid 10-digit Indian mobile number")
    .optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)"),
  role: z.nativeEnum(UserRoleEnum).optional().default(UserRoleEnum.CUSTOMER),
});

export const loginSchema = z.object({
  email: z.string().optional(),
  username: z.string().optional(),
  password: z.string().min(1, "Password is required"),
});
