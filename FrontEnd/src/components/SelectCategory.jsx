import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { GetAllCategories } from "../api/GetAllCategories";

import img1 from "../assets/imgaes/slider/3.jpg";

function SelectCategory() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
     GetAllCategories()
      .then((data) => {
        setCategories(data);
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
        🏷️ دسته‌بندی‌ها
      </h2>
      <div className="w-[700px] mx-auto"> 
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          {categories.map((cat) => (
            <SwiperSlide
              key={cat.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <a href={cat.link} className="block">
                <img
                  src={img1}
                  alt={cat.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {cat.name}
                  </h3>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SelectCategory;