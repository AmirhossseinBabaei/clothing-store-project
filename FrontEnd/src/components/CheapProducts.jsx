import React from "react";
import "../styles/public.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

import img1 from "../assets/imgaes/slider/1.jpg";

function CheapProducts() {
  const products = [
    { id: 1, name: "محصول ۱", price: "120,000", img: img1 },
    { id: 2, name: "محصول ۲", price: "95,000", img: img1 },
    { id: 3, name: "محصول ۳", price: "150,000", img: img1 },
    { id: 4, name: "محصول ۴", price: "80,000", img: img1 },
    { id: 5, name: "محصول ۵", price: "110,000", img: img1 },
    { id: 6, name: "محصول ۶", price: "130,000", img: img1 },
    { id: 7, name: "محصول ۷", price: "70,000", img: img1 },
    { id: 8, name: "محصول ۸", price: "99,000", img: img1 },
  ];

  return (
    <div className="w-full py-10 bg-gradient-to-r from-amber-100 via-white to-amber-50">
      <h2 className="text-center text-2xl font-bold mb-8 text-amber-700">
        🌟 ارزان ترین محصولات 🌟
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
                  src={product.img}
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

export default CheapProducts;