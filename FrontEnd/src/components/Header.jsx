import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FiShoppingCart, FiUser, FiLogOut, FiSearch, FiMenu, FiX } from "react-icons/fi";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const cartCount = getCartItemsCount();

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 w-full z-50 border-b border-pink-100">
      <div className="container mx-auto px-4">
        {/* ردیف اول - لوگو و جستجو */}
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            👗 فروشگاه لباس شیک
          </Link>

          {/* جستجو */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی محصولات..."
              className="w-full border-2 border-gray-200 rounded-r-xl px-4 py-2 focus:outline-none focus:border-pink-500 transition"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-l-xl hover:from-pink-600 hover:to-purple-700 transition"
            >
              <FiSearch className="text-xl" />
            </button>
          </form>

          {/* آیکون‌های سبد خرید و کاربر */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-pink-600 transition"
            >
              <FiShoppingCart className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated() ? (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition"
                >
                  <FiUser className="text-xl" />
                  <span className="text-sm">{user?.full_name || user?.email || 'کاربر'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition"
                >
                  <FiLogOut className="text-xl" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/sign-in"
                  className="text-gray-700 hover:text-pink-600 transition px-3 py-1"
                >
                  ورود
                </Link>
                <Link
                  to="/sign-up"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-pink-600 hover:to-purple-700 transition"
                >
                  ثبت‌نام
                </Link>
              </div>
            )}

            {/* دکمه منوی موبایل */}
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* ردیف دوم - منوی اصلی */}
        <nav className="hidden md:flex justify-center items-center gap-8 py-3 border-t border-gray-100">
          <Link to="/" className="text-gray-700 hover:text-pink-600 transition font-medium">
            خانه
          </Link>
          <div className="relative group">
            <button className="text-gray-700 hover:text-pink-600 transition font-medium flex items-center gap-1">
              دسته‌بندی‌ها
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-xl mt-2 rounded-xl w-64 border border-pink-100">
              <Link to="/products?category=shirt" className="block px-4 py-3 hover:bg-pink-50 rounded-t-xl transition">
                👔 پیراهن
              </Link>
              <Link to="/products?category=pants" className="block px-4 py-3 hover:bg-pink-50 transition">
                👖 شلوار
              </Link>
              <Link to="/products?category=dress" className="block px-4 py-3 hover:bg-pink-50 transition">
                👗 لباس
              </Link>
              <Link to="/products?category=shoes" className="block px-4 py-3 hover:bg-pink-50 transition">
                👠 کفش
              </Link>
              <Link to="/products?category=accessories" className="block px-4 py-3 hover:bg-pink-50 rounded-b-xl transition">
                💍 اکسسوری
              </Link>
            </div>
          </div>
          <Link to="/products" className="text-gray-700 hover:text-pink-600 transition font-medium">
            محصولات
          </Link>
          <Link to="/contact-us" className="text-gray-700 hover:text-pink-600 transition font-medium">
            تماس با ما
          </Link>
        </nav>
      </div>

      {/* منوی موبایل */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            <form onSubmit={handleSearch} className="flex mb-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو..."
                className="flex-1 border-2 border-gray-200 rounded-r-lg px-3 py-2 focus:outline-none focus:border-pink-500"
              />
              <button
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded-l-lg"
              >
                <FiSearch />
              </button>
            </form>
            <Link to="/" className="text-gray-700 hover:text-pink-600 transition py-2" onClick={() => setIsOpen(false)}>
              خانه
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-pink-600 transition py-2" onClick={() => setIsOpen(false)}>
              محصولات
            </Link>
            <Link to="/contact-us" className="text-gray-700 hover:text-pink-600 transition py-2" onClick={() => setIsOpen(false)}>
              تماس با ما
            </Link>
            {isAuthenticated() ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-pink-600 transition py-2" onClick={() => setIsOpen(false)}>
                  داشبورد
                </Link>
                <button onClick={handleLogout} className="text-red-600 hover:text-red-700 transition py-2 text-right">
                  خروج
                </button>
              </>
            ) : (
              <>
                <Link to="/sign-in" className="text-gray-700 hover:text-pink-600 transition py-2" onClick={() => setIsOpen(false)}>
                  ورود
                </Link>
                <Link to="/sign-up" className="bg-pink-500 text-white px-4 py-2 rounded-lg text-center" onClick={() => setIsOpen(false)}>
                  ثبت‌نام
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
