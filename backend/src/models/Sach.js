import mongoose from "mongoose";

const anhSchema = new mongoose.Schema({
  tenAnh: {
    type: String,
    required: true, // tên file ảnh, không phải URL
  },
  laAnhChinh: {
    type: Boolean,
    default: false, // true = ảnh đại diện/theme, false = ảnh phụ (trang chi tiết sách)
  },
});
// mỗi ảnh vẫn giữ _id riêng (mặc định của Mongoose) để sau này sửa/xoá từng ảnh

const sachSchema = new mongoose.Schema(
  {
    tenSach: {
      type: String,
      required: true,
      trim: true,
    },
    tacGia: {
      type: String,
      trim: true,
    },
    maNXB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NhaXuatBan",
    },
    namXuatBan: {
      type: Number,
    },
    giaBan: {
      type: Number,
      required: true,
    },
    soLuongTon: {
      type: Number,
      default: 0,
      min: 0,
    },
    moTa: {
      type: String,
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    theLoaiIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TheLoai", // 1 sách có thể thuộc nhiều thể loại (n-n)
      },
    ],
    images: [anhSchema],
  },
  {
    timestamps: true,
  }
);

sachSchema.index({ theLoaiIds: 1 }); // tra nhanh "sách theo thể loại"
sachSchema.index({ tenSach: "text" }); // tìm sách theo tên

const Sach = mongoose.model("Sach", sachSchema, "sach");
export default Sach;
