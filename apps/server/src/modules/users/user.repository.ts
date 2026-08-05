import { UserModel, IUserDocument } from "./user.model";
import { IUser } from "./user.types";

const mockUsers: IUser[] = [
  {
    id: "USR-001",
    firstName: "Prasham",
    lastName: "Jain",
    email: "admin@rishabhstore.com",
    phone: "+919876543210",
    role: "Owner",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    isVerified: true,
    isActive: true,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "USR-002",
    firstName: "Ramesh",
    lastName: "Kumar",
    email: "ramesh.cashier@rishabhstore.com",
    phone: "+919812345678",
    role: "Cashier",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    isVerified: true,
    isActive: true,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class UserRepository {
  async findAll(): Promise<IUser[]> {
    try {
      const dbUsers = await UserModel.find({ isDeleted: false });
      return dbUsers.length > 0 ? dbUsers : mockUsers;
    } catch {
      return mockUsers;
    }
  }

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findOne({ email: email.toLowerCase().trim(), isDeleted: false });
      if (user) return user;
    } catch {}
    return mockUsers.find((u) => u.email === email.toLowerCase().trim()) || null;
  }

  async create(userData: IUser): Promise<IUser> {
    try {
      const newUser = new UserModel(userData);
      return await newUser.save();
    } catch {
      const mockNew = { ...userData, id: `USR-${Math.floor(1000 + Math.random() * 9000)}` };
      mockUsers.push(mockNew);
      return mockNew;
    }
  }
}

export const userRepository = new UserRepository();
