import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../api/axios'; // Usa tu configuración con token

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // ✅ Verificar token almacenado al iniciar la app
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        try {
          // Opcional: puedes validar el token con tu backend
          const res = await apiClient.get('/auth/validate-token');
          if (res.status === 200) {
            setIsAuthenticated(true);
            setUser(res.data.user || null);
          } else {
            localStorage.removeItem('accessToken');
            setIsAuthenticated(false);
          }
        } catch {
          localStorage.removeItem('accessToken');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // ✅ Login: guarda token y estado
  const login = (token, userData = null) => {
    localStorage.setItem('accessToken', token);
    setIsAuthenticated(true);
    if (userData) setUser(userData);
  };

  // ✅ Logout: elimina token y usuario
  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};