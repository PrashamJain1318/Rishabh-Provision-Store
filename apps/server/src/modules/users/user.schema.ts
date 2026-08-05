import { z } from "zod";
import { UserRoleEnum } from "../../types/roles";

export const createUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.nativeEnum(UserRoleEnum).default(UserRoleEnum.CUSTOMER),
  avatar: z.string().url("Invalid avatar URL").optional(),
});

export const updateUserSchema = createUserSchema.partial();
