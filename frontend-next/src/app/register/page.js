"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: ""
    });
    const [rules, setRules] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("http://127.0.0.1:8000/api/auth/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                router.push("/login?registered=true");
            } else {
                // نمایش خطاهای مختلف از backend
                if (data.username) {
                    setError(`نام کاربری: ${data.username[0]}`);
                } else if (data.email) {
                    setError(`ایمیل: ${data.email[0]}`);
                } else if (data.password) {
                    setError(`رمز عبور: ${data.password[0]}`);
                } else {
                    setError("خطایی در ثبت‌نام رخ داد.");
                }
            }
        } catch (err) {
            setError("اتصال به سرور برقرار نشد.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* هدر */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg shadow-emerald-200 mb-4">
                        <span className="text-2xl text-white">👤</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">عضویت</h1>
                </div>

                {/* کارت فرم */}
                <div className="bg-slate-50 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* نام و نام خانوادگی */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 mr-2">
                                    نام
                                </label>
                                <input
                                    name="first_name"
                                    placeholder="مثال: علی"
                                    className="w-full p-3.5 bg-white border border-slate-300 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 mr-2">
                                    نام خانوادگی
                                </label>
                                <input
                                    name="last_name"
                                    placeholder="مثال: محمدی"
                                    className="w-full p-3.5 bg-white border border-slate-300 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* نام کاربری */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 mr-2">
                                نام کاربری
                            </label>
                            <input
                                name="username"
                                placeholder="مثال: ali123"
                                required
                                className="w-full p-3.5 bg-white border border-slate-300 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                                onChange={handleChange}
                            />
                        </div>

                        {/* ایمیل */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 mr-2">
                                ایمیل
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="example@email.com"
                                required
                                className="w-full p-3.5 bg-white border border-slate-300 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                                onChange={handleChange}
                            />
                        </div>

                        {/* رمز عبور */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 mr-2">
                                رمز عبور
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="حداقل ۸ کاراکتر"
                                    required
                                    minLength="8"
                                    className="w-full p-3 bg-white border border-slate-300 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors text-sm font-medium"
                                >
                                    {showPassword ? "مخفی" : "نمایش"}
                                </button>
                            </div>
                        </div>

                        {/* نمایش خطا */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <p className="text-red-600 text-sm font-medium text-center">
                                    ⚠️ {error}
                                </p>
                            </div>
                        )}

                        <div className="flex justify-around items-center">
                            <p className="text-center text-sm text-gray-400">
                                با عضویت، با قوانین و مقررات موافقت می‌کنید
                            </p>
                            <input
                                onChange={(e)=> setRules(e.target.checked)}
                                type="checkbox"
                                checked={rules}
                                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                            />
                        </div>

                        {/* دکمه ثبت‌نام */}
                        <button
                            disabled={isLoading || !rules}
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-200/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin ml-2"></div>
                                    در حال ثبت‌نام...
                                </span>
                            ) : (
                                "عضویت"
                            )}
                        </button>
                    </form>

                    {/* لینک ورود */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <p className="text-center text-gray-600">
                            قبلاً حساب دارید؟{" "}
                            <Link
                                href="/login"
                                className="text-emerald-600 font-bold hover:text-emerald-700 hover:underline transition-colors"
                            >
                                وارد شوید
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
