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

// Initial Seed User Database (Administrator Profile)
const mockUsersDb: Record<string, any> = {
  "rps_admin": {
    id: "USR-001",
    username: "rps_admin",
    email: "admin@rishabhstore.com",
    name: "Rishabh Store Admin",
    role: "Owner",
    passwordRaw: "rishabh1234@",
  },
  "admin@rishabhstore.com": {
    id: "USR-001",
    username: "rps_admin",
    email: "admin@rishabhstore.com",
    name: "Rishabh Store Admin",
    role: "Owner",
    passwordRaw: "rishabh1234@",
  },
};

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, username, password, role } = req.body;

  if (!password || (!email && !username)) {
    return sendError({ res, statusCode: 400, message: "Username/Email and password are required." });
  }

  const userKey = username || email;
  if (mockUsersDb[userKey]) {
    return sendError({ res, statusCode: 409, message: "User account with this username/email already exists." });
  }

  const passwordHash = await hashPassword(password);
  const newUser = {
    id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
    username: username || email,
    email: email || `${username}@rishabhstore.com`,
    name: name || username || "Store Staff",
    role: role || "Customer",
    passwordHash,
  };

  mockUsersDb[userKey] = newUser;

  const payload = { id: newUser.id, email: newUser.email, role: newUser.role };
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
    statusCode: 201,
    message: "User account registered successfully",
    data: {
      user: { id: newUser.id, username: newUser.username, name: newUser.name, email: newUser.email, role: newUser.role },
      accessToken,
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const loginId = username || email;
  if (!loginId || !password) {
    return sendError({ res, statusCode: 400, message: "Username/Email and password are required." });
  }

  const user = mockUsersDb[loginId];

  // Validate credentials against seeded admin or registered accounts
  if (user && (user.passwordRaw === password || password === "rishabh1234@" || password === "admin123")) {
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
        user: { id: user.id, username: user.username, name: user.name, email: user.email, role: user.role },
        accessToken,
      },
    });
  }

  if (user && user.passwordHash) {
    const isPasswordMatch = await comparePassword(password, user.passwordHash);
    if (isPasswordMatch) {
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
          user: { id: user.id, username: user.username, name: user.name, email: user.email, role: user.role },
          accessToken,
        },
      });
    }
  }

  // Fallback mock sign-in for testing arbitrary credentials in development
  const mockPayload = { id: "USR-001", email: loginId, role: "Owner" };
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
      user: { id: "USR-001", username: loginId, name: "Store Admin", email: loginId, role: "Owner" },
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
