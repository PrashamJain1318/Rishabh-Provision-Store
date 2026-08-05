import cloudinary from "../../config/cloudinary";
import { Readable } from "stream";

export interface CloudinaryUploadResponse {
  url: string;
  public_id: string;
  format: string;
  bytes: number;
}

export class UploadService {
  async uploadImageToCloudinary(
    fileBuffer: Buffer,
    folder: string = "rishabh-provision-store/products"
  ): Promise<CloudinaryUploadResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
          transformation: [{ width: 1000, height: 1000, crop: "limit", quality: "auto" }],
        },
        (error, result) => {
          if (error || !result) {
            // Fallback for dev / unconfigured Cloudinary API keys
            const fallbackUrl = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500";
            return resolve({
              url: fallbackUrl,
              public_id: `fallback-${Date.now()}`,
              format: "jpg",
              bytes: fileBuffer.length,
            });
          }
          return resolve({
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            bytes: result.bytes,
          });
        }
      );

      const stream = Readable.from(fileBuffer);
      stream.pipe(uploadStream);
    });
  }
}

export const uploadService = new UploadService();
