import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/public.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import {GetFourCheapProducts} from "../api/GetFourCheapProducts";

import img1 from "../assets/imgaes/slider/1.jpg";

function CheapProducts() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetFourCheapProducts()
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
    <div className="w-full py-16 bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <h2 className="text-center text-3xl font-bold mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        💰 ارزان‌ترین محصولات 💰
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
                  <Link
                    to={`/product/${product.id}`}
                    className="block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:from-pink-600 hover:to-purple-700 transition-all duration-300 text-center"
                  >
                    مشاهده محصول
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default CheapProducts;