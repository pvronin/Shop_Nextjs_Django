"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [term, setTerm] = useState(searchParams.get("search") || "");
    const [results, setResults] = useState([]); // برای ذخیره ۸ نتیجه
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    // بستن لیست نتایج وقتی کاربر جای دیگر کلیک می‌کند
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // منطق جستجوی لحظه‌ای با Debounce
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (term.length > 2) { // فقط اگر بیشتر از ۲ حرف تایپ شد
                const res = await fetch(`http://127.0.0.1:8000/api/products/?search=${term}&limit=8`);
                const data = await res.json();
                setResults(data.results || []);
                setShowResults(true);
            } else {
                setResults([]);
                setShowResults(false);
            }
        }, 300); // ۳۰۰ میلی‌ثانیه صبر کن بعد درخواست بفرست

        return () => clearTimeout(delayDebounceFn);
    }, [term]);

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
        <div className="relative w-full max-w-sm" ref={searchRef}>
            <form onSubmit={onSearchSubmit} className="flex items-center gap-2">
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    onFocus={() => term.length > 2 && setShowResults(true)}
                    placeholder="جستجوی سریع..."
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
            </form>

            {/* لیست نتایج لحظه‌ای */}
            {showResults && results.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border rounded-xl shadow-xl overflow-hidden">
                    {results.map((product) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            onClick={() => setShowResults(false)}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b last:border-0 transition-colors"
                        >
                            <img
                                src={product.thumbnail || "/placeholder.png"}
                                alt=""
                                className="w-14 h-14 object-cover rounded shadow-sm"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-800 line-clamp-1">{product.title}</span>
                                <span className="text-xs text-blue-600">${product.price}</span>
                            </div>
                        </Link>
                    ))}
                    <button
                        onClick={onSearchSubmit}
                        className="w-full p-2 text-center text-xs bg-gray-50 text-gray-500 hover:text-blue-600"
                    >
                        نمایش همه نتایج
                    </button>
                </div>
            )}
        </div>
    );
}
