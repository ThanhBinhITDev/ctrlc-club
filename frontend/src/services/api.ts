import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để đính kèm Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor để xử lý lỗi 401 (Hết hạn login)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (credentials: any) => api.post('/v1/login', credentials),
  logout: () => api.post('/v1/logout'),
  me: () => api.get('/v1/me'),
};

export const dashboardService = {
  getStats: () => api.get('/v1/dashboard/stats'),
};

export const userService = {
  getAll: () => api.get('/v1/users'),
  getById: (id: string) => api.get(`/v1/users/${id}`),
};

export const clubMemberService = {
  getMembers: () => api.get('/v1/club/members'),
  promote: (data: any) => api.post('/v1/club/members', data),
  getPositions: () => api.get('/v1/club/positions'),
  remove: (id: string) => api.delete(`/v1/club/members/${id}`),
};

export default api;
