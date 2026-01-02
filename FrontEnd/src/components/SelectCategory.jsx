import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

import img1 from "../assets/imgaes/slider/3.jpg";

function SelectCategory() {
  const categories = [
    { id: 1, title: "موبایل", link: "/category/mobile" },
    { id: 2, title: "لپ‌تاپ", link: "/category/laptop" },
    { id: 3, title: "مد و پوشاک", link: "/category/fashion" },
    { id: 4, title: "خانه و آشپزخانه", link: "/category/home" },
    { id: 5, title: "کتاب", link: "/category/book" },
    { id: 6, title: "ورزش", link: "/category/sport" },
    { id: 7, title: "زیبایی", link: "/category/beauty" },
    { id: 8, title: "ابزار", link: "/category/tools" },
  ];

  return (
    <div className="w-full py-10 bg-gray-50">
      <h2 className="text-center text-2xl font-bold mb-8 text-amber-700">
        دسته‌بندی‌ها
      </h2>
      <div className="w-[300px] mx-auto"> 
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
                  alt={cat.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {cat.title}
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