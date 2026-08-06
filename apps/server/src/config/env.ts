import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "5001", 10),
  MONGO_URI:
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    "mongodb://127.0.0.1:27017/rishabh-provision-store",
  JWT_SECRET: process.env.JWT_SECRET || "rishabh_store_super_secret_jwt_key_2026",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "rishabh_store_super_secret_refresh_key_2026",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "rishabh-provision-store",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "891234567890123",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "ab_cd_ef_gh_ij_kl_mn_op_qr_st_uv",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "AIzaSy_demo_gemini_api_key_rishabh_store_2026",
};

export default env;
