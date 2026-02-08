"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from "@/store/useCartStore";
import { useAuth } from "@/context/AuthContext"; // اضافه شد

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // ۱. استفاده از کانتکست احراز هویت
    const { user, logout } = useAuth();

    const cart = useCartStore((state) => state.cart);

    useEffect(() => {
        setMounted(true);
    }, []);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className=" bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">

                <div className="container mx-auto px-4 flex justify-between h-16 items-center">
                    {/* لوگو */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-black text-emerald-600 tracking-tighter">
                            NEXT<span className="text-gray-900">SHOP</span>
                        </Link>
                    </div>

                    {/* منوی دسکتاپ */}
                    <div className="hidden md:flex gap-5 text-sm font-medium text-gray-700">
                        <Link href="/" className="hover:text-emerald-600 transition">صفحه اصلی</Link>
                        <Link href="/shop" className="hover:text-emerald-600 transition">فروشگاه</Link>
                        <Link href="/about" className="hover:text-emerald-600 transition">درباره ما</Link>
                    </div>

                    {/* بخش آیکون‌ها و کاربر */}
                    <div className="flex items-center gap-3">
                        {/* دکمه سبد خرید */}
                        <Link
                            href="/cart"
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition relative group"
                        >
                            <svg className="h-6 w-6 group-hover:text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {mounted && totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                                    {totalItems > 9 ? '+9' : totalItems}
                                </span>
                            )}
                        </Link>

                        {/* بخش ورود / خروج */}
                        <div className="hidden md:flex items-center border-r pr-3 mr-1 border-gray-200">
                            {mounted && (
                                user ? (
                                    <div className="flex items-center gap-4">
                                        <Link className="text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-3 py-1.5 transition" href="/dashboard">پنل کاربری</Link>
                                        <button
                                            onClick={logout}
                                            className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100 transition"
                                        >
                                            خروج
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="text-sm bg-gray-900 text-white px-5 py-2 rounded-xl font-bold hover:bg-emerald-600 transition shadow-sm"
                                    >
                                        ورود / ثبت‌نام
                                    </Link>
                                )
                            )}
                        </div>

                        {/* دکمه منوی موبایل */}
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* منوی موبایل */}
                {isOpen && (
                    <div className="md:hidden pb-4 space-y-2 border-t pt-4">
                        <Link href="/" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg">صفحه اصلی</Link>
                        <Link href="/shop" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg">فروشگاه</Link>
                        {user ? (
                            <button onClick={logout} className="w-full text-right block px-3 py-2 text-red-600 font-bold hover:bg-red-50 rounded-lg">خروج از حساب</button>
                        ) : (
                            <Link href="/login" className="block px-3 py-2 text-emerald-600 font-bold hover:bg-emerald-50 rounded-lg">ورود / ثبت‌نام</Link>
                        )}
                    </div>
                )}

        </header>
    );
}
