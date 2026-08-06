import mongoose from "mongoose";
import env from "../config/env";
import { logger } from "../config/logger";
import { UserModel } from "../modules/users/user.model";

export const seedOwnerAccount = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || env.MONGODB_URI;
    if (!mongoUri || mongoUri.includes("<I WILL PASTE")) {
      return;
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(mongoUri);
    }

    const existingOwner = await UserModel.findOne({
      $or: [{ email: "admin@rishabhstore.com" }, { role: "Owner" }],
      isDeleted: false,
    });

    if (existingOwner) {
      logger.info(`👑 Owner Account already exists in database: ${existingOwner.email} (Role: ${existingOwner.role})`);
      return;
    }

    const ownerUser = new UserModel({
      firstName: "Rishabh",
      lastName: "Owner",
      email: "admin@rishabhstore.com",
      phone: "+919876543210",
      password: "rishabh1234@",
      role: "Owner",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      isVerified: true,
      isActive: true,
    });

    await ownerUser.save();
    logger.info("🎉 Owner Account created successfully in database!");
    logger.info(`Email: admin@rishabhstore.com | Role: Owner`);
  } catch (error) {
    logger.error("Failed to seed Owner account:", error);
  }
};

// Executable script entry point
if (require.main === module) {
  seedOwnerAccount().then(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    process.exit(0);
  });
}

export default seedOwnerAccount;
