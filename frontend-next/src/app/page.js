import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";

// تابع گرفتن دیتا برای صفحه اصلی
async function getHomeProducts(limit = 4) {
  // ما فقط صفحه اول را می‌خواهیم، اما در سمت فرانت فقط به اندازه limit جدا می‌کنیم
  const res = await fetch(`http://127.0.0.1:8000/api/products/?page=1`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  const data = await res.json();

  // فقط تعداد مورد نیاز (مثلاً ۳ تا) را جدا می‌کنیم
  return data.results.slice(0, limit);
}

export default async function HomePage() {
  // ۱. گرفتن محصولات جدید (فقط ۳ عدد)
  const products = await getHomeProducts(4);

  return (
    <div>
      {/* بخش بنر اصلی */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">به فروشگاه ما خوش آمدید</h1>
        <p className="mt-4 text-blue-100">جدیدترین محصولات را در صفحه فروشگاه ببینید</p>
        <Link href="/shop" className="inline-block mt-6 bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg">
          ورود به فروشگاه
        </Link>
      </section>

      {/* بخش ویترین محصولات */}
      <section className="container mx-auto py-16 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">جدیدترین محصولات</h2>
          <Link href="/shop" className="text-blue-600 hover:underline">مشاهده همه ←</Link>
        </div>

        {/* ۲. حالا محصولات را به گرید پاس می‌دهیم */}
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
