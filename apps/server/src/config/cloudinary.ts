import env from "./env";

let cloudinary: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  cloudinary = require("cloudinary").v2;
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });
} catch {
  cloudinary = {
    uploader: {
      upload: async () => ({ secure_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800" }),
    },
  };
}

export default cloudinary;
