import { userRepository } from "./user.repository";
import { IUser } from "./user.types";

export class UserService {
  async getAllUsers(): Promise<IUser[]> {
    return await userRepository.findAll();
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await userRepository.findByEmail(email);
  }

  async createUser(data: IUser): Promise<IUser> {
    return await userRepository.create(data);
  }
}

export const userService = new UserService();
