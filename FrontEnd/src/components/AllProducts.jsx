import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import img1 from "../assets/imgaes/slider/3.jpg";
import { getAllProduct } from '../api/GetAllProduct';
import { FiShoppingCart, FiHeart } from "react-icons/fi";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });
  const [selectedCategory, setSelectedCategory] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    getAllProduct()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطا در دریافت محصولات:", err);
        setError("خطا در دریافت محصولات");
        setLoading(false);
      });
  }, []);

  // فیلتر محصولات
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = (!product.price || (product.price >= priceRange.min && product.price <= priceRange.max));
    const matchesCategory = !selectedCategory || product.category?.name === selectedCategory;
    return matchesSearch && matchesPrice && matchesCategory;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} به سبد خرید اضافه شد!`);
  };

  // استخراج دسته‌بندی‌های منحصر به فرد
  const categories = [...new Set(products.map(p => p.category?.name).filter(Boolean))]; 

  if (loading) return <div className="text-center p-8">در حال بارگذاری محصولات...</div>;
  
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  
  if (!products || products.length === 0) return <div className="text-center p-8">محصولی یافت نشد</div>;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex flex-col lg:flex-row pt-8">
      {/* بخش محصولات */}
      <div className="lg:w-3/4 p-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
            <p className="mt-4 text-gray-600">در حال بارگذاری محصولات...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">محصولی یافت نشد</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-pink-100"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="overflow-hidden relative">
                    <img
                      src={product.image || product.img || img1} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2">
                      <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-pink-500 hover:text-white transition">
                        <FiHeart className="text-lg" />
                      </button>
                    </div>
                  </div>
                </Link>
                <div className="p-5">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-pink-600 transition">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  {product.category && (
                    <p className="text-pink-600 text-xs mb-2">
                      📁 {product.category.name}
                    </p>
                  )}
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      {product.price ? `${product.price.toLocaleString()} تومان` : "قیمت نامشخص"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                    >
                      <FiShoppingCart /> افزودن
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="px-4 py-2 border-2 border-pink-500 text-pink-600 rounded-lg hover:bg-pink-50 transition"
                    >
                      جزئیات
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="lg:w-1/4 p-6 bg-white/90 backdrop-blur-xl shadow-2xl rounded-l-3xl flex flex-col gap-6 sticky top-20 h-fit">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent border-b border-pink-200 pb-3">
          🔍 فیلترها
        </h2>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            جستجو
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="نام یا برند محصول..."
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            محدوده قیمت
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              value={priceRange.min || ""}
              onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value) || 0})}
              placeholder="حداقل"
              className="w-1/2 border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="number"
              value={priceRange.max || ""}
              onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value) || 10000000})}
              placeholder="حداکثر"
              className="w-1/2 border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* دسته‌بندی */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            دسته‌بندی‌ها
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">همه دسته‌بندی‌ها</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setSearchQuery("");
            setPriceRange({ min: 0, max: 10000000 });
            setSelectedCategory("");
          }}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 mt-4"
        >
          پاک کردن فیلترها
        </button>
      </div>
    </div>
  );
}

export default ProductsPage;