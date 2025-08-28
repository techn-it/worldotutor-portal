"use client"
// import { AuthContext } from "@/components/Auth/AuthProvider";
import { AuthContext } from "@/components/Auth/AuthProvider";
import { useContext } from "react";
export const UsesAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
  };