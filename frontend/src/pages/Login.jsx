import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';
import './Login.css';

const Login = ({ onLogin }) => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? { dni, pass: password } : { dni, nombre: '', apellido: '', pass: password, email: '' }; // Adjust for register
      const response = await apiClient.post(endpoint, payload);
      if (isLogin) {
        localStorage.setItem('accessToken', response.data.access_token);
        onLogin();
        navigate('/dashboard');
      } else {
        alert('Registered successfully');
        setIsLogin(true);
      }
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="dni">DNI</label>
            <input
              type="text"
              id="dni"
              placeholder="Ingresa tu DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="switch-btn"
        >
          {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
        </button>
      </div>
    </div>
  );
};

export default Login;