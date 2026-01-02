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
            <div className="w-full bg-emerald-600">
                <Swiper modules={[Navigation, Pagination, Autoplay]} spaceBetween={30} slidesPerView={1} navigation pagination={{ clickable: true }} autoplay={{ delay: 3000 }} loop={true} className="rounded-lg shadow-lg" > 
                    <SwiperSlide> <img src={img1} alt="Slide 1" className="w-full h-[500px] object-cover rounded-lg" /> </SwiperSlide> <SwiperSlide> 
                        <img src={img2} alt="Slide 2" className="w-full h-[500px] object-cover rounded-lg" /> </SwiperSlide> <SwiperSlide> 
                            <img src={img3} alt="Slide 3" className="w-full h-[500px] object-cover rounded-lg" /> </SwiperSlide> </Swiper> 
                            </div>
        </>
    )
}

export default Slider