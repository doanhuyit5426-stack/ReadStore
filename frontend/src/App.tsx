import { BrowserRouter, Route, Router, Routes } from "react-router";
import SignInPage from "./pages/SignInPage";
import ChatAppPage from "./pages/ChatAppPage";
import { Toaster } from "sonner";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { CartProvider } from "@/context/CartContext";
import Header from "./components/layout/Header";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
