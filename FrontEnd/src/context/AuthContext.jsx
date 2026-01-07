import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // تنظیم توکن در header های axios به صورت پیش‌فرض
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/login', {
        email,
        password,
      });

      if (response.data && response.data.token) {
        const newToken = response.data.token;
        const userData = response.data.user || { email };
        
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, error: 'توکن دریافت نشد' };
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'خطا در ورود';
      return { success: false, error: errorMessage };
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register', formData);

      if (response.data && response.data.token) {
        const newToken = response.data.token;
        const userData = response.data.user || formData;
        
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, error: 'توکن دریافت نشد' };
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'خطا در ثبت‌نام';
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
  };

  const isAuthenticated = () => {
    return !!token;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

