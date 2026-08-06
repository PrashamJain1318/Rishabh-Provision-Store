import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./user.types";
import { UserRoleEnum } from "../../types/roles";

export interface IUserDocument extends Omit<IUser, "id">, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
  softDelete(): Promise<IUserDocument>;
}

const userSchema = new Schema<IUserDocument>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: { type: String, trim: true, index: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: Object.values(UserRoleEnum),
      default: UserRoleEnum.CUSTOMER,
      index: true,
    },
    avatar: { type: String },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true, index: true },
    isDeleted: { type: Boolean, default: false, index: true },
    lastLogin: { type: Date },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

// Pre-save Hook: Password Hashing & Email Normalization
userSchema.pre<IUserDocument>("save", async function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase().trim();
  }
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Instance Method: Compare Password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Instance Method: Soft Delete
userSchema.methods.softDelete = async function (): Promise<IUserDocument> {
  this.isDeleted = true;
  this.deletedAt = new Date();
  this.isActive = false;
  return this.save();
};

export const UserModel = mongoose.model<IUserDocument>("User", userSchema);
export default UserModel;
