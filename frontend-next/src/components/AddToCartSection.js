"use client";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";

export default function AddToCartSection({ product }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => {
        // اگر بخواهیم تعداد مشخصی را یکجا اضافه کنیم،
        // می‌توانیم یک حلقه کوچک بزنیم یا متد addToCart را در استور آپدیت کنیم.
        // فعلاً به همان تعداد انتخاب شده اضافه می‌کنیم:
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        alert(`${quantity} عدد ${product.title} به سبد خرید اضافه شد.`);
    };

    return (
        <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">تعداد:</span>
                <div className="flex items-center border rounded-xl overflow-hidden bg-white">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 hover:bg-gray-100 transition-colors border-l"
                    >
                        −
                    </button>
                    <span className="px-6 py-2 font-bold w-14 text-center">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 hover:bg-gray-100 transition-colors border-r"
                    >
                        +
                    </button>
                </div>
            </div>

            <button
                onClick={handleAdd}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95 flex items-center justify-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                افزودن به سبد خرید
            </button>
        </div>
    );
}
