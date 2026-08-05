import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "5001", 10),
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/rishabh_provision_store",
  JWT_SECRET: process.env.JWT_SECRET || "rishabh_store_super_secret_jwt_key_2026",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
};

export default env;
