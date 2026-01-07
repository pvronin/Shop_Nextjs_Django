"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // چک کردن اینکه آیا توکن در کوکی هست یا نه
        const token = Cookies.get("access_token");
        if (token) {
            // اینجا می‌توانید یک درخواست به بک‌اِند بزنید تا اطلاعات یوزر را بگیرید
            // فعلاً برای سادگی فرض می‌کنیم لاگین است
            setUser({ loggedIn: true });
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const res = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (res.ok) {
            Cookies.set("access_token", data.access, { expires: 1 }); // ذخیره برای ۱ روز
            Cookies.set("refresh_token", data.refresh, { expires: 7 });
            setUser({ loggedIn: true });
            return { success: true };
        } else {
            return { success: false, error: data.detail };
        }
    };

    const logout = () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
