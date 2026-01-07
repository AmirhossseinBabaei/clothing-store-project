import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* بخش برند */}
          <div>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              👗 فروشگاه لباس شیک
            </h2>
            <p className="text-gray-300 text-sm leading-6 mb-4">
              بهترین و شیک‌ترین لباس‌ها را با بهترین قیمت از ما خریداری کنید. 
              تجربه‌ای متفاوت از خرید آنلاین لباس.
            </p>
            <div className="flex gap-4 text-2xl mt-4">
              <a href="#" className="hover:text-pink-400 transition-colors" aria-label="اینستاگرام">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors" aria-label="تلگرام">
                <FaTelegramPlane />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors" aria-label="توییتر">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors" aria-label="فیس‌بوک">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors" aria-label="واتساپ">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* لینک‌های سریع */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-300">لینک‌های سریع</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-pink-400 transition-colors">
                  خانه
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-pink-400 transition-colors">
                  محصولات
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-gray-300 hover:text-pink-400 transition-colors">
                  تماس با ما
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                  درباره ما
                </a>
              </li>
            </ul>
          </div>

          {/* دسته‌بندی‌ها */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-300">دسته‌بندی‌ها</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products?category=shirt" className="text-gray-300 hover:text-pink-400 transition-colors">
                  👔 پیراهن
                </Link>
              </li>
              <li>
                <Link to="/products?category=pants" className="text-gray-300 hover:text-pink-400 transition-colors">
                  👖 شلوار
                </Link>
              </li>
              <li>
                <Link to="/products?category=dress" className="text-gray-300 hover:text-pink-400 transition-colors">
                  👗 لباس
                </Link>
              </li>
              <li>
                <Link to="/products?category=shoes" className="text-gray-300 hover:text-pink-400 transition-colors">
                  👠 کفش
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="text-gray-300 hover:text-pink-400 transition-colors">
                  💍 اکسسوری
                </Link>
              </li>
            </ul>
          </div>

          {/* اطلاعات تماس */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-300">تماس با ما</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📧 info@shop.com</li>
              <li>📱 09123456789</li>
              <li>📍 تهران، خیابان ولیعصر</li>
              <li>🕐 شنبه تا پنجشنبه: 9 صبح تا 9 شب</li>
            </ul>
          </div>
        </div>

        {/* کپی‌رایت */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} فروشگاه لباس شیک | تمامی حقوق محفوظ است</p>
          <p className="mt-2">
            طراحی شده با ❤️ برای شما
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
