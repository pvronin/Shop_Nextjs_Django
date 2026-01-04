"use client";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useState, useEffect } from "react";

export default function ProductCard({ item }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const [isHovered, setIsHovered] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // تشخیص موبایل
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // بررسی تخفیف
    const hasDiscount = item.final_price && item.final_price < item.price;
    const discountPercentage = hasDiscount
        ? Math.round((1 - item.final_price / item.price) * 100)
        : 0;

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsAdding(true);
        await new Promise(resolve => setTimeout(resolve, 300));
        addToCart(item);
        setIsAdding(false);
    };

    // نمایش ستاره‌ها
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<span key={i} className="text-yellow-400 text-xs md:text-sm">★</span>);
            } else {
                stars.push(<span key={i} className="text-gray-300 text-xs md:text-sm">★</span>);
            }
        }
        return stars;
    };

    // Event handlers برای موبایل
    const handleTouchStart = () => {
        if (isMobile) setIsHovered(true);
    };

    const handleTouchEnd = () => {
        if (isMobile) {
            setTimeout(() => setIsHovered(false), 1000);
        }
    };

    return (
        <div
            className="group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-100"
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* لیبل وضعیت */}
            <div className="absolute top-2 md:top-4 left-2 md:left-4 z-10">
                {item.stock <= 0 ? (
                    <span className="bg-gray-800 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full">
                        ناموجود
                    </span>
                ) : item.stock < 5 ? (
                    <span className="bg-amber-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full">
                        آخرین
                    </span>
                ) : hasDiscount ? (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-sm md:shadow-lg">
                        {discountPercentage}%
                    </span>
                ) : null}
            </div>

            {/* دکمه‌های اکشن - فقط در دسکتاپ */}
            {!isMobile && (
                <div className={`absolute top-4 right-4 z-10 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                    <button className="w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all hover:bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-gray-600 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    <button className="w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all hover:bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-gray-600 hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </button>
                </div>
            )}

            <Link href={`/product/${item.id}`}>
                {/* تصویر */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <img
                        src={item.thumbnail}
                        alt={item.title}
                        className={`h-full w-full object-contain transition-all duration-500 ${isHovered && !isMobile ? 'scale-110' : 'scale-100'}`}
                    />
                </div>

                {/* اطلاعات */}
                <div className="p-3 md:p-4 lg:p-6">
                    {/* دسته‌بندی */}
                    <div className="mb-1 md:mb-2">
                        <span className="text-[10px] md:text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 md:px-3 md:py-1 rounded-full">
                            ساعت
                        </span>
                    </div>

                    {/* عنوان */}
                    <h3 className="text-sm md:text-base lg:text-lg font-bold text-gray-900 mb-1 md:mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                    </h3>

                    {/* توضیح کوتاه - فقط در دسکتاپ */}
                    <p className="hidden md:block text-xs md:text-sm text-gray-500 mb-2 md:mb-3 lg:mb-4 line-clamp-2">
                        {item.description?.substring(0, 60)}...
                    </p>

                    {/* رتبه‌بندی */}
                    <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3 lg:mb-4">
                        <div className="flex">
                            {renderStars(item.rating || 0)}
                        </div>
                        <span className="text-xs text-gray-500">
                            ({item.rating || 0})
                        </span>
                        {!isMobile && (
                            <>
                                <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                                <span className="text-xs text-gray-500">
                                    {item.reviews?.length || 0} نظر
                                </span>
                            </>
                        )}
                    </div>

                    {/* قیمت و دکمه */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            {hasDiscount ? (
                                <>
                                    <div className="flex items-center gap-1 md:gap-2">
                                        <span className="text-lg md:text-xl lg:text-2xl font-black bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                                            ${Number(item.final_price).toLocaleString()}
                                        </span>
                                        <span className="hidden md:inline text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                                            ویژه
                                        </span>
                                    </div>
                                    <span className="text-xs md:text-sm text-gray-400 line-through">
                                        ${Number(item.price).toLocaleString()}
                                    </span>
                                </>
                            ) : (
                                <div className="flex items-end gap-0.5 md:gap-1">
                                    <span className="text-lg md:text-xl lg:text-2xl font-black text-gray-900">
                                        ${Number(item.price).toLocaleString()}
                                    </span>
                                    <span className="text-xs text-gray-500 mb-0.5 hidden md:inline">USD</span>
                                </div>
                            )}
                        </div>

                        {/* دکمه سبد خرید */}
                        <button
                            onClick={handleAddToCart}
                            disabled={item.stock <= 0}
                            className={`relative overflow-hidden ${item.stock <= 0
                                ? 'bg-gray-300 cursor-not-allowed'
                                : hasDiscount
                                    ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
                                    : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'
                                } text-white w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg md:rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg`}
                            title={item.stock <= 0 ? "ناموجود" : "افزودن به سبد خرید"}
                        >
                            <div className={`absolute inset-0 bg-white/20 ${isAdding ? 'animate-ping' : ''}`}></div>
                            <div className={`transition-all duration-300 ${isAdding ? 'scale-0' : 'scale-100'}`}>
                                {item.stock <= 0 ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                )}
                            </div>
                            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isAdding ? 'scale-100' : 'scale-0'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </Link>

            {/* افکت پایین - فقط در دسکتاپ */}
            {!isMobile && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            )}
        </div>
    );
}
