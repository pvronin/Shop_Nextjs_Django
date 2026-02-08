// context/AuthContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("access_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // اگر endpoint /me/ داری که اطلاعات کاربر رو برمی‌گردونه
        const res = await fetch("http://127.0.0.1:8000/api/accounts/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data); // مثلاً { username, email, ... }
        }
      } catch (err) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "خطا در ورود");
      }

      Cookies.set("access_token", data.access, {
        expires: 1,
        secure: true,
        sameSite: "lax",
      });

      Cookies.set("refresh_token", data.refresh, {
        expires: 7,
        secure: true,
        sameSite: "lax",
      });

      // می‌تونی اینجا اطلاعات کاربر رو fetch کنی یا فقط username بذاری
      setUser({ username });

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth باید داخل AuthProvider استفاده شود");
  }

  return context;
};
