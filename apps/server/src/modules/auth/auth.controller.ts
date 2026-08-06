import { Request, Response } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./auth.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";
import { UserModel } from "../users/user.model";
import { AuthRequest } from "../../middlewares/auth.middleware";

/**
 * @desc    Register new user account in MongoDB Atlas
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, password, role } = req.body;
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await UserModel.findOne({
    $or: [{ email: normalizedEmail }, ...(phone ? [{ phone }] : [])],
    isDeleted: false,
  });

  if (existingUser) {
    return sendError({
      res,
      statusCode: 409,
      message: "Registration failed: Account with this email address or phone number already exists.",
      errors: [{ field: "email", message: "Email or Phone already in use" }],
    });
  }

  const newUser = new UserModel({
    firstName,
    lastName,
    email: normalizedEmail,
    phone,
    password,
    role: role || "Customer",
  });

  await newUser.save();

  const payload = {
    id: newUser._id.toString(),
    email: newUser.email,
    role: newUser.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
  });

  return sendSuccess({
    res,
    statusCode: 201,
    message: "Registration successful",
    data: {
      user: {
        id: newUser._id.toString(),
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
      accessToken,
    },
  });
});

/**
 * @desc    Authenticate user login against MongoDB Atlas
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const loginId = (username || email || "").toLowerCase().trim();

  if (!loginId || !password) {
    return sendError({ res, statusCode: 400, message: "Email/Username and password are required." });
  }

  const user = await UserModel.findOne({
    $or: [{ email: loginId }, { phone: loginId }],
    isDeleted: false,
  }).select("+password");

  if (!user) {
    return sendError({ res, statusCode: 401, message: "Invalid email or password credentials." });
  }

  if (user.isActive === false || user.isDeleted === true) {
    return sendError({
      res,
      statusCode: 403,
      message: "Account deactivated. Please contact store administration.",
    });
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return sendError({ res, statusCode: 401, message: "Invalid email or password credentials." });
  }

  user.lastLogin = new Date();
  await user.save();

  const payload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
  });

  return sendSuccess({
    res,
    message: "Sign in successful",
    data: {
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      accessToken,
    },
  });
});

/**
 * @desc    Refresh JWT access token using refresh cookie
 * @route   POST /api/v1/auth/refresh
 * @access  Public
 */
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

/**
 * @desc    Sign out user and clear refresh token cookie
 * @route   POST /api/v1/auth/logout
 * @access  Public
 */
export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return sendSuccess({
    res,
    message: "User logged out successfully",
    data: {},
  });
});

/**
 * @desc    Get authenticated user profile details from MongoDB Atlas
 * @route   GET /api/v1/auth/profile or /api/v1/auth/me
 * @access  Private
 */
export const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const authUser = req.user;
  if (!authUser) {
    return sendError({ res, statusCode: 401, message: "Unauthorized request." });
  }

  const user = await UserModel.findById(authUser.id).select("-password");
  if (!user) {
    return sendError({ res, statusCode: 404, message: "User account not found in database." });
  }

  return sendSuccess({
    res,
    message: "User profile retrieved successfully",
    data: user,
  });
});
