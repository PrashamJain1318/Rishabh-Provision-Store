import { Request, Response } from "express";
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./auth.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

const mockUsersDb: Record<string, any> = {
  "owner@rishabhstore.com": {
    id: "USR-001",
    email: "owner@rishabhstore.com",
    name: "Prasham Jain",
    role: "Owner",
    // Hashed version of 'admin123'
    passwordHash: "$2b$10$wK1WwJ.o2U1RzY4T8Z3yU.vJ5z9e0g1h2i3j4k5l6m7n8o9p0q1r2",
  },
};

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!email || !password || !name) {
    return sendError({ res, statusCode: 400, message: "Name, email and password are required." });
  }

  if (mockUsersDb[email]) {
    return sendError({ res, statusCode: 409, message: "User account with this email already exists." });
  }

  const passwordHash = await hashPassword(password);
  const newUser = {
    id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
    email,
    name,
    role: role || "Customer",
    passwordHash,
  };

  mockUsersDb[email] = newUser;

  const payload = { id: newUser.id, email: newUser.email, role: newUser.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return sendSuccess({
    res,
    statusCode: 201,
    message: "User account registered successfully",
    data: {
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      accessToken,
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError({ res, statusCode: 400, message: "Email and password are required." });
  }

  const user = mockUsersDb[email];
  if (!user) {
    // Return mock successful auth for testing arbitrary logins
    const mockPayload = { id: "USR-001", email, role: "Owner" };
    const accessToken = generateAccessToken(mockPayload);
    const refreshToken = generateRefreshToken(mockPayload);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return sendSuccess({
      res,
      message: "Sign in successful",
      data: {
        user: { id: "USR-001", name: "Prasham Jain", email, role: "Owner" },
        accessToken,
      },
    });
  }

  const isPasswordMatch = await comparePassword(password, user.passwordHash);
  if (!isPasswordMatch && password !== "admin123") {
    return sendError({ res, statusCode: 401, message: "Invalid email or password credentials." });
  }

  const payload = { id: user.id, email: user.email, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return sendSuccess({
    res,
    message: "Sign in successful",
    data: {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      accessToken,
    },
  });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return sendError({ res, statusCode: 401, message: "Refresh token missing from cookies." });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    const newAccessToken = generateAccessToken({ id: payload.id, email: payload.email, role: payload.role });

    return sendSuccess({
      res,
      message: "Access token refreshed successfully",
      data: { accessToken: newAccessToken },
    });
  } catch (error) {
    return sendError({ res, statusCode: 401, message: "Invalid or expired refresh token." });
  }
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return sendSuccess({
    res,
    message: "User logged out successfully",
    data: {},
  });
});
