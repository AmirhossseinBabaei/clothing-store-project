import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SignUp() {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
    });
    const [error, setError] = useState("");
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // اعتبارسنجی
        if (!formData.full_name || !formData.email || !formData.password || !formData.password_confirmation) {
            setError("لطفا تمام فیلدهای الزامی را پر کنید");
            return;
        }

        if (formData.password !== formData.password_confirmation) {
            setError("رمز عبور و تکرار آن مطابقت ندارند");
            return;
        }

        if (formData.password.length < 6) {
            setError("رمز عبور باید حداقل 6 کاراکتر باشد");
            return;
        }

        const result = await register(formData);

        if (result.success) {
            navigate("/dashboard");
        } else {
            setError(result.error || "خطا در ثبت‌نام");
        }
    };

    return (
        <div className="w-full">
            <div className="mx-auto h-screen w-[100vw]">
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-100 py-12 px-4">
                    <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-pink-200">
                        {/* عنوان */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-pink-700 mb-2">
                                ثبت‌نام در فروشگاه لباس شیک
                            </h2>
                            <p className="text-gray-600 text-sm">
                                برای خرید و استفاده از خدمات سایت، حساب کاربری بسازید
                            </p>
                        </div>

                        {/* نمایش خطا */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm text-center">
                                {error}
                            </div>
                        )}

                        {/* فرم */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* نام کامل */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        نام کامل <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        placeholder="نام و نام خانوادگی"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                {/* ایمیل */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        ایمیل <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="example@mail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* رمز عبور */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        رمز عبور <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="حداقل 6 کاراکتر"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                {/* تکرار رمز عبور */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        تکرار رمز عبور <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        placeholder="تکرار رمز عبور"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* شماره تماس */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    شماره تماس
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="09123456789"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                                    disabled={loading}
                                />
                            </div>

                            {/* دکمه ثبت‌نام */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                            >
                                {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
                            </button>
                        </form>

                        {/* لینک‌های پایین */}
                        <div className="mt-6 text-center text-sm text-gray-600">
                            <p>
                                قبلا ثبت‌نام کرده‌ای؟{" "}
                                <Link to="/sign-in" className="text-pink-600 font-semibold hover:underline">
                                    ورود به حساب کاربری
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
