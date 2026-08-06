import env from "./env";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinarySDK = require("cloudinary").v2;

export const isCloudinaryConfigured = (): boolean => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY || env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET || env.CLOUDINARY_API_SECRET;

  return Boolean(cloudName && apiKey && apiSecret);
};

cloudinarySDK.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET || env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const cloudinary = cloudinarySDK;
export default cloudinary;
