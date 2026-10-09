import { Link } from "react-router";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const subtotal = cart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ) || 0;

  const shippingFee = subtotal > 0 ? 30000 : 0; // Phí ship cố định 30,000đ (hoặc 0đ nếu giỏ trống)
  const total = subtotal + shippingFee;

  // Trường hợp giỏ hàng trống
  if (!cart || cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-md">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gray-100 rounded-full">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Giỏ hàng của bạn đang trống
        </h2>
        <p className="text-gray-500 mb-6">
          Hãy chọn thêm vài sản phẩm yêu thích và quay lại đây nhé!
        </p>
        <Link to="/">
          <Button className="w-full sm:w-auto">
            <ArrowLeft className="mr-2 h-4 w-4" /> Tiếp tục mua sắm
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Giỏ hàng của bạn ({cart.length})
        </h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCart}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          Xóa tất cả
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Danh sách sản phẩm trong giỏ (Cột trái) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm gap-4"
            >
              {/* Hình ảnh & Tên sản phẩm */}
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    {item.price.toLocaleString("vi-VN")} đ
                  </p>
                </div>
              </div>

              {/* Tăng/giảm số lượng & Nút xóa */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-6">
                {/* Bộ tăng/giảm số lượng */}
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="p-2 hover:bg-gray-100 transition-colors text-gray-600"
                    aria-label="Giảm số lượng"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 py-1 text-sm font-semibold min-w-[32px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors text-gray-600"
                    aria-label="Tăng số lượng"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Tổng tiền của mục này */}
                <div className="text-right min-w-[80px]">
                  <p className="font-bold text-gray-900 text-sm">
                    {(item.price * item.quantity).toLocaleString("vi-VN")} đ
                  </p>
                </div>

                {/* Nút xóa item */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Xóa sản phẩm"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Tiếp tục tìm kiếm sản phẩm
            </Link>
          </div>
        </div>

        {/* Bảng tóm tắt đơn hàng (Cột phải) */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm space-y-4 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-3">
              Tóm tắt đơn hàng
            </h2>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span className="font-semibold text-gray-900">
                  {subtotal.toLocaleString("vi-VN")} đ
                </span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span className="font-semibold text-gray-900">
                  {shippingFee > 0
                    ? `${shippingFee.toLocaleString("vi-VN")} đ`
                    : "Miễn phí"}
                </span>
              </div>
            </div>

            <div className="border-t pt-3 flex justify-between items-center">
              <span className="text-base font-bold text-gray-900">
                Tổng cộng
              </span>
              <span className="text-xl font-extrabold text-primary">
                {total.toLocaleString("vi-VN")} đ
              </span>
            </div>

            <Link to="/checkout" className="block w-full pt-2">
              <Button size="lg" className="w-full font-bold">
                Thanh toán ngay
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}