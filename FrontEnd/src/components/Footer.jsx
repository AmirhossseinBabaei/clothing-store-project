import React from "react";
import {
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r bg-yellow-100 text-black mt-10">
      <div className="w-[90%] mx-auto py-10 flex flex-wrap justify-between gap-8">
        {/* بخش برند */}
        <div className="flex-1 min-w-[200px]">
          <h2 className="text-2xl font-bold mb-4">فروشگاه شیک</h2>
          <p className="text-sm leading-6 text-black">
            بهترین محصولات با بهترین قیمت، تجربه‌ای متفاوت از خرید آنلاین.
          </p>
        </div>

        {/* لینک‌ها */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-lg font-semibold mb-4">لینک‌های مهم</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-black transition-colors">درباره ما</li>
            <li className="hover:text-black transition-colors">تماس با ما</li>
            <li className="hover:text-black transition-colors">قوانین و مقررات</li>
            <li className="hover:text-black transition-colors">سوالات متداول</li>
          </ul>
        </div>

        {/* شبکه‌های اجتماعی */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-lg font-semibold mb-4">ما را دنبال کنید</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-black transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <FaTelegramPlane />
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>

      {/* کپی‌رایت */}
      <div className="bg-yellow-100 text-center py-4 text-sm">
        © 2026 فروشگاه شیک | تمامی حقوق محفوظ است
      </div>
    </footer>
  );
}

export default Footer;
