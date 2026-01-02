import React, { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold text-pink-600">
          فروشگاه لباس
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-8 font-medium">
          <div className="relative group">
          <a href="#" className="text-gray-700 hover:text-pink-600 transition">خانه</a>
            <button className="text-gray-700 hover:text-pink-600 transition">
              دسته‌بندی‌ها
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-0 rounded-md w-80">
              <a href="#" className="block px-4 py-2 hover:bg-pink-50">پیراهن</a>
              <a href="#" className="block px-4 py-2 hover:bg-pink-50">کفش</a>
              <a href="#" className="block px-4 py-2 hover:bg-pink-50">اکسسوری</a>
              <a href="#" className="block px-4 py-2 hover:bg-pink-50">اکسسوری</a>
            </div>
          <a href="#" className="text-gray-700 hover:text-pink-600 mr-5 ml-5 transition">تماس با ما</a>
          <a href="#" className="text-gray-700 hover:text-pink-600 transition">تخفیف‌ها</a>
          </div>
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <a href="#" className="text-gray-700 hover:text-pink-600 transition">ورود</a>
          <button className="bg-pink-600 text-black px-4 py-2 rounded-md hover:bg-pink-700 transition">
            ثبت‌نام
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <nav className="flex flex-col space-y-2 px-6 py-4 font-medium">
            <a href="#" className="text-gray-700 hover:text-pink-600 transition">خانه</a>
            <a href="#" className="text-gray-700 hover:text-pink-600 transition">دسته‌بندی‌ها</a>
            <a href="#" className="text-gray-700 hover:text-pink-600 transition">جدیدترین‌ها</a>
            <a href="#" className="text-gray-700 hover:text-pink-600 transition">تخفیف‌ها</a>
            <a href="#" className="text-gray-700 hover:text-pink-600 transition">تماس با ما</a>
            <a href="#" className="text-gray-700 hover:text-pink-600 transition">ورود</a>
            <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition">
              ثبت‌نام
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
