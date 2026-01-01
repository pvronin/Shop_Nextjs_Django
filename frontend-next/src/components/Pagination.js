"use client"; // چون از اینتراکشن و useRouter استفاده می‌کنیم

import { useRouter, usePathname } from "next/navigation";

export default function Pagination({ currentPage }) {
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    // تغییر آدرس URL به /shop?page=X
    router.push(`${pathname}?page=${newPage}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 py-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition-colors"
      >
        قبلی
      </button>

      <span className="font-bold text-lg">
        صفحه {currentPage}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        بعدی
      </button>
    </div>
  );
}
