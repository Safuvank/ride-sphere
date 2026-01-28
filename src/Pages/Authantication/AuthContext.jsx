import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  //  Load user from localStorage on initial render
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });

  //  Persist user to localStorage whenever it changes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Failed to save user to localStorage:", error);
    }
  }, [user]);

  //  Authentication functions
  const login = (userData) => setUser(userData); // log in
  const logout = () => setUser(null);
  localStorage.removeItem("user"); // log out
  const signup = (userData) => setUser(userData); // sign up

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
