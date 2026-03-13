// Base URL — change to your PHP backend URL in production
const BASE = import.meta.env.VITE_API_URL || '/api';

async function request(endpoint, options = {}) {
  const config = {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  };
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }
  const res = await fetch(`${BASE}${endpoint}`, config);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
}

export const api = {
  // Newsletter
  subscribe: (email, name) => request('/newsletter/subscribe.php', { method: 'POST', body: { email, name } }),

  // Contact
  contact: (payload) => request('/contact/submit.php', { method: 'POST', body: payload }),

  // Pledge
  pledge: (payload) => request('/pledge/submit.php', { method: 'POST', body: payload }),

  // Quiz
  submitQuiz: (payload) => request('/quiz/submit.php', { method: 'POST', body: payload }),

  // Appointment request
  appointment: (payload) => request('/appointment/submit.php', { method: 'POST', body: payload }),

  // Get stats (public counters)
  getStats: () => request('/stats/public.php'),

  // Get testing centers
  getCenters: (state) => request(`/centers/list.php?state=${encodeURIComponent(state)}`),
};
