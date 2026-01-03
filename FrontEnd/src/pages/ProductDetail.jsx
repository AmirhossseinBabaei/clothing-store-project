import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import img1 from "../assets/imgaes/slider/1.jpg"
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa'

function ProductDetail() {
    const { id } = useParams()

    // Mock product data - in real app, fetch from API
    const product = {
        id: id || 1,
        name: "محصول نمونه",
        price: "150,000",
        originalPrice: "200,000",
        description: "این محصول با کیفیت بالا و طراحی زیبا ساخته شده است. مناسب برای استفاده روزمره و دارای گارانتی معتبر.",
        features: [
            "کیفیت بالا",
            "طراحی زیبا",
            "گارانتی معتبر",
            "ارسال رایگان"
        ],
        images: [img1, img1, img1],
        rating: 4.5,
        reviews: 128,
        inStock: true
    }

    return (
        <>
            <div className='w-full min-h-screen'>
                <nav className='header'>
                    <Header />
                </nav>
                <main className='pt-16'>
                    <div className='container mx-auto px-4 py-8'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                            {/* Product Images */}
                            <div className='space-y-4'>
                                <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className='w-full h-96 object-cover'
                                    />
                                </div>
                                <div className='grid grid-cols-3 gap-4'>
                                    {product.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            className='w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity'
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className='space-y-6'>
                                <div>
                                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>{product.name}</h1>
                                    <div className='flex items-center space-x-4 mb-4'>
                                        <div className='flex items-center'>
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                />
                                            ))}
                                            <span className='mr-2 text-gray-600'>({product.reviews} نظر)</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center space-x-4 mb-4'>
                                        <span className='text-2xl font-bold text-amber-600'>{product.price} تومان</span>
                                        <span className='text-lg text-gray-500 line-through'>{product.originalPrice} تومان</span>
                                        <span className='bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm'>25% تخفیف</span>
                                    </div>
                                    <p className='text-gray-600 leading-relaxed'>{product.description}</p>
                                </div>

                                {/* Features */}
                                <div>
                                    <h3 className='text-lg font-semibold mb-3'>ویژگی‌ها:</h3>
                                    <ul className='space-y-2'>
                                        {product.features.map((feature, index) => (
                                            <li key={index} className='flex items-center text-gray-600'>
                                                <span className='w-2 h-2 bg-amber-500 rounded-full ml-3'></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Stock Status */}
                                <div className={`p-3 rounded-lg ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {product.inStock ? '✅ موجود در انبار' : '❌ ناموجود'}
                                </div>

                                {/* Actions */}
                                <div className='flex space-x-4'>
                                    <button className='flex-1 bg-amber-500 text-white py-3 px-6 rounded-lg hover:bg-amber-600 transition-colors duration-300 flex items-center justify-center space-x-2'>
                                        <FaShoppingCart />
                                        <span>افزودن به سبد خرید</span>
                                    </button>
                                    <button className='p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300'>
                                        <FaHeart className='w-6 h-6 text-gray-600' />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info Tabs */}
                        <div className='mt-12'>
                            <div className='border-b border-gray-200'>
                                <nav className='flex space-x-8'>
                                    <button className='py-4 px-1 border-b-2 border-amber-500 text-amber-600 font-medium'>توضیحات</button>
                                    <button className='py-4 px-1 text-gray-500 hover:text-gray-700'>نظرات ({product.reviews})</button>
                                    <button className='py-4 px-1 text-gray-500 hover:text-gray-700'>سوالات متداول</button>
                                </nav>
                            </div>
                            <div className='py-6'>
                                <p className='text-gray-600 leading-relaxed'>
                                    این محصول با بالاترین کیفیت ساخته شده و تمامی استانداردهای بین‌المللی را رعایت می‌کند.
                                    ما به کیفیت محصولات خود افتخار می‌کنیم و گارانتی کامل برای رضایت مشتریان ارائه می‌دهیم.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    )
}

export default ProductDetail