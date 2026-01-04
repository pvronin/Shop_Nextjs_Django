"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [term, setTerm] = useState(searchParams.get("search") || "");
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const searchRef = useRef(null);

    // تشخیص موبایل
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // بستن لیست نتایج
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // جستجوی لحظه‌ای
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (term.length > 1) { // کاهش به ۱ حرف برای موبایل
                const res = await fetch(`http://127.0.0.1:8000/api/products/?search=${term}&limit=${isMobile ? 4 : 8}`);
                const data = await res.json();
                setResults(data.results || []);
                setShowResults(true);
            } else {
                setResults([]);
                setShowResults(false);
            }
        }, isMobile ? 400 : 300); // تاخیر بیشتر برای موبایل

        return () => clearTimeout(delayDebounceFn);
    }, [term, isMobile]);

    const onSearchSubmit = (e) => {
        e.preventDefault();
        setShowResults(false);
        const params = new URLSearchParams(searchParams);
        if (term) params.set("search", term);
        else params.delete("search");
        params.set("page", 1);
        router.push(`/shop?${params.toString()}`);
    };

    return (
        <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md" ref={searchRef}>
            <form onSubmit={onSearchSubmit} className="flex items-center">
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    onFocus={() => term.length > 1 && setShowResults(true)}
                    placeholder={isMobile ? "جستجو..." : "جستجوی سریع..."}
                    className="w-full px-4 py-2.5 md:py-2 text-sm md:text-base border border-gray-300 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                <button
                    type="submit"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </form>

            {/* لیست نتایج */}
            {showResults && results.length > 0 && (
                <div className="absolute z-50 w-full mt-1 md:mt-2 bg-white border rounded-lg md:rounded-xl shadow-xl overflow-hidden max-h-80 md:max-h-96 overflow-y-auto">
                    <div className="p-2 bg-gray-50 border-b">
                        <p className="text-xs text-gray-500">
                            {results.length} نتیجه برای "{term}"
                        </p>
                    </div>
                    {results.map((product) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            onClick={() => setShowResults(false)}
                            className="flex items-center gap-2 md:gap-3 p-2 md:p-3 hover:bg-gray-50 border-b last:border-0 transition-colors"
                        >
                            <img
                                src={product.thumbnail || "/placeholder.png"}
                                alt=""
                                className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-lg shadow-sm flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <span className="text-xs md:text-sm font-medium text-gray-800 line-clamp-1">
                                    {product.title}
                                </span>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-xs text-blue-600 font-bold">
                                        ${Number(product.price).toLocaleString()}
                                    </span>
                                    {product.stock > 0 ? (
                                        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                            موجود
                                        </span>
                                    ) : (
                                        <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                                            ناموجود
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                    <button
                        onClick={onSearchSubmit}
                        className="w-full p-3 text-center text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium border-t"
                    >
                        نمایش همه نتایج ({results.length})
                    </button>
                </div>
            )}
        </div>
    );
}
