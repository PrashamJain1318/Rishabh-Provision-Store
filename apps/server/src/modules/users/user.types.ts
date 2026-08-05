import { UserRole } from "../../types/roles";

export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password?: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  isActive: boolean;
  isDeleted: boolean;
  lastLogin?: Date;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
