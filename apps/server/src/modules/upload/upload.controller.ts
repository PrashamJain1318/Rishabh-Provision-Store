import { Request, Response } from "express";
import { uploadService } from "./upload.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";
import env from "../../config/env";

export const uploadSingleImage = asyncHandler(async (req: Request, res: Response) => {
  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    return sendError({
      res,
      statusCode: 400,
      message: "Cloudinary is not configured yet. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in apps/server/.env before testing image uploads.",
    });
  }

  if (!req.file) {
    return sendError({ res, statusCode: 400, message: "No image file provided in request" });
  }

  const folder = (req.body.folder as string) || "rishabh-provision-store/products";
  const result = await uploadService.uploadImageToCloudinary(req.file.buffer, folder);

  return sendSuccess({
    res,
    statusCode: 201,
    message: "Image uploaded to Cloudinary successfully",
    data: result,
  });
});
