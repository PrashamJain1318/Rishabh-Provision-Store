import { Request, Response } from "express";
import { uploadService } from "./upload.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const uploadSingleImage = asyncHandler(async (req: Request, res: Response) => {
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
