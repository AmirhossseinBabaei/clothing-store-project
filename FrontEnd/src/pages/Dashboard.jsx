import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { 
  FiLogOut, 
  FiUser, 
  FiShoppingBag, 
  FiSettings, 
  FiPackage,
  FiImage,
  FiUsers,
  FiMail,
  FiShoppingCart,
  FiTag,
  FiMenu,
  FiX,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye
} from 'react-icons/fi'

function Dashboard() {
  const { user, token, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/sign-in')
      return
    }
  }, [token, navigate, isAuthenticated])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!isAuthenticated()) {
    return null
  }

  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: FiShoppingBag },
    { id: 'products', label: 'مدیریت محصولات', icon: FiPackage },
    { id: 'sliders', label: 'مدیریت اسلایدرها', icon: FiImage },
    { id: 'users', label: 'مدیریت کاربران', icon: FiUsers },
    { id: 'contacts', label: 'درخواست‌های تماس', icon: FiMail },
    { id: 'orders', label: 'سفارشات', icon: FiShoppingCart },
    { id: 'categories', label: 'دسته‌بندی‌ها', icon: FiTag },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full bg-gray-800 border-l border-gray-700 transition-all duration-300 z-40 ${
        sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              پنل مدیریت
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="text-xl" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition"
            >
              <FiLogOut className="text-xl" />
              <span>خروج</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'mr-64' : 'mr-0'}`}>
        {/* Top Bar */}
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <FiMenu className="text-2xl" />
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                {user?.full_name?.charAt(0) || user?.phone?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="text-sm font-semibold">{user?.full_name || user?.phone || 'کاربر'}</p>
                <p className="text-xs text-gray-400">{user?.phone || ''}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeSection === 'dashboard' && <DashboardOverview />}
          {activeSection === 'products' && <ProductsManagement />}
          {activeSection === 'sliders' && <SlidersManagement />}
          {activeSection === 'users' && <UsersManagement />}
          {activeSection === 'contacts' && <ContactsManagement />}
          {activeSection === 'orders' && <OrdersManagement />}
          {activeSection === 'categories' && <CategoriesManagement />}
        </div>
      </div>
    </div>
  )
}

// Dashboard Overview Component
function DashboardOverview() {
  const stats = [
    { label: 'کل محصولات', value: '0', icon: FiPackage, color: 'from-blue-500 to-blue-600' },
    { label: 'کل کاربران', value: '0', icon: FiUsers, color: 'from-green-500 to-green-600' },
    { label: 'سفارشات', value: '0', icon: FiShoppingCart, color: 'from-yellow-500 to-yellow-600' },
    { label: 'درخواست‌های تماس', value: '0', icon: FiMail, color: 'from-purple-500 to-purple-600' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">داشبورد</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <Icon className="text-white text-xl" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          )
        })}
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold mb-4">خوش آمدید به پنل مدیریت</h2>
        <p className="text-gray-400">
          از منوی سمت راست بخش مورد نظر خود را انتخاب کنید.
        </p>
      </div>
    </div>
  )
}

// Products Management Component
function ProductsManagement() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    image: ''
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      // TODO: Replace with actual API endpoint
      // const response = await axios.get('http://127.0.0.1:8000/api/v1/admin/products')
      // setProducts(response.data.data || [])
      
      // Demo data
      setProducts([
        { id: 1, name: 'محصول 1', price: 100000, category: { name: 'لباس' }, created_at: '2024-01-01' },
        { id: 2, name: 'محصول 2', price: 200000, category: { name: 'کفش' }, created_at: '2024-01-02' },
      ])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingProduct) {
        // TODO: Update API call
        // await axios.put(`http://127.0.0.1:8000/api/v1/admin/products/${editingProduct.id}`, formData)
      } else {
        // TODO: Create API call
        // await axios.post('http://127.0.0.1:8000/api/v1/admin/products', formData)
      }
      setShowModal(false)
      setEditingProduct(null)
      fetchProducts()
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('آیا مطمئن هستید؟')) return
    try {
      // TODO: Delete API call
      // await axios.delete(`http://127.0.0.1:8000/api/v1/admin/products/${id}`)
      fetchProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">مدیریت محصولات</h1>
        <button
          onClick={() => {
            setEditingProduct(null)
            setFormData({ name: '', description: '', price: '', category_id: '', image: '' })
            setShowModal(true)
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-2 rounded-lg hover:from-pink-700 hover:to-purple-700 transition"
        >
          <FiPlus /> افزودن محصول
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold">شناسه</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">نام</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">قیمت</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">دسته‌بندی</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">تاریخ</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                    در حال بارگذاری...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                    محصولی یافت نشد
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-700/50 transition">
                    <td className="px-6 py-4">{product.id}</td>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.price?.toLocaleString()} تومان</td>
                    <td className="px-6 py-4">{product.category?.name || '-'}</td>
                    <td className="px-6 py-4">{product.created_at || '-'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(product)
                            setFormData({
                              name: product.name || '',
                              description: product.description || '',
                              price: product.price || '',
                              category_id: product.category_id || '',
                              image: product.image || ''
                            })
                            setShowModal(true)
                          }}
                          className="p-2 text-blue-400 hover:bg-blue-900/20 rounded transition"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-400 hover:bg-red-900/20 rounded transition"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingProduct ? 'ویرایش محصول' : 'افزودن محصول جدید'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">نام محصول</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">توضیحات</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows="4"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">قیمت</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">دسته‌بندی</label>
                  <input
                    type="text"
                    value={formData.category_id}
                    onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">آدرس تصویر</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-2 rounded-lg hover:from-pink-700 hover:to-purple-700 transition"
                >
                  {editingProduct ? 'ذخیره تغییرات' : 'افزودن'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// Sliders Management Component
function SlidersManagement() {
  const [sliders, setSliders] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ title: '', image: '', link: '', order: '' })

  useEffect(() => {
    // TODO: Fetch sliders from API
    setSliders([
      { id: 1, title: 'اسلایدر 1', image: '/slider1.jpg', order: 1 },
      { id: 2, title: 'اسلایدر 2', image: '/slider2.jpg', order: 2 },
    ])
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">مدیریت اسلایدرها</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-2 rounded-lg hover:from-pink-700 hover:to-purple-700 transition"
        >
          <FiPlus /> افزودن اسلایدر
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sliders.map((slider) => (
          <div key={slider.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="aspect-video bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
              <FiImage className="text-4xl text-gray-500" />
            </div>
            <h3 className="font-semibold mb-2">{slider.title}</h3>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                <FiEdit /> ویرایش
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition">
                <FiTrash2 /> حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Users Management Component
function UsersManagement() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // TODO: Fetch users from API
    setUsers([
      { id: 1, phone: '09123456789', full_name: 'کاربر 1', created_at: '2024-01-01' },
      { id: 2, phone: '09123456790', full_name: 'کاربر 2', created_at: '2024-01-02' },
    ])
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">مدیریت کاربران</h1>
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold">شناسه</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">شماره تلفن</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">نام</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">تاریخ ثبت</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.full_name || '-'}</td>
                  <td className="px-6 py-4">{user.created_at}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-400 hover:bg-blue-900/20 rounded transition">
                        <FiEye />
                      </button>
                      <button className="p-2 text-red-400 hover:bg-red-900/20 rounded transition">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Contacts Management Component
function ContactsManagement() {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    // TODO: Fetch contacts from API
    setContacts([
      { id: 1, name: 'علی رضایی', email: 'ali@example.com', subject: 'سوال', message: '...', created_at: '2024-01-01' },
    ])
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">درخواست‌های تماس با ما</h1>
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold">نام</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">ایمیل</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">موضوع</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">تاریخ</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4">{contact.name}</td>
                  <td className="px-6 py-4">{contact.email}</td>
                  <td className="px-6 py-4">{contact.subject}</td>
                  <td className="px-6 py-4">{contact.created_at}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-blue-400 hover:bg-blue-900/20 rounded transition">
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Orders Management Component
function OrdersManagement() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    // TODO: Fetch orders from API
    setOrders([
      { id: 1, user: '09123456789', total: 500000, status: 'pending', created_at: '2024-01-01' },
    ])
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">سفارشات</h1>
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold">شناسه</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">کاربر</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">مبلغ</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">وضعیت</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">تاریخ</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{order.user}</td>
                  <td className="px-6 py-4">{order.total?.toLocaleString()} تومان</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      order.status === 'pending' ? 'bg-yellow-900/50 text-yellow-400' :
                      order.status === 'completed' ? 'bg-green-900/50 text-green-400' :
                      'bg-red-900/50 text-red-400'
                    }`}>
                      {order.status === 'pending' ? 'در انتظار' : order.status === 'completed' ? 'تکمیل شده' : 'لغو شده'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{order.created_at}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-blue-400 hover:bg-blue-900/20 rounded transition">
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Categories Management Component
function CategoriesManagement() {
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', description: '' })

  useEffect(() => {
    // TODO: Fetch categories from API
    setCategories([
      { id: 1, name: 'لباس', description: '...', created_at: '2024-01-01' },
      { id: 2, name: 'کفش', description: '...', created_at: '2024-01-02' },
    ])
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">مدیریت دسته‌بندی‌ها</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-2 rounded-lg hover:from-pink-700 hover:to-purple-700 transition"
        >
          <FiPlus /> افزودن دسته‌بندی
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold">شناسه</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">نام</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">توضیحات</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">تاریخ</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4">{category.id}</td>
                  <td className="px-6 py-4">{category.name}</td>
                  <td className="px-6 py-4">{category.description || '-'}</td>
                  <td className="px-6 py-4">{category.created_at}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-400 hover:bg-blue-900/20 rounded transition">
                        <FiEdit />
                      </button>
                      <button className="p-2 text-red-400 hover:bg-red-900/20 rounded transition">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
