import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load from localStorage initially
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user:", error);
      return null;
    }
  });

  // Save to localStorage when user changes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  }, [user]);

  //  Authentication functions
  const login = (userData) => setUser(userData);

  // const logout = () => setUser(null);
  // localStorage.removeItem("accessToken");
  // localStorage.removeItem("refreshToken");
  const logout = () => {
  setUser(null);
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

  const signup = (userData) => setUser(userData);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
