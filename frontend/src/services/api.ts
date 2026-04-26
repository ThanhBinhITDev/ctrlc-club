import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userService = {
  getAll: () => api.get('/users'),
  getById: (id: string) => api.get(`/users/${id}`),
};

export const clubMemberService = {
  getMembers: () => api.get('/club/members'),
  promote: (data: any) => api.post('/club/members', data),
  getPositions: () => api.get('/club/positions'),
};

export default api;
