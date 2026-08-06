import { Request, Response } from "express";
import { uploadService } from "./upload.service";
import { isCloudinaryConfigured } from "../../config/cloudinary";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const uploadSingleImage = asyncHandler(async (req: Request, res: Response) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret || !isCloudinaryConfigured()) {
    return sendError({
      res,
      statusCode: 500,
      message: "Cloudinary configuration is missing.",
    });
  }

  if (!req.file) {
    return sendError({
      res,
      statusCode: 400,
      message: "No image file provided. Field 'image' is required.",
    });
  }

  const folder = (req.body.folder as string) || "rishabh-provision-store/products";
  const result = await uploadService.uploadImageToCloudinary(req.file.buffer, folder);

  return sendSuccess({
    res,
    statusCode: 200,
    message: "Image uploaded successfully",
    data: {
      url: result.url,
      publicId: result.publicId,
      width: result.width,
      height: result.height,
    },
  });
});
