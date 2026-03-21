import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || '/api';

const http = axios.create({
  baseURL: BASE,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(cfg => {
  const token = localStorage.getItem('sc_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

http.interceptors.response.use(
  r => r.data,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('sc_token');
      localStorage.removeItem('sc_user');
      window.location.href = '/login';
    }
    return Promise.reject(err.response?.data || { message: 'Network error. Please check your connection.' });
  }
);

export default http;

export const auth = {
  register:   d => http.post('/auth/register.php', d),
  login:      d => http.post('/auth/login.php', d),
  adminLogin: d => http.post('/admin/login.php', d),
  me:         () => http.get('/auth/me.php'),
};

export const api = {
  getStats:      ()  => http.get('/stats/public.php'),
  getCentres:    r   => http.get(`/centers/list.php?region=${encodeURIComponent(r)}`),
  contact:       d   => http.post('/contact/submit.php', d),
  subscribe:     d   => http.post('/newsletter/subscribe.php', d),
  pledge:        d   => http.post('/pledge/submit.php', d),
  quiz:          d   => http.post('/quiz/submit.php', d),
  bookAppointment: d => http.post('/appointment/submit.php', d),
};

export const adminApi = {
  dashboard:      ()    => http.get('/admin/dashboard.php'),
  getMessages:    page  => http.get(`/admin/messages.php?page=${page || 1}`),
  updateMessage:  d     => http.post('/admin/messages.php?action=update_status', d),
  getAppointments:page  => http.get(`/admin/appointments.php?page=${page || 1}`),
  getPledges:     page  => http.get(`/admin/pledges.php?page=${page || 1}`),
};
