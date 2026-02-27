import { createContext, useState, useEffect } from "react";
import api from "../../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    try {
      const parsedUser = JSON.parse(stored);
      if (parsedUser) {
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Invalid auth data. Clearing storage...");
      localStorage.removeItem("auth");
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    if (!userData) return;

    localStorage.setItem("auth", JSON.stringify(userData));
    setUser(userData);
  };

  const signup = async (userData) => {
    const { data } = await api.post("/auth/register", userData);
    return data;
  };

  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const { data } = await api.post("/auth/refresh");
        localStorage.setItem("accessToken", data.accessToken);
      } catch {
        localStorage.removeItem("auth");
        localStorage.removeItem("accessToken");
      }
    };

    tryRefresh();
  }, []);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      localStorage.removeItem("auth");
      localStorage.removeItem("accessToken");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
