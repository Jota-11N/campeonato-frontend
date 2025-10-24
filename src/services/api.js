import axios from "axios";

// Configuración de Axios con la URL del backend desplegado en Render
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://campeonato-backend.onrender.com/api",
});

// Interceptor para incluir el token JWT en cada petición si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
