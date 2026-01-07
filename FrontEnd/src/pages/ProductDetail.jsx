import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getAllProduct } from '../api/GetAllProduct'
import img1 from "../assets/imgaes/slider/1.jpg"
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState('description')
    const [addedToCart, setAddedToCart] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const products = await getAllProduct()
                const foundProduct = products.find(p => p.id === parseInt(id))
                if (foundProduct) {
                    setProduct(foundProduct)
                } else {
                    // Fallback to mock data if not found
                    setProduct({
                        id: parseInt(id) || 1,
                        name: "محصول نمونه",
                        price: 150000,
                        description: "این محصول با کیفیت بالا و طراحی زیبا ساخته شده است.",
                        category: { name: "لباس" },
                        user: { full_name: "فروشنده نمونه", phone: "09123456789" },
                        image: img1
                    })
                }
            } catch (error) {
                console.error("خطا در دریافت محصول:", error)
                // Fallback to mock data
                setProduct({
                    id: parseInt(id) || 1,
                    name: "محصول نمونه",
                    price: 150000,
                    description: "این محصول با کیفیت بالا و طراحی زیبا ساخته شده است.",
                    category: { name: "لباس" },
                    user: { full_name: "فروشنده نمونه", phone: "09123456789" },
                    image: img1
                })
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const handleAddToCart = () => {
        if (product) {
            for (let i = 0; i < quantity; i++) {
                addToCart(product)
            }
            setAddedToCart(true)
            setTimeout(() => setAddedToCart(false), 2000)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
                <Header />
                <div className="flex items-center justify-center min-h-screen mt-20">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
                        <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
                <Header />
                <div className="flex items-center justify-center min-h-screen mt-20">
                    <div className="text-center">
                        <p className="text-gray-600 text-lg">محصول یافت نشد</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-xl hover:bg-pink-600 transition"
                        >
                            بازگشت به محصولات
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const images = product.images || [product.image || img1, img1, img1]
    const rating = product.rating || 4.5
    const reviews = product.reviews || 128

    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50'>
            <Header />
            <main className='pt-24 pb-12'>
                <div className='container mx-auto px-4'>
                    {/* Breadcrumb */}
                    <div className='mb-6 flex items-center gap-2 text-sm text-gray-600'>
                        <button onClick={() => navigate('/')} className='hover:text-pink-600 transition'>خانه</button>
                        <FiArrowRight className='text-xs' />
                        <button onClick={() => navigate('/products')} className='hover:text-pink-600 transition'>محصولات</button>
                        <FiArrowRight className='text-xs' />
                        <span className='text-gray-800'>{product.name}</span>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12'>
                        {/* Product Images */}
                        <div className='space-y-4'>
                            <div className='bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100'>
                                <img
                                    src={images[selectedImage]}
                                    alt={product.name}
                                    className='w-full h-[500px] object-cover'
                                />
                            </div>
                            <div className='grid grid-cols-4 gap-3'>
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`rounded-xl overflow-hidden border-2 transition-all ${
                                            selectedImage === index ? 'border-pink-500 shadow-lg' : 'border-gray-200 hover:border-pink-300'
                                        }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            className='w-full h-24 object-cover'
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className='space-y-6'>
                            <div>
                                <div className='mb-3'>
                                    {product.category && (
                                        <span className='inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold mb-2'>
                                            {product.category.name}
                                        </span>
                                    )}
                                </div>
                                <h1 className='text-4xl font-bold text-gray-800 mb-4'>{product.name}</h1>
                                <div className='flex items-center gap-4 mb-4'>
                                    <div className='flex items-center'>
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                        <span className='mr-2 text-gray-600'>({reviews} نظر)</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-4 mb-6'>
                                    <span className='text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'>
                                        {product.price ? `${product.price.toLocaleString()} تومان` : "قیمت نامشخص"}
                                    </span>
                                </div>
                                <p className='text-gray-600 leading-relaxed text-lg'>{product.description || "توضیحات محصول"}</p>
                            </div>

                            {/* Quantity Selector */}
                            <div className='bg-gray-50 rounded-xl p-4'>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>تعداد:</label>
                                <div className='flex items-center gap-4'>
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className='w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-pink-500 transition flex items-center justify-center'
                                    >
                                        -
                                    </button>
                                    <span className='text-xl font-bold w-12 text-center'>{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className='w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-pink-500 transition flex items-center justify-center'
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Seller Info */}
                            {product.user && (
                                <div className='bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-100'>
                                    <h3 className='font-semibold text-gray-800 mb-2'>اطلاعات فروشنده:</h3>
                                    <p className='text-gray-600'>👤 {product.user.full_name}</p>
                                    {product.user.phone && (
                                        <p className='text-gray-600'>📱 {product.user.phone}</p>
                                    )}
                                </div>
                            )}

                            {/* Actions */}
                            <div className='flex gap-4'>
                                <button
                                    onClick={handleAddToCart}
                                    className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                                        addedToCart
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-lg'
                                    }`}
                                >
                                    {addedToCart ? (
                                        <>
                                            <FiCheck className='text-xl' />
                                            <span>اضافه شد!</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaShoppingCart />
                                            <span>افزودن به سبد خرید</span>
                                        </>
                                    )}
                                </button>
                                <button className='p-4 border-2 border-pink-500 text-pink-600 rounded-xl hover:bg-pink-50 transition-colors duration-300'>
                                    <FaHeart className='w-6 h-6' />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info Tabs */}
                    <div className='bg-white rounded-2xl shadow-xl p-6 border border-pink-100'>
                        <div className='border-b border-gray-200 mb-6'>
                            <nav className='flex gap-8'>
                                <button
                                    onClick={() => setActiveTab('description')}
                                    className={`py-4 px-1 font-medium transition-colors ${
                                        activeTab === 'description'
                                            ? 'border-b-2 border-pink-500 text-pink-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    توضیحات
                                </button>
                                <button
                                    onClick={() => setActiveTab('reviews')}
                                    className={`py-4 px-1 font-medium transition-colors ${
                                        activeTab === 'reviews'
                                            ? 'border-b-2 border-pink-500 text-pink-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    نظرات ({reviews})
                                </button>
                                <button
                                    onClick={() => setActiveTab('faq')}
                                    className={`py-4 px-1 font-medium transition-colors ${
                                        activeTab === 'faq'
                                            ? 'border-b-2 border-pink-500 text-pink-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    سوالات متداول
                                </button>
                            </nav>
                        </div>
                        <div className='py-6'>
                            {activeTab === 'description' && (
                                <p className='text-gray-600 leading-relaxed text-lg'>
                                    {product.description || "این محصول با بالاترین کیفیت ساخته شده و تمامی استانداردهای بین‌المللی را رعایت می‌کند. ما به کیفیت محصولات خود افتخار می‌کنیم و گارانتی کامل برای رضایت مشتریان ارائه می‌دهیم."}
                                </p>
                            )}
                            {activeTab === 'reviews' && (
                                <div className='text-center py-12 text-gray-500'>
                                    <p>نظرات کاربران به زودی اضافه خواهد شد</p>
                                </div>
                            )}
                            {activeTab === 'faq' && (
                                <div className='space-y-4'>
                                    <div className='bg-gray-50 rounded-xl p-4'>
                                        <h4 className='font-semibold mb-2'>آیا این محصول گارانتی دارد؟</h4>
                                        <p className='text-gray-600'>بله، تمامی محصولات ما دارای گارانتی معتبر هستند.</p>
                                    </div>
                                    <div className='bg-gray-50 rounded-xl p-4'>
                                        <h4 className='font-semibold mb-2'>زمان ارسال چقدر است؟</h4>
                                        <p className='text-gray-600'>ارسال در تهران 24 ساعت و در شهرستان‌ها 2-3 روز کاری است.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ProductDetail