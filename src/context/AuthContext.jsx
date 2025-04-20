import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // Set admin status if it exists in stored user data
      setIsAdmin(parsedUser.isAdmin || false);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(
        `${baseUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
      setIsAdmin(response.data.user.isAdmin || false);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  const adminLogin = async (email, password, adminKey) => {
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(
        `${baseUrl}/api/admin/login`,
        { email, password, adminKey },
        { withCredentials: true }
      );
      
      if (response.data.user.isAdmin) {
        setUser(response.data.user);
        setIsAdmin(true);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return { success: true };
      } else {
        return { success: false, message: "Not authorized as admin" };
      }
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || "Admin authentication failed" 
      };
    }
  };

  const register = async (formData) => {
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${baseUrl}/api/auth/register`, formData, {
        withCredentials: true,
      });
      return { success: true, message: response.data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Registration failed" };
    }
  };

  const logout = async () => {
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      await axios.post(`${baseUrl}/api/auth/logout`, {}, { withCredentials: true });
      return { success: true };
    } catch (err) {
      console.error("Logout error:", err);
      return { success: false, message: "Logout failed, please try again" };
    } finally {
      setUser(null);
      setIsAdmin(false);
      localStorage.removeItem("user");
    }
  };

  // New "Forgot Password" function
  const resetPassword = async (email) => {
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(
        `${baseUrl}/api/auth/forgot-password`,
        { email },
        { withCredentials: true }
      );
      return { success: true, message: response.data.message || "Reset link sent to your email" };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to send reset link",
      };
    }
  };

  // Check if user has admin privileges
  const checkAdminStatus = () => {
    return isAdmin;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAdmin,
        login, 
        adminLogin,
        register, 
        logout, 
        resetPassword,
        checkAdminStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}