import ProductCard from "./ProductCard";

export default async function ProductGrid({ currentPage = 1, limit = null }) {
  // ۱. فراخوانی داده‌ها از API جنگو
  // نکته: اگر limit داشته باشیم یعنی در صفحه اصلی هستیم، در غیر این صورت در شاپ هستیم
  const res = await fetch(
    `http://127.0.0.1:8000/api/products/?page=${currentPage}`,
    { cache: "no-store" } // برای اینکه همیشه دیتای تازه بگیریم
  );

  if (!res.ok) {
    return <div className="text-center py-10">خطا در بارگذاری محصولات...</div>;
  }

  const data = await res.json();

  // اگر لیمیت داشتیم (مثلاً برای ویترین صفحه اصلی)، فقط تعداد مشخصی را نشان می‌دهیم
  const products = limit ? data.results.slice(0, limit) : data.results;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} item={product} />
      ))}

      {products.length === 0 && (
        <p className="col-span-full text-center text-gray-500">محصولی یافت نشد.</p>
      )}
    </div>
  );
}
