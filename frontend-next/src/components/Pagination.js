"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Pagination({ currentPage, totalCount, pageSize = 12 }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isChanging, setIsChanging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // محاسبه تعداد کل صفحات
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = async (newPage) => {
    if (newPage < 1 || newPage > totalPages || isChanging) return;

    setIsChanging(true);
    await new Promise(resolve => setTimeout(resolve, 200));

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`${pathname}?${params.toString()}`);

    setIsChanging(false);
  };

  // منطق نمایش صفحات برای موبایل و دسکتاپ
  const getPageNumbers = () => {
    const pages = [];

    if (isMobile) {
      // برای موبایل: فقط 3 صفحه نمایش داده شود
      const startPage = Math.max(1, currentPage - 1);
      const endPage = Math.min(totalPages, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    } else {
      // برای دسکتاپ: 5 صفحه نمایش داده شود
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className="relative">
      <div className="flex flex-col items-center gap-4 md:gap-6 py-6 md:py-10 px-2 md:px-0">
        {/* اطلاعات صفحه - کامپکت برای موبایل */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 text-sm text-gray-600 w-full">
          <div className="flex items-center gap-1 md:gap-2 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm border text-xs md:text-sm">
            <span className="font-medium hidden md:inline">صفحه</span>
            <span className="font-bold text-blue-600">{currentPage.toLocaleString('fa-IR')}</span>
            <span className="mx-1">از</span>
            <span className="font-bold">{totalPages.toLocaleString('fa-IR')}</span>
          </div>
          <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-emerald-100 text-xs md:text-sm">
            <span className="font-medium hidden md:inline">تعداد کل:</span>
            <span className="font-bold mr-1 md:mr-2">{totalCount.toLocaleString('fa-IR')}</span>
            <span className="hidden md:inline">محصول</span>
            <span className="md:hidden">عدد</span>
          </div>
        </div>

        {/* ناوبری صفحات - کامپکت برای موبایل */}
        <div className="flex items-center justify-center w-full" dir="ltr">
          {/* دکمه صفحه اول و قبلی */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* دکمه صفحه اول - مخفی در موبایل */}
            {!isMobile && (
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage <= 1 || isChanging}
                className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 group"
                title="صفحه اول"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* دکمه قبلی */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1 || isChanging}
              className="flex items-center justify-center w-16 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 group"
              title="صفحه قبلی"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-5 md:w-5 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-xs md:text-sm font-medium mr-1 group-hover:text-blue-600 hidden md:inline">قبلی</span>
            </button>
          </div>

          {/* شماره صفحات */}
          <div className="flex items-center gap-1 md:gap-2 mx-1 md:mx-2">
            {/* صفحه اول برای موبایل */}
            {isMobile && currentPage > 2 && (
              <button
                onClick={() => handlePageChange(1)}
                disabled={isChanging}
                className="w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl border border-gray-200 bg-white hover:bg-blue-50 transition-all duration-300 text-xs md:text-base"
              >
                ۱
              </button>
            )}

            {/* نقطه چین اول */}
            {!isMobile && currentPage > 3 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl border transition-all duration-300 hover:scale-105 text-sm md:text-base"
                >
                  ۱
                </button>
                <span className="text-gray-400 px-1">...</span>
              </>
            )}

            {/* صفحات اصلی */}
            {pageNumbers.map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                disabled={isChanging}
                className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl border transition-all duration-300 ${
                  currentPage === pageNum
                    ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-600 shadow-md md:shadow-lg scale-105"
                    : "bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                } ${isChanging ? 'pointer-events-none opacity-70' : ''}`}
              >
                <span className={`font-bold text-sm md:text-base ${currentPage === pageNum ? 'text-white' : 'text-gray-700'}`}>
                  {pageNum.toLocaleString('fa-IR')}
                </span>
              </button>
            ))}

            {/* نقطه چین آخر */}
            {!isMobile && currentPage < totalPages - 2 && (
              <>
                <span className="text-gray-400 px-1">...</span>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl border transition-all duration-300 hover:scale-105 text-sm md:text-base"
                >
                  {totalPages.toLocaleString('fa-IR')}
                </button>
              </>
            )}

            {/* صفحه آخر برای موبایل */}
            {isMobile && currentPage < totalPages - 1 && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className="w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl border border-gray-200 bg-white hover:bg-blue-50 transition-all duration-300 text-xs md:text-base"
              >
                {totalPages.toLocaleString('fa-IR')}
              </button>
            )}
          </div>

          {/* دکمه بعدی و آخر */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* دکمه بعدی */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || isChanging}
              className="flex items-center justify-center w-16 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 group"
              title="صفحه بعدی"
            >
              <span className="text-xs md:text-sm font-medium ml-1 group-hover:text-blue-600 hidden md:inline">بعدی</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-5 md:w-5 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* دکمه صفحه آخر - مخفی در موبایل */}
            {!isMobile && (
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage >= totalPages || isChanging}
                className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 group"
                title="صفحه آخر"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* ورودی جستجوی صفحه - مخفی در موبایل */}
        {!isMobile && (
          <div className="mt-2 md:mt-4 flex items-center gap-2 md:gap-3">
            <div className="relative">
              <input
                type="number"
                min="1"
                max={totalPages}
                defaultValue={currentPage}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= totalPages) {
                      handlePageChange(page);
                    }
                  }
                }}
                className="w-24 md:w-28 px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-center font-bold text-sm md:text-base"
                placeholder="شماره صفحه"
              />
              <div className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button
              onClick={(e) => {
                const input = e.target.previousElementSibling?.querySelector('input');
                if (input) {
                  const page = parseInt(input.value);
                  if (page >= 1 && page <= totalPages) {
                    handlePageChange(page);
                  }
                }
              }}
              className="px-3 md:px-4 py-2 md:py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg md:rounded-xl hover:from-blue-600 hover:to-blue-700 active:scale-95 transition-all duration-300 font-bold text-sm md:text-base shadow-md hover:shadow-lg"
            >
              برو
            </button>
          </div>
        )}

        {/* نسخه موبایل فشرده برای انتخاب صفحه */}
        {isMobile && totalPages > 3 && (
          <div className="mt-2 w-full max-w-xs">
            <select
              value={currentPage}
              onChange={(e) => handlePageChange(parseInt(e.target.value))}
              disabled={isChanging}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-center font-bold"
            >
              <option value="" disabled>انتخاب صفحه</option>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <option key={page} value={page}>
                  صفحه {page.toLocaleString('fa-IR')}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* لودینگ */}
        {isChanging && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
            <div className="flex flex-col items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 border-3 md:border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <span className="text-xs md:text-sm text-gray-600">در حال تغییر صفحه...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
