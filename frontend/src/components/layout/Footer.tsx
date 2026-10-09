import { Link } from "react-router"; 
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Intro */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-white tracking-tight">
              BLOOM<span className="text-primary">SHOP</span>
            </Link>
            <p className="text-sm text-gray-400">
              Cung cấp các sản phẩm chất lượng cao với dịch vụ tốt nhất cho khách hàng.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Trang chủ</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Liên hệ</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">Giỏ hàng</Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Tài khoản</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/signin" className="hover:text-white transition-colors">Đăng nhập</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-white transition-colors">Đăng ký</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Thành phố Hồ Chí Minh, Việt Nam</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+84 123 456 789</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@bloomshop.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} BloomShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}