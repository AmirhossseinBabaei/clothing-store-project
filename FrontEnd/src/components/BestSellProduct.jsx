import React, { useEffect, useState } from "react";
import "../styles/public.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import {GetFourExpensiveProducts} from "../api/GetFourExpensiveProducts";

import img1 from "../assets/imgaes/slider/1.jpg";

function BestSellProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetFourExpensiveProducts()
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

  return (
    <div className="w-full py-10 bg-gradient-to-r from-amber-100 via-white to-amber-50">
      <h2 className="text-center text-2xl font-bold mb-8 text-amber-700">
        🌟 محصولات پر فروش 🌟
      </h2>
      <div className="w-[90%] mx-auto">
        <Swiper
          slidesPerView={4}
          spaceBetween={25}
          grabCursor={true}
          pagination={{ clickable: true }}
          modules={[Pagination, Navigation]}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <img
                  src={product.image || img1}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h4>
                  <p className="text-amber-600 font-bold mb-3">
                    {product.price} تومان
                  </p>
                  <button className="bg-amber-500 text-black px-4 py-2 rounded-lg shadow hover:bg-amber-600 transition-colors duration-300">
                    افزودن به سبد 🛒
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default BestSellProduct;