import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/Usuarios/login', credentials),
  registro: (userData) => api.post('/Usuarios/registro', userData),
  perfil: () => api.get('/Usuarios/perfil'),
};

export const clientesAPI = {
  listar: () => api.get('/Clientes/listarCl'),
  crear: (data) => api.post('/Clientes/Clientes', data),
  obtenerPorId: (id) => api.get(`/Clientes/obtenerCl/${id}`),
  actualizar: (id, data) => api.put(`/Clientes/actualizarCl/${id}`, data),
  eliminar: (id) => api.delete(`/Clientes/eliminarCl/${id}`),
};

export const vehiculosAPI = {
  listar: () => api.get('/Vehiculos/listarVe'),
  crear: (data) => api.post('/Vehiculos/Vehiculos', data),
  obtenerPorId: (id) => api.get(`/Vehiculos/obtenerVe/${id}`),
  actualizar: (id, data) => api.put(`/Vehiculos/actualizarVe/${id}`, data),
  eliminar: (id) => api.delete(`/Vehiculos/eliminarVe/${id}`),
};

export const reservasAPI = {
  listar: () => api.get('/Reservas/listarRe'),
  crear: (data) => api.post('/Reservas/Reservas', data),
  obtenerPorId: (id) => api.get(`/Reservas/obtenerRe/${id}`),
  actualizar: (id, data) => api.put(`/Reservas/actualizarRe/${id}`, data),
  eliminar: (id) => api.delete(`/Reservas/eliminarRe/${id}`),
};

export default api;