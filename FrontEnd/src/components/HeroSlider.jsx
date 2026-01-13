import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img1 from "../assets/imgaes/slider/1.jpg";
import img2 from "../assets/imgaes/slider/2.jpg";
import img3 from "../assets/imgaes/slider/3.jpg";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { GetAllSliders } from "../api/GetAllSliders";

function Slider() {

      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    
      useEffect(() => {
        GetAllSliders()
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
        <>
            <div className="w-full">
                <Swiper 
                    modules={[Navigation, Pagination, Autoplay]} 
                    spaceBetween={30} 
                    slidesPerView={1} 
                    navigation 
                    pagination={{ clickable: true }} 
                    autoplay={{ delay: 4000, disableOnInteraction: false }} 
                    loop={true} 
                    className="rounded-2xl shadow-2xl overflow-hidden" 
                > 
                {products.map((product)=>(
      <SwiperSlide> 
                        <div className="relative">
                            <img src={ product.image_src || img1} alt={product.image_alt || 'There is no alt'} className="w-full h-[600px] object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                                <div className="text-white px-12">
                                    <h2 className="text-5xl font-bold mb-4">{ product.title }</h2>
                                    <p className="text-xl mb-6">{ product.descrption }</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide> 
                ))}
  
                </Swiper> 
            </div>
        </>
    )
}

export default Slider