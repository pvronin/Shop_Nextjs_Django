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
            const res = await fetch("http://127.0.0.1:8000/api/accounts/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                // ثبت‌نام موفق بود، کاربر را به صفحه لاگین می‌فرستیم
                router.push("/login?registered=true");
            } else {
                // نمایش خطاهای احتمالی از سمت جنگو (مثل تکراری بودن یوزرنیم)
                setError(data.username || data.email || "خطایی در ثبت‌نام رخ داد.");
            }
        } catch (err) {
            setError("اتصال به سرور برقرار نشد.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-4 py-10">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-gray-900">ساخت حساب کاربری</h2>
                    <p className="text-gray-500 mt-2">اطلاعات خود را وارد کنید</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            name="first_name"
                            placeholder="نام"
                            className="p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                            onChange={handleChange}
                        />
                        <input
                            name="last_name"
                            placeholder="نام خانوادگی"
                            className="p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                            onChange={handleChange}
                        />
                    </div>
                    <input
                        name="username"
                        placeholder="نام کاربری *"
                        required
                        className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                        onChange={handleChange}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="ایمیل *"
                        required
                        className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                        onChange={handleChange}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="رمز عبور *"
                        required
                        className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                        onChange={handleChange}
                    />

                    {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

                    <button
                        disabled={isLoading}
                        className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all disabled:opacity-50"
                    >
                        {isLoading ? "در حال ثبت‌نام..." : "تأیید و عضویت"}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    قبلاً عضو شده‌اید؟{" "}
                    <Link href="/login" className="text-emerald-600 font-bold hover:underline">وارد شوید</Link>
                </p>
            </div>
        </div>
    );
}
