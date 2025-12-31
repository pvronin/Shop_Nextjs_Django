// src/components/Pagination.js
import Link from 'next/link';

export default function Pagination({ currentPage, hasNext, hasPrevious, totalPages }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {/* دکمه قبلی */}
      {hasPrevious && (
        <Link
          href={`?page=${currentPage - 1}`}
          className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
        >
          قبلی
        </Link>
      )}

      {/* شماره صفحات */}
      {pages.map((p) => (
        <Link
          key={p}
          href={`?page=${p}`}
          className={`px-4 py-2 rounded-lg border ${
            p === currentPage ? 'bg-emerald-600 text-white' : 'bg-white hover:bg-gray-50'
          }`}
        >
          {p}
        </Link>
      ))}

      {/* دکمه بعدی */}
      {hasNext && (
        <Link
          href={`?page=${currentPage + 1}`}
          className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
        >
          بعدی
        </Link>
      )}
    </div>
  );
}
