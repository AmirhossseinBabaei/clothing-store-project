import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FiLogOut, FiUser, FiShoppingBag, FiHeart, FiSettings } from 'react-icons/fi'

function Dashboard() {
  const { user, token, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('posts')

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/sign-in')
      return
    }

    // دریافت لیست پست‌ها با توکن
    fetchPosts()
  }, [token, navigate, isAuthenticated])

  const fetchPosts = async () => {
    setLoading(true)
    setError('')
    try {
      // این endpoint باید از backend شما باشد
      // برای مثال: http://127.0.0.1:8000/api/v1/posts
      const response = await axios.get('http://127.0.0.1:8000/api/v1/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data && response.data.data) {
        setPosts(response.data.data)
      } else if (Array.isArray(response.data)) {
        setPosts(response.data)
      } else {
        setPosts([])
      }
    } catch (error) {
      console.error('خطا در دریافت پست‌ها:', error)
      if (error.response?.status === 401) {
        setError('احراز هویت نامعتبر است. لطفا دوباره وارد شوید.')
        logout()
      } else {
        setError('خطا در دریافت پست‌ها. ممکن است endpoint موجود نباشد.')
        // برای تست، یک لیست نمونه نمایش می‌دهیم
        setPosts([
          { id: 1, title: 'پست نمونه 1', content: 'این یک پست نمونه است', created_at: '2024-01-01' },
          { id: 2, title: 'پست نمونه 2', content: 'این یک پست نمونه دیگر است', created_at: '2024-01-02' },
        ])
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!isAuthenticated()) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        {/* هدر داشبورد */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  خوش آمدید، {user?.full_name || user?.email || 'کاربر'}
                </h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition-colors"
            >
              <FiLogOut /> خروج
            </button>
          </div>
        </div>

        {/* تب‌ها */}
        <div className="bg-white rounded-2xl shadow-lg mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'posts'
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              <FiShoppingBag className="inline ml-2" />
              لیست پست‌ها
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'profile'
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              <FiUser className="inline ml-2" />
              پروفایل
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'settings'
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              <FiSettings className="inline ml-2" />
              تنظیمات
            </button>
          </div>
        </div>

        {/* محتوای تب‌ها */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {activeTab === 'posts' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">لیست پست‌ها</h2>
                <button
                  onClick={fetchPosts}
                  className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition-colors"
                >
                  بروزرسانی
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
                  <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
                </div>
              ) : error ? (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-xl mb-4">
                  {error}
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <FiShoppingBag className="mx-auto text-6xl text-gray-300 mb-4" />
                  <p className="text-gray-600 text-lg">پستی یافت نشد</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-pink-100"
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title || 'بدون عنوان'}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.content || post.description || 'بدون محتوا'}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{post.created_at || 'تاریخ نامشخص'}</span>
                        <button className="text-pink-600 hover:text-pink-700 font-semibold">
                          مشاهده بیشتر
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">اطلاعات پروفایل</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">نام کامل</label>
                  <p className="text-gray-800">{user?.full_name || 'تعریف نشده'}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ایمیل</label>
                  <p className="text-gray-800">{user?.email || 'تعریف نشده'}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">شماره تماس</label>
                  <p className="text-gray-800">{user?.phone || 'تعریف نشده'}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">تنظیمات</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-600">تنظیمات در نسخه بعدی اضافه خواهد شد</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard

