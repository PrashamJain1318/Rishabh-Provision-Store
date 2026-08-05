import { Request, Response } from "express";
import { userService } from "./user.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  return sendSuccess({
    res,
    message: "Users list retrieved successfully",
    data: users,
  });
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const newUser = await userService.createUser(req.body);
  return sendSuccess({
    res,
    statusCode: 201,
    message: "User created successfully",
    data: newUser,
  });
});
