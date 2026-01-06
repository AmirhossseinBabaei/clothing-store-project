import React, { useState, useEffect } from "react";
import img1 from "../assets/imgaes/slider/3.jpg";
import { getAllProduct } from '../api/getAllProduct';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="text-center p-8">در حال بارگذاری محصولات...</div>;
  
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  
  if (!products || products.length === 0) return <div className="text-center p-8">محصولی یافت نشد</div>;

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-amber-50 via-white to-amber-100 flex flex-col lg:flex-row">
      {/* بخش محصولات */}
      <div className="lg:w-3/4 p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
          >
            <div className="overflow-hidden">
              <img
                src={product.image || product.img || img1} 
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.description}
              </p>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
               دسته بندی : {product.category.name} 
              </p>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                فروشنده : {product.user.full_name}
              </p>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                تلفن فروشنده : {product.user.phone}
              </p>
              <p className="text-amber-600 font-semibold">
                {product.price ? `${product.price.toLocaleString()} تومان` : "قیمت نامشخص"}
              </p>
              <button className="mt-4 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-colors duration-300">
                افزودن به سبد 🛒
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:w-1/4 p-8 bg-white shadow-2xl rounded-l-3xl flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-amber-700 border-b pb-3">
          فیلترها
        </h2>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            جستجو
          </label>
          <input
            type="text"
            placeholder="نام یا برند محصول..."
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            محدوده قیمت
          </label>
          <div className="flex gap-3 mb-2">
            <input
              type="number"
              placeholder="حداقل"
              className="w-1/2 border rounded-lg px-3 py-2"
            />
            <input
              type="number"
              placeholder="حداکثر"
              className="w-1/2 border rounded-lg px-3 py-2"
            />
          </div>
          <input type="range" min="0" max="500000" className="w-full accent-amber-500" />
          <p className="text-sm text-gray-600 mt-1">تا 500,000 تومان</p>
        </div>

        {/* دسته‌بندی */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            دسته‌بندی‌ها
          </label>
          <div className="flex flex-col gap-2">
            {["موبایل", "لپ‌تاپ", "مد و پوشاک", "خانه", "کتاب"].map((cat, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-amber-500" />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* فیلتر امتیاز */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            امتیاز کاربران
          </label>
          <div className="flex gap-2">
            {[5, 4, 3].map((stars) => (
              <button
                key={stars}
                className="px-3 py-1 border rounded-lg hover:bg-amber-100 transition"
              >
                {stars} ⭐
              </button>
            ))}
          </div>
        </div>

        {/* برند */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            برندها
          </label>
          <select className="w-full border rounded-lg px-3 py-2">
            <option>انتخاب کنید</option>
            <option>سامسونگ</option>
            <option>اپل</option>
            <option>شیائومی</option>
            <option>دل</option>
            <option>اچ‌پی</option>
          </select>
          <button className="text-black mt-10 float-right box-border border-4">اعمال فیلتر</button>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;