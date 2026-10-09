import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductList from "../components/home/ProductList";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Thanh đầu trang */}
      <Header />

      {/* Nội dung trang chủ */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Danh Sách Sách
        </h1>
        <ProductList/>
      </main>

      {/* Chân trang */}
      <Footer />
    </div>
  );
};

export default HomePage;