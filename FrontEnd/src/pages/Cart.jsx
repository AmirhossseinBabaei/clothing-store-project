import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi'
import img1 from "../assets/imgaes/slider/1.jpg"

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-20 mt-20">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto">
            <FiShoppingCart className="mx-auto text-6xl text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">سبد خرید شما خالی است</h2>
            <p className="text-gray-600 mb-8">محصولات مورد علاقه خود را به سبد خرید اضافه کنید</p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-semibold"
            >
              مشاهده محصولات
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white rounded-lg transition"
          >
            <FiArrowLeft className="text-2xl text-gray-700" />
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            سبد خرید
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* لیست محصولات */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100 flex flex-col md:flex-row gap-6"
              >
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <img
                    src={item.image || item.img || img1}
                    alt={item.name}
                    className="w-full md:w-32 h-32 object-cover rounded-xl"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-pink-600 transition">
                      {item.name}
                    </h3>
                  </Link>
                  {item.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        {item.price ? `${(item.price * item.quantity).toLocaleString()} تومان` : 'قیمت نامشخص'}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-sm text-gray-500">
                          ({item.price?.toLocaleString()} × {item.quantity})
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <FiTrash2 className="text-xl" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-sm text-gray-600">تعداد:</span>
                    <div className="flex items-center gap-2 border-2 border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition"
                      >
                        <FiMinus />
                      </button>
                      <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="w-full md:w-auto px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-semibold"
            >
              پاک کردن سبد خرید
            </button>
          </div>

          {/* خلاصه سفارش */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-pink-100 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">خلاصه سفارش</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>تعداد محصولات:</span>
                  <span className="font-semibold">{cartItems.reduce((sum, item) => sum + item.quantity, 0)} عدد</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>هزینه ارسال:</span>
                  <span className="font-semibold text-green-600">رایگان</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>جمع کل:</span>
                    <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      {getCartTotal().toLocaleString()} تومان
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  alert('در حال انتقال به صفحه پرداخت...')
                  // در اینجا می‌توانید به صفحه پرداخت هدایت کنید
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg mb-4"
              >
                ادامه خرید
              </button>

              <Link
                to="/products"
                className="block w-full text-center text-pink-600 hover:text-pink-700 font-semibold py-2"
              >
                ادامه خرید
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart



