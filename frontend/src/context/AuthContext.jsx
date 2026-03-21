import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { auth as authAPI } from '../utils/api';

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = localStorage.getItem('sc_user');
    const t = localStorage.getItem('sc_token');
    if (u && t) {
      try { setUser(JSON.parse(u)); } catch { _logout(); }
    }
    setLoading(false);
  }, []);

  const _save = (data) => {
    localStorage.setItem('sc_token', data.token);
    localStorage.setItem('sc_user',  JSON.stringify(data.user));
    setUser(data.user);
  };

  const _logout = useCallback(() => {
    localStorage.removeItem('sc_token');
    localStorage.removeItem('sc_user');
    setUser(null);
  }, []);

  const login = useCallback(async (email, password) => {
    const d = await authAPI.login({ email, password });
    _save(d); return d;
  }, []);

  const register = useCallback(async (payload) => {
    const d = await authAPI.register(payload);
    _save(d); return d;
  }, []);

  const adminLogin = useCallback(async (username, password) => {
    const d = await authAPI.adminLogin({ username, password });
    const user = { ...d.user, isAdmin: true };
    localStorage.setItem('sc_token', d.token);
    localStorage.setItem('sc_user',  JSON.stringify(user));
    setUser(user);
    return d;
  }, []);

  const isAdmin = !!(user?.isAdmin || user?.role === 'super_admin' || user?.role === 'admin');

  return (
    <Ctx.Provider value={{ user, loading, isLoggedIn: !!user, isAdmin, login, register, adminLogin, logout: _logout }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
