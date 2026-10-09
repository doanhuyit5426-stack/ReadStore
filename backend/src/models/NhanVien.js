import mongoose from "mongoose";

const nhanVienSchema = new mongoose.Schema(
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
      sparse: true, // cho phép để trống, nhưng nếu có thì không được trùng
      lowercase: true,
      trim: true,
    },
    chucVu: {
      type: String, // Quản lý, Nhân viên bán hàng, Thủ kho...
    },
    ngayVaoLam: {
      type: Date,
    },
    luong: {
      type: Number,
    },
    tenDangNhap: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    matKhau: {
      type: String,
      required: true, // lưu bản đã hash, không lưu plain text
    },
  },
  {
    timestamps: true,
  }
);

const NhanVien = mongoose.model("NhanVien", nhanVienSchema, "nhanvien");
export default NhanVien;
