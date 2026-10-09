import mongoose from "mongoose";

const chiTietDonHangSchema = new mongoose.Schema(
  {
    maSach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sach",
      required: true,
    },
    tenSach: {
      type: String,
      required: true, // snapshot tên sách lúc đặt — sách đổi tên sau này đơn cũ vẫn đúng
    },
    soLuong: {
      type: Number,
      required: true,
      min: 1,
    },
    donGia: {
      type: Number,
      required: true, // snapshot giá lúc đặt — sách đổi giá sau này đơn cũ vẫn đúng
    },
  },
  { _id: false } // từng dòng chi tiết là snapshot, không cần id riêng
);

const donHangSchema = new mongoose.Schema(
  {
    maKH: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KhachHang",
      required: true,
    },
    maNV: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NhanVien", // bỏ field này nếu đơn khách tự đặt online, chưa có NV xử lý
    },
    diaChiGiaoHang: {
      type: String,
      trim: true,
    },
    trangThai: {
      type: String,
      enum: ["Chờ xác nhận", "Đang giao", "Hoàn thành", "Đã hủy"],
      default: "Chờ xác nhận",
    },
    tongTien: {
      type: Number,
    },
    chiTietDonHang: {
      type: [chiTietDonHangSchema],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "Đơn hàng phải có ít nhất 1 sách",
      },
    },
  },
  {
    timestamps: true, // createdAt đóng vai trò "ngày đặt hàng", không cần field riêng
  }
);

donHangSchema.index({ maKH: 1 }); // tra nhanh "đơn hàng của khách X"

const DonHang = mongoose.model("DonHang", donHangSchema, "donhang");
export default DonHang;
