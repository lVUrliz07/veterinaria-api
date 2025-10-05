import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // Usa el proxy configurado en vite.config.js
  headers: {
    'Content-Type': 'application/json',
  },
});

// ¡IMPORTANTE! Interceptor para añadir el Token a cada petición
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // O donde sea que guardes el token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor de respuesta para manejar errores 401 (token expirado)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default apiClient;