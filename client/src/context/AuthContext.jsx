import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
 
// Create the context
const AuthContext = createContext();
 
// Custom hook so components can simply do: const { user, login } = useAuth();
export const useAuth = () => useContext(AuthContext);
 
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { _id, name, email, role, token }
  const [loading, setLoading] = useState(true); // true while checking localStorage on first load
 
  // On first app load, check if a user is already stored in localStorage
  // so they stay logged in after a page refresh.
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
 
  // ------------------- Register -------------------
  const register = async (name, email, password, role) => {
    try {
      const { data } = await api.post('/auth/register', { name, email, password, role });
 
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return false;
    }
  };
 
  // ------------------- Login -------------------
  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
 
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      toast.success(`Welcome back, ${data.name}!`);
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return false;
    }
  };
 
  // ------------------- Logout -------------------
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.info('You have been logged out');
  };
 
  // Value shared with all components wrapped inside <AuthProvider>
  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
    register,
    login,
    logout,
  };
 
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
 
export default AuthContext;
