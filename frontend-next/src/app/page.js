// src/app/page.js
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';

async function getProducts(page = 1) {
  const res = await fetch(`http://127.0.0.1:8000/api/products/?page=${page}`, {
    cache: 'no-store'
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function Home({ searchParams }) {
  // گرفتن شماره صفحه از URL (پیش‌فرض 1)
  const pageParam = await searchParams;
  const currentPage = parseInt(pageParam.page) || 1;

  const data = await getProducts(currentPage);

  if (!data) return <div className="text-center p-20">خطا در بارگذاری محصولات...</div>;

  const totalPages = Math.ceil(data.count / 12); // فرض بر این است که در هر صفحه 12 محصول دارید

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-12 text-gray-900">
          فروشگاه مدرن ما
        </h1>

        {/* لیست محصولات با کامپوننت کارت */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.results.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        {/* کامپوننت صفحه‌بندی */}
        <Pagination
          currentPage={currentPage}
          hasNext={!!data.next}
          hasPrevious={!!data.previous}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
}
