"use client"; 
import { mockUsers } from "@/data/Mcquse";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const login = (email, password) => {
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      if (foundUser) {
        const userWithoutPassword = { ...foundUser };
        delete userWithoutPassword.password;
        setUser(userWithoutPassword);
        return { success: true };
      }
      return { success: false, error: 'Invalid credentials' };
    };
  
    const logout = () => {
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout, loading }}>
        {children}
      </AuthContext.Provider>
    );
  };