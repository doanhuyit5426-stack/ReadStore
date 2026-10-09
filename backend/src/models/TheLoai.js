import mongoose from "mongoose";

const theLoaiSchema = new mongoose.Schema(
  {
    tenTheLoai: {
      type: String,
      required: true,
      trim: true,
    },
    soLuongSach: {
      type: Number,
      default: 0,
      min: 0,
      // KHÔNG tự cập nhật — Mongoose không có trigger giữa các collection.
      // Mỗi khi thêm/gỡ 1 thể loại khỏi mảng theLoaiIds của Sach, phải tự
      // gọi TheLoai.updateOne({_id}, {$inc:{soLuongSach: 1 hoặc -1}}) ở
      // tầng code (xem ví dụ trong seed.mjs).
    },
  },
  {
    timestamps: true,
  }
);

const TheLoai = mongoose.model("TheLoai", theLoaiSchema, "theloai");
export default TheLoai;
