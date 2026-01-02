import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

import img1 from "../assets/imgaes/slider/3.jpg"; // فقط یک عکس برای همه دسته‌ها

function CategoriesSection() {
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
      <Swiper
        slidesPerView={4}
        spaceBetween={25}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="w-[90%] mx-auto"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <a
              href={cat.link}
              className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <img
                src={img1}
                alt={cat.title}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
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
  );
}

export default CategoriesSection;