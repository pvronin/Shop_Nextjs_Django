// src/components/Header.js
"use client"; // چون از State برای منوی موبایل استفاده می‌کنیم
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* لوگو */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-black text-emerald-600 tracking-tighter">
              NEXT<span className="text-gray-900">SHOP</span>
            </Link>
          </div>

          {/* منوی دسکتاپ */}
          <div className="hidden md:flex space-x-8 rtl:space-x-reverse text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-emerald-600 transition">صفحه اصلی</Link>
            <Link href="/shop" className="hover:text-emerald-600 transition">فروشگاه</Link>
            <Link href="/about" className="hover:text-emerald-600 transition">درباره ما</Link>
          </div>

          {/* بخش آیکون‌ها */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>

            {/* دکمه منوی موبایل */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* منوی موبایل (کشویی) */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t pt-4">
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg">صفحه اصلی</Link>
            <Link href="/shop" className="block px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg">فروشگاه</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
