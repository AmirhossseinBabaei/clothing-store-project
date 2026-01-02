import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper/modules";

function RegisterPage() {
    const [activeForm, setActiveForm] = useState("user");

    return (
        <div className='w-full'>
            <div className="mx-auto h-screen w-[100vw]">

                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-100">
                    <div className="w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl flex overflow-hidden">
                        {/* بخش اسلایدر */}
                        <div className="w-1/2 bg-gradient-to-tr from-amber-200 to-amber-400 flex items-center justify-center">
                            <Swiper
                                effect={"coverflow"}
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={"auto"}
                                coverflowEffect={{
                                    rotate: 20,
                                    stretch: 0,
                                    depth: 150,
                                    modifier: 1,
                                    slideShadows: true,
                                }}
                                modules={[EffectCoverflow]}
                                className="w-[80%] h-[80%]"
                                onSlideChange={(swiper) => {
                                    setActiveForm(swiper.activeIndex === 0 ? "user" : "seller");
                                }}
                            >
                                <SwiperSlide className="bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center p-10 cursor-pointer">
                                    <h2 className="text-2xl font-bold text-amber-700 mb-4">
                                        ثبت‌نام کاربران
                                    </h2>
                                    <p className="text-gray-600 text-center">
                                        برای خرید و استفاده از خدمات سایت، حساب کاربری بسازید.
                                    </p>
                                </SwiperSlide>
                                <SwiperSlide className="bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center p-10 cursor-pointer">
                                    <h2 className="text-2xl font-bold text-amber-700 mb-4">
                                        ثبت‌نام فروشندگان
                                    </h2>
                                    <p className="text-gray-600 text-center">
                                        اگر قصد فروش محصولات دارید، حساب فروشنده ایجاد کنید.
                                    </p>
                                </SwiperSlide>
                            </Swiper>
                        </div>

                        {/* بخش فرم */}
                        <div className="w-1/2 p-10 flex items-center justify-center">
                            {activeForm === "user" ? (
                                <form className="w-full max-w-md space-y-6">
                                    <h2 className="text-2xl font-bold text-center text-amber-700 mb-6">
                                        فرم ثبت‌نام کاربران
                                    </h2>
                                    <input
                                        type="text"
                                        placeholder="نام کامل"
                                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500"
                                    />
                                    <input
                                        type="email"
                                        placeholder="ایمیل"
                                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500"
                                    />
                                    <input
                                        type="password"
                                        placeholder="رمز عبور"
                                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl hover:from-amber-600 hover:to-amber-700 transition"
                                    >
                                        ثبت‌نام
                                    </button>
                                </form>
                            ) : (
                                <form className="w-full max-w-md space-y-6">
                                    <h2 className="text-2xl font-bold text-center text-amber-700 mb-6">
                                        فرم ثبت‌نام فروشندگان
                                    </h2>
                                    <input
                                        type="text"
                                        placeholder="نام فروشگاه"
                                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500"
                                    />
                                    <input
                                        type="email"
                                        placeholder="ایمیل فروشگاه"
                                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500"
                                    />
                                    <input
                                        type="password"
                                        placeholder="رمز عبور"
                                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="شماره تماس"
                                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl hover:from-amber-600 hover:to-amber-700 transition"
                                    >
                                        ثبت‌نام فروشنده
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default RegisterPage;
