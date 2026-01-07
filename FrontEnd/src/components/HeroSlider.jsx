import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img1 from "../assets/imgaes/slider/1.jpg";
import img2 from "../assets/imgaes/slider/2.jpg";
import img3 from "../assets/imgaes/slider/3.jpg";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

function Slider() {
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
                    <SwiperSlide> 
                        <div className="relative">
                            <img src={img1} alt="Slide 1" className="w-full h-[600px] object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                                <div className="text-white px-12">
                                    <h2 className="text-5xl font-bold mb-4">فروشگاه لباس شیک</h2>
                                    <p className="text-xl mb-6">بهترین و شیک‌ترین لباس‌ها را از ما بخرید</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide> 
                    <SwiperSlide> 
                        <div className="relative">
                            <img src={img2} alt="Slide 2" className="w-full h-[600px] object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                                <div className="text-white px-12">
                                    <h2 className="text-5xl font-bold mb-4">مد روز</h2>
                                    <p className="text-xl mb-6">آخرین ترندهای مد را دنبال کنید</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide> 
                    <SwiperSlide> 
                        <div className="relative">
                            <img src={img3} alt="Slide 3" className="w-full h-[600px] object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                                <div className="text-white px-12">
                                    <h2 className="text-5xl font-bold mb-4">تخفیف‌های ویژه</h2>
                                    <p className="text-xl mb-6">فرصت را از دست ندهید</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide> 
                </Swiper> 
            </div>
        </>
    )
}

export default Slider