import axios from 'axios';

// Creamos la instancia con la URL base de tu backend
export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Peticiones: 
// Se ejecuta mágicamente ANTES de que cualquier petición salga hacia el backend
api.interceptors.request.use(
  (config) => {
    // Aquí luego usaremos Zustand para obtener el token, por ahora revisamos localStorage
    const token = localStorage.getItem('aura_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Respuestas:
// Centralizamos el manejo de errores (ej. si el token expira o la licencia falla)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Sesión expirada o token inválido. Redirigiendo al Login...");
      // Lógica de deslogueo futuro
      localStorage.removeItem('aura_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;