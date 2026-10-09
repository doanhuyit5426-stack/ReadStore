import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  Plus,
  Minus,
  BookOpen,
  Building2,
  Calendar,
  Barcode,
  Heart,
  Share2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

// Struct dữ liệu khớp chính xác với MongoDB Schema "Sach"
interface Sach {
  _id: string; // MaSach
  TenSach: string;
  TacGia?: string | null;
  MaNXB?: string | null;
  NamXuatBan?: number | null;
  GiaBan: number;
  SoLuongTon?: number | null;
  MoTa?: string | null;
  HinhAnh?: string | null;
  ISBN?: string | null;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [book, setBook] = useState<Sach | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [justAdded, setJustAdded] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Giả lập Fetch API lấy thông tin sách từ backend theo id (_id)
  useEffect(() => {
    setLoading(true);

    // TODO: Thay bằng lệnh fetch API thật từ backend Node.js của bạn
    // fetch(`http://localhost:5001/api/books/${id}`)
    //   .then((res) => res.json())
    //   .then((data) => { setBook(data); setLoading(false); });

    // Dữ liệu mẫu test giao diện
    setTimeout(() => {
      setBook({
        _id: id || "S001",
        TenSach: "Lập Trình Web Với React & Node.js Toàn Tập",
        TacGia: "Nguyễn Văn A",
        MaNXB: "NXB Tri Thức",
        NamXuatBan: 2026,
        GiaBan: 185000,
        SoLuongTon: 42,
        MoTa: "Cuốn sách hướng dẫn chi tiết từ cơ bản đến nâng cao về phát triển ứng dụng Web hiện đại sử dụng React, Vite, Node.js và CSDL MongoDB. Phù hợp cho cả người mới bắt đầu và lập trình viên muốn nâng cao kỹ năng.",
        HinhAnh: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
        ISBN: "978-604-1-23456-7",
      });
      setLoading(false);
    }, 400);
  }, [id]);

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = async () => {
    if (!book) return;

    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    addToCart({
      id: book._id as unknown as number, // Ép kiểu số/chuỗi tương thích với CartContext
      name: book.TenSach,
      price: book.GiaBan,
      image: book.HinhAnh || "/placeholder.png",
      quantity: quantity,
    });

    setIsAdding(false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  // Trang đang tải
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Đang tải thông tin sách...</p>
      </div>
    );
  }

  // Không tìm thấy sách
  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-md">
        <div className="text-6xl mb-4">📚</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Không tìm thấy sản phẩm
        </h2>
        <p className="text-gray-500 mb-6">
          Sách bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <Link to="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang chủ
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
      {/* Nút quay lại */}
      <Link
        to="/"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại danh sách sách
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Hình ảnh sách (Cột trái - 5 cột) */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-inner group">
            <img
              src={book.HinhAnh || "/placeholder.png"}
              alt={book.TenSach}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white ${
                isLiked ? "text-red-500" : "text-gray-600"
              }`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Thông tin chi tiết sách (Cột phải - 7 cột) */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            {/* Tên sách & Mã sách */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Mã sách: {book._id}
              </span>
              <button className="text-gray-400 hover:text-gray-600">
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {book.TenSach}
            </h1>

            {/* Giá bán */}
            <div className="flex items-baseline gap-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="text-3xl font-extrabold text-primary">
                {book.GiaBan.toLocaleString("vi-VN")} đ
              </span>
              <span className="text-sm text-gray-500">Đã bao gồm VAT</span>
            </div>

            {/* Thông tin chi tiết: Tác giả, NXB, Năm XB, ISBN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 mb-6 border-y border-gray-100 py-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span>
                  <strong>Tác giả:</strong> {book.TacGia || "Đang cập nhật"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span>
                  <strong>Nhà xuất bản:</strong> {book.MaNXB || "Đang cập nhật"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span>
                  <strong>Năm xuất bản:</strong> {book.NamXuatBan || "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Barcode className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span>
                  <strong>Mã ISBN:</strong> {book.ISBN || "Chưa có"}
                </span>
              </div>
            </div>

            {/* Tình trạng kho */}
            <div className="mb-6">
              <span className="text-sm font-medium">Tình trạng: </span>
              {book.SoLuongTon && book.SoLuongTon > 0 ? (
                <span className="text-sm font-semibold text-green-600">
                  Còn hàng ({book.SoLuongTon} cuốn trong kho)
                </span>
              ) : (
                <span className="text-sm font-semibold text-red-500">
                  Hết hàng
                </span>
              )}
            </div>

            {/* Mô tả sách */}
            <div className="space-y-2 mb-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Mô tả nội dung
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {book.MoTa || "Chưa có mô tả cho sản phẩm này."}
              </p>
            </div>
          </div>

          {/* Chọn số lượng & Nút Thêm vào giỏ hàng */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">Số lượng:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="p-2.5 hover:bg-gray-100 text-gray-600 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-1 text-sm font-bold min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="p-2.5 hover:bg-gray-100 text-gray-600 transition-colors"
                  disabled={!!(book.SoLuongTon && quantity >= book.SoLuongTon)}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className={`flex-1 font-bold text-base transition-all duration-300 ${
                  justAdded
                    ? "bg-green-600 hover:bg-green-600 text-white"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                onClick={handleAddToCart}
                disabled={isAdding || (book.SoLuongTon != null && book.SoLuongTon <= 0)}
              >
                {isAdding ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Đang xử lý...
                  </div>
                ) : justAdded ? (
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    Đã thêm vào giỏ hàng!
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Thêm vào giỏ hàng
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}