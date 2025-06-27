// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Login: expects an object with { _id, name, email, token }
  const login = (userObj) => {
    setUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj));
  };

  // Logout: clears user and storage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming context
export const useAuth = () => useContext(AuthContext);
