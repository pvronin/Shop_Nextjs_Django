import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";

export default async function ShopPage({ searchParams }) {
  // گرفتن صفحه فعلی از URL
  const sp = await searchParams;
  const page = parseInt(sp.page) || 1;

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-8">فروشگاه محصولات</h1>

      {/* نمایش محصولات بر اساس صفحه فعلی */}
      <ProductGrid currentPage={page} />

      {/* دکمه‌های جابجایی بین صفحات */}
      <Pagination currentPage={page} />
    </main>
  );
}
