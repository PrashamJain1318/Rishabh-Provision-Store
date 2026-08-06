import cloudinary from "../../config/cloudinary";
import { Readable } from "stream";

export interface IUploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

export class UploadService {
  async uploadImageToCloudinary(
    fileBuffer: Buffer,
    folder: string = "rishabh-provision-store/products"
  ): Promise<IUploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
          allowed_formats: ["jpg", "jpeg", "png", "webp"],
        },
        (error: any, result: any) => {
          if (error || !result) {
            return reject(error || new Error("Failed to upload image to Cloudinary"));
          }
          return resolve({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width || 0,
            height: result.height || 0,
          });
        }
      );

      const stream = Readable.from(fileBuffer);
      stream.pipe(uploadStream);
    });
  }

  async deleteImageFromCloudinary(publicId: string): Promise<boolean> {
    if (!publicId) return false;
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === "ok";
    } catch (err) {
      return false;
    }
  }
}

export const uploadService = new UploadService();
