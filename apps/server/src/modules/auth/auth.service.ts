import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../config/env";

export interface UserTokenPayload {
  id: string;
  email: string;
  role: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const generateAccessToken = (payload: UserTokenPayload): string => {
  const cleanPayload = { id: payload.id, email: payload.email, role: payload.role };
  return jwt.sign(cleanPayload, env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: UserTokenPayload): string => {
  const cleanPayload = { id: payload.id, email: payload.email, role: payload.role };
  return jwt.sign(cleanPayload, env.JWT_REFRESH_SECRET || env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = (token: string): UserTokenPayload => {
  const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET || env.JWT_SECRET) as any;
  return { id: decoded.id, email: decoded.email, role: decoded.role };
};
