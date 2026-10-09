import mongoose from "mongoose";

const khachHangSchema = new mongoose.Schema(
  {
    hoTen: {
      type: String,
      required: true,
      trim: true,
    },
    gioiTinh: {
      type: String,
    },
    ngaySinh: {
      type: Date,
    },
    diaChi: {
      type: String,
      trim: true,
    },
    sdt: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    tenDangNhap: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    matKhau: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt đóng vai trò "ngày đăng ký", không cần field riêng
  }
);

const KhachHang = mongoose.model("KhachHang", khachHangSchema, "khachhang");
export default KhachHang;
