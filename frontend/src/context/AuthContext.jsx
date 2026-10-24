import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, fetchCurrentUser } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('wom_token') || null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalConfig, setAuthModalConfig] = useState({
    defaultTab: 'login', // 'login' | 'register'
    defaultRole: 'client', // 'client' | 'artist'
  });

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await fetchCurrentUser();
          if (res.success) {
            setUser(res.data);
          } else {
            logout();
          }
        } catch (err) {
          console.error('Failed to restore session:', err);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (credentials) => {
    const res = await loginUser(credentials);
    if (res.success && res.data.token) {
      localStorage.setItem('wom_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data);
      setIsAuthModalOpen(false);
      return res;
    }
    throw new Error(res.message || 'Login failed');
  };

  const register = async (userData) => {
    const res = await registerUser(userData);
    if (res.success && res.data.token) {
      localStorage.setItem('wom_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data);
      setIsAuthModalOpen(false);
      return res;
    }
    throw new Error(res.message || 'Registration failed');
  };

  const logout = () => {
    localStorage.removeItem('wom_token');
    setToken(null);
    setUser(null);
  };

  const openAuthModal = (tab = 'login', role = 'client') => {
    setAuthModalConfig({ defaultTab: tab, defaultRole: role });
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isAuthModalOpen,
        authModalConfig,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
