import React from "react";

function ContactSection() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent tracking-tight">ارتباط با ما</h1>
          <p className="mt-3 text-gray-600 text-lg">
            هر سوال، پیشنهاد یا مشکلی داشتی با ما در میان بذار. پاسخ‌گویی سریع و دقیق.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-pink-100">
            <form
              className="p-8 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                alert("فرم ارسال شد (دموی فرانت).");
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثلاً: علی رضایی"
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@mail.com"
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    موضوع پیام
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثلاً: پیگیری سفارش"
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    دسته‌بندی
                  </label>
                  <select
                    defaultValue=""
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  >
                    <option value="" disabled>انتخاب کنید</option>
                    <option value="support">پشتیبانی</option>
                    <option value="orders">سفارش‌ها</option>
                    <option value="billing">مالی و فاکتور</option>
                    <option value="suggestion">پیشنهادات</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  شماره تماس (اختیاری)
                </label>
                <input
                  type="tel"
                  placeholder="09xxxxxxxxx"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  متن پیام
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="جزئیات مشکلت یا درخواستت رو کامل بنویس..."
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-y"
                />
              </div>

              {/* رضایت و ارسال */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <label className="flex items-center gap-3 text-sm text-gray-700 select-none">
                  <input type="checkbox" className="accent-pink-600 w-4 h-4" required />
                  تایید می‌کنم اطلاعات بالا صحیح است و با ارتباط گرفتن شما موافقم.
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold tracking-tight hover:from-pink-600 hover:to-purple-700 shadow-lg transition"
                >
                  ارسال پیام
                </button>
              </div>
            </form>
          </div>

          {/* پنل اطلاعات تماس (بدون آیکن) */}
          <aside className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-pink-100 p-8 flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">چطور در تماس باشیم؟</h2>
              <p className="mt-2 text-gray-600 leading-7">
                تیم پشتیبانی همه روزه آماده پاسخ‌گویی است. معمولاً ظرف ۲۴ ساعت کاری پاسخ می‌دهیم.
              </p>
            </div>

            <div className="space-y-3 text-gray-800">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 border border-pink-100">
                <p className="font-semibold text-pink-700">📧 ایمیل پشتیبانی</p>
                <p className="text-gray-600 mt-1">support@shop.com</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 border border-pink-100">
                <p className="font-semibold text-pink-700">📱 شماره تماس</p>
                <p className="text-gray-600 mt-1">021-12345678 | 0935-0000000</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 border border-pink-100">
                <p className="font-semibold text-pink-700">🕐 ساعات کاری</p>
                <p className="text-gray-600 mt-1">شنبه تا پنجشنبه، ۹ تا ۱۸</p>
              </div>
            </div>

            <div className="mt-2 text-sm text-gray-600 leading-7">
              پیام‌های فوری مثل مشکل پرداخت یا لغو سفارش را حتماً با عنوان مناسب ثبت کن تا سریع‌تر رسیدگی شود.
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;