'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const base64UrlDecode = (base64Url) => {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4;
    if (padding) {
      base64 += '='.repeat(4 - padding);
    }
    return atob(base64);
  };

  const isValidJwt = (token) => {
    const parts = token.split('.');
    return parts.length === 3;
  };

  const isAuthenticated = (token) => {
    if (!isValidJwt(token)) {
      return false;
    }

    const payload = JSON.parse(base64UrlDecode(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && isAuthenticated(token)) {
      const decodedToken = JSON.parse(base64UrlDecode(token.split('.')[1]));

      setUser(decodedToken);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('authToken', token);
    setUser(userData);
    router.push('/property');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
