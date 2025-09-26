import { useState, useEffect } from "react";
import { User } from "../types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// ✅ API base URL comes from .env (e.g., VITE_API_URL=http://localhost:8085)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8085";

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: false,
    isAuthenticated: false,
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setAuthState({
        user: JSON.parse(userData),
        isLoading: false,
        isAuthenticated: true,
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("userData", JSON.stringify(data));
      setAuthState({ user: data, isLoading: false, isAuthenticated: true });
    } catch (err: any) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw err; // ✅ let the UI (form) handle the error
    }
  };

  const signup = async (
    fullName: string,
    username: string,
    email: string,
    password: string
  ) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      localStorage.setItem("userData", JSON.stringify(data));
      setAuthState({ user: data, isLoading: false, isAuthenticated: true });
    } catch (err: any) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw err; // ✅ pass error back to UI
    }
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setAuthState({ user: null, isLoading: false, isAuthenticated: false });
  };

  return {
    ...authState,
    login,
    signup,
    logout,
  };
};
