"use client";

import { useRouter, usePathname } from "next/navigation";

export default function Pagination({ currentPage, totalCount, pageSize = 12 }) {
  const router = useRouter();
  const pathname = usePathname();

  // محاسبه تعداد کل صفحات
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    router.push(`${pathname}?page=${newPage}`);
  };

  // منطق برای نمایش شماره صفحات (مثلاً اگر صفحه 10 هستیم، 8 9 10 11 12 را نشان دهد)
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) return null; // اگر کلاً یک صفحه بود، چیزی نشان نده

  return (
    <div className="flex justify-center items-center gap-2 py-10" dir="rtl">
      {/* دکمه قبلی */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-2 border rounded-lg disabled:opacity-30 hover:bg-gray-100"
      >
        قبلی
      </button>

      {/* شماره صفحات اول (اگر خیلی دور شدیم) */}
      {currentPage > 3 && (
        <>
          <button onClick={() => handlePageChange(1)} className="px-3 py-2 border rounded-lg">۱</button>
          <span className="px-2">...</span>
        </>
      )}

      {/* نمایش شماره صفحات اطراف صفحه فعلی */}
      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
          className={`w-10 h-10 rounded-lg border transition-all ${
            currentPage === pageNum
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "hover:bg-gray-100 border-gray-200"
          }`}
        >
          {pageNum.toLocaleString('fa-IR')} {/* نمایش اعداد به فارسی */}
        </button>
      ))}

      {/* شماره صفحات آخر */}
      {currentPage < totalPages - 2 && (
        <>
          <span className="px-2">...</span>
          <button onClick={() => handlePageChange(totalPages)} className="px-3 py-2 border rounded-lg">
            {totalPages.toLocaleString('fa-IR')}
          </button>
        </>
      )}

      {/* دکمه بعدی */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-2 border rounded-lg disabled:opacity-30 hover:bg-gray-100"
      >
        بعدی
      </button>
    </div>
  );
}
