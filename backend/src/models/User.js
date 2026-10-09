import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    gioiTinh: {
      type: String,
      enum: ["Nam", "Nữ", "Khác"],
    },
    ngaySinh: {
      type: Date,
    },
    sdt: {
      type: String,
      trim: true,
      sparse: true,
    },
    diaChi: {
      type: String,
      trim: true,
    },
    avatarUrl: {
      type: String,
    },
    avatarId: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("User", userSchema);