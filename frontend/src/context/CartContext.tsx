import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Khởi tạo state từ localStorage (nếu có)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("shopping_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Lỗi khi đọc giỏ hàng từ localStorage:", error);
      return [];
    }
  });

  // 2. Tự động lưu vào localStorage mỗi khi giỏ hàng (cart) thay đổi
  useEffect(() => {
    try {
      localStorage.setItem("shopping_cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Lỗi khi ghi giỏ hàng vào localStorage:", error);
    }
  }, [cart]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === newItem.id);

      if (existingItemIndex > -1) {
        // Nếu đã có thì cộng dồn số lượng
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        return updatedCart;
      }
      // Nếu chưa có thì thêm mới
      return [...prevCart, newItem];
    });
  };

  // Xóa 1 sản phẩm
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Cập nhật số lượng
  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Xóa sạch giỏ hàng
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};