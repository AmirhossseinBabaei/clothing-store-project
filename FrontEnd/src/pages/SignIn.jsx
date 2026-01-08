import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function SignIn() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!phone || !password) {
      setError('لطفا تمام فیلدها را پر کنید')
      return
    }

    const result = await login(phone, password)
    
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error || 'خطا در ورود')
    }
  }

  return (
    <>
      <div className='w-full'>
        <div className="mx-auto h-screen w-[100vw]">
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-100">
            {/* کارت لاگین */}
            <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-pink-200">
              {/* عنوان */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-pink-700 mb-2">
                  ورود به حساب کاربری
                </h2>
                <p className="text-gray-600 text-sm">خوش آمدید به فروشگاه لباس شیک</p>
              </div>

              {/* نمایش خطا */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm text-center">
                  {error}
                </div>
              )}

              {/* فرم */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* شماره تلفن */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    شماره تلفن
                  </label>
                  <input
                    type="tel"
                    placeholder="09123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                    required
                    disabled={loading}
                    pattern="[0-9]{11}"
                    maxLength="11"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                    required
                    disabled={loading}
                  />
                </div>

                {/* دکمه ورود */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'در حال ورود...' : 'ورود'}
                </button>
              </form>

              {/* لینک‌های پایین */}
              <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                  حساب کاربری نداری؟{' '}
                  <Link to="/sign-up" className="text-pink-600 font-semibold hover:underline">
                    ثبت‌نام کن
                  </Link>
                </p>
                <p className="mt-2">
                  رمز عبور رو فراموش کردی؟{' '}
                  <a href="/reset" className="text-pink-600 font-semibold hover:underline">
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

export default SignIn