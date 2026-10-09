import mongoose from "mongoose";

const nhaXuatBanSchema = new mongoose.Schema(
  {
    tenNXB: {
      type: String,
      required: true,
      trim: true,
    },
    diaChi: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const NhaXuatBan = mongoose.model("NhaXuatBan", nhaXuatBanSchema, "nhaxuatban");
export default NhaXuatBan;
