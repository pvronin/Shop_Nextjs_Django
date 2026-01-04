"use client";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export default function ProductCard({ item }) {
    // ۱. استخراج تابع افزودن از استور
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = (e) => {
        // جلوگیری از اجرای لینکِ والد (که به صفحه جزئیات می‌رود)
        e.preventDefault();
        e.stopPropagation();

        // افزودن محصول به سبد خرید
        addToCart(item);

        // اختیاری: می‌توانید اینجا یک انیمیشن یا پیام ساده هم بگذارید
        console.log("Added to cart:", item.title);
    };

    return (
        <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            {/* لینک به صفحه جزئیات محصول */}
            <Link href={`/product/${item.id}`}>
                <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
            </Link>

            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 truncate">{item.title}</h3>
                <div className="flex items-center justify-between mt-3">
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-emerald-600">${item.price}</span>
                        {/* نمایش امتیاز کوچک (اختیاری) */}
                        <span className="text-xs text-gray-400">⭐ {item.rating}</span>
                    </div>

                    {/* ۲. دکمه افزودن به سبد خرید */}
                    <button
                        onClick={handleAddToCart}
                        className="bg-emerald-600 text-white w-10 h-10 rounded-lg hover:bg-emerald-700 hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-lg shadow-emerald-100"
                        title="افزودن به سبد خرید"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
