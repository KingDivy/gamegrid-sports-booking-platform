import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [token,   setToken]   = useState(() => localStorage.getItem('gg_token'));
  const [loading, setLoading] = useState(true);
  // Theme locked to 'light' for Neumorphic design system
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else delete axios.defaults.headers.common['Authorization'];
  }, [token]);

  // Always apply light theme for neumorphic UI
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.style.background = '#e0e5ec';
    localStorage.setItem('gg_theme', 'light');
  }, []);

  useEffect(() => {
    if (token) {
      axios.get(`/api/auth/profile`)
        .then(r => setUser(r.data))
        .catch(() => { localStorage.removeItem('gg_token'); setToken(null); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const r = await axios.post(`/api/auth/login`, { email, password });
    localStorage.setItem('gg_token', r.data.token);
    setToken(r.data.token);
    setUser(r.data.user);
    return r.data.user;
  };

  const register = async (data) => {
    const r = await axios.post(`/api/auth/register`, data);
    localStorage.setItem('gg_token', r.data.token);
    setToken(r.data.token);
    setUser(r.data.user);
    return r.data.user;
  };

  const logout = () => {
    localStorage.removeItem('gg_token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  // toggleTheme kept for Navbar compatibility — no-op in light-only mode
  const toggleTheme = () => {};

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, theme, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
