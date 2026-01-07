"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const result = await login(username, password);

        if (result.success) {
            router.push("/");
        } else {
            setError("نام کاربری یا رمز عبور اشتباه است.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl shadow-gray-200 border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-gray-900">خوش آمدید</h2>
                    <p className="text-gray-500 mt-2">لطفاً وارد حساب کاربری خود شوید</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 mr-1">نام کاربری</label>
                        <input
                            type="text"
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                            placeholder="نام کاربری خود را وارد کنید"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 mr-1">رمز عبور</label>
                        <input
                            type="password"
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50"
                    >
                        {isLoading ? "در حال ورود..." : "ورود به حساب"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        حساب کاربری ندارید؟{" "}
                        <Link href="/register" className="text-emerald-600 font-bold hover:underline">
                            همین حالا ثبت‌نام کنید
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
