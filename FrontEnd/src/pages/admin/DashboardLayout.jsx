import React, { useState } from 'react'
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  FiHome,
  FiPackage,
  FiImage,
  FiUsers,
  FiMail,
  FiShoppingCart,
  FiTag,
  FiLogOut,
  FiMenu,
  FiX,
  FiBarChart2,
  FiSettings
} from 'react-icons/fi'

function DashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'داشبورد', exact: true },
    { path: '/dashboard/products', icon: FiPackage, label: 'محصولات' },
    { path: '/dashboard/categories', icon: FiTag, label: 'دسته‌بندی‌ها' },
    { path: '/dashboard/sliders', icon: FiImage, label: 'اسلایدرها' },
    { path: '/dashboard/users', icon: FiUsers, label: 'کاربران' },
    { path: '/dashboard/contacts', icon: FiMail, label: 'تماس با ما' },
    { path: '/dashboard/orders', icon: FiShoppingCart, label: 'سفارشات' },
    { path: '/dashboard/settings', icon: FiSettings, label: 'تنظیمات' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-800 border-l border-gray-700 transition-all duration-300 fixed h-screen z-50`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-700 flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                پنل مدیریت
              </h1>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {sidebarOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>

          {/* User Info */}
          {sidebarOpen && (
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.fullName?.charAt(0) || user?.phone?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">
                    {user?.fullName || user?.phone || 'کاربر'}
                  </p>
                  <p className="text-gray-400 text-sm truncate">{user?.phone || ''}</p>
                </div>
              </div>
            </div>
          )}

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path, item.exact)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                  title={!sidebarOpen ? item.label : ''}
                >
                  <Icon className="text-xl flex-shrink-0" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
            >
              <FiLogOut className="text-xl" />
              {sidebarOpen && <span>خروج</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'mr-64' : 'mr-20'}`}>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

