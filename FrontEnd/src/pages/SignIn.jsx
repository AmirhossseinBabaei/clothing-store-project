import React from 'react'

function login() {
  return (
    <>
      <div className='w-full'>
        <div className="mx-auto h-screen w-[100vw]">
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-white to-amber-200">
            {/* کارت لاگین */}
            <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8">
              {/* عنوان */}
              <h2 className="text-3xl font-bold text-center text-amber-700 mb-6">
                ورود به حساب کاربری
              </h2>

              {/* فرم */}
              <form className="space-y-6">
                {/* ایمیل */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    required
                  />
                </div>

                {/* رمز عبور */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    رمز عبور
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    required
                  />
                </div>

                {/* دکمه ورود */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-amber-600 hover:to-amber-700 transition-colors duration-300"
                >
                  ورود
                </button>
              </form>

              {/* لینک‌های پایین */}
              <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                  حساب کاربری نداری؟{" "}
                  <a href="/register" className="text-amber-600 font-semibold hover:underline">
                    ثبت‌نام کن
                  </a>
                </p>
                <p className="mt-2">
                  رمز عبور رو فراموش کردی؟{" "}
                  <a href="/reset" className="text-amber-600 font-semibold hover:underline">
                    بازیابی رمز
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default login