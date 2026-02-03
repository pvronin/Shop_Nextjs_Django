"use client";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
    // ۱. استخراج توابع جدید از استور
    const { cart, removeFromCart, addToCart, decreaseQuantity, clearCart, getTotalPrice } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="text-8xl">🛍️</div>
                <h2 className="text-2xl font-bold text-gray-800">سبد خرید شما فعلاً خالی است!</h2>
                <Link href="/shop" className="bg-emerald-600 text-white px-8 py-3 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 font-bold">
                    مشاهده محصولات فروشگاه
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10" dir="rtl">
            <h1 className="text-3xl font-black mb-10 text-gray-900 border-r-4 border-emerald-600 pr-4">سبد خرید شما</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* لیست محصولات */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-24 h-24 bg-gray-50 rounded-2xl flex-shrink-0 p-2">
                                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-800 truncate text-lg">{item.title}</h3>
                                <p className="text-emerald-600 font-black mt-1 text-xl">${item.price}</p>
                            </div>

                            {/* بخش کنترل تعداد محصول */}
                            <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-2xl">
                                <button
                                    onClick={() => addToCart(item)}
                                    className="text-2xl font-bold text-emerald-600 hover:scale-125 transition-transform"
                                >
                                    +
                                </button>
                                <span className="font-black text-lg w-6 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="text-2xl font-bold text-red-500 hover:scale-125 transition-transform"
                                >
                                    −
                                </button>
                            </div>

                            {/* دکمه حذف کامل آیتم */}
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    ))}

                    <div className="flex justify-start">
                        <button
                            onClick={clearCart}
                            className="text-lg font-medium text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 p-2"
                        >
                            🗑️ خالی کردن سبد خرید
                        </button>
                    </div>
                </div>

                {/* بخش فاکتور پرداخت */}
                <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white h-fit sticky top-24 shadow-2xl shadow-emerald-900/20">
                    <h3 className="text-xl font-bold mb-8 border-b border-gray-800 pb-4">خلاصه صورت‌حساب</h3>
                    <div className="space-y-6">
                        <div className="flex justify-between text-gray-400">
                            <span>تعداد محصولات</span>
                            <span className="font-bold text-white">{cart.reduce((a, c) => a + c.quantity, 0)}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>مجموع قیمت</span>
                            <span className="font-bold text-white">${getTotalPrice().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>هزینه ارسال</span>
                            <span className="text-emerald-400 font-bold">رایگان</span>
                        </div>
                        <div className="border-t border-gray-800 pt-6 flex justify-between items-center">
                            <span className="text-lg">مبلغ قابل پرداخت</span>
                            <span className="text-3xl font-black text-emerald-400">${getTotalPrice().toLocaleString()}</span>
                        </div>
                    </div>

                    <button className="w-full bg-emerald-500 text-gray-900 py-5 rounded-2xl font-black text-lg mt-10 hover:bg-emerald-400 hover:-translate-y-1 transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
                        تأیید و پرداخت نهایی
                    </button>
                </div>
            </div>
        </div>
    );
}
