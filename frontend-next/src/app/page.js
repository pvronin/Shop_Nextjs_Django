import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";

export default function HomePage() {
  return (
    <div>
      {/* بخش بنر اصلی */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">به فروشگاه ما خوش آمدید</h1>
        <p className="mt-4">جدیدترین محصولات را در صفحه فروشگاه ببینید</p>
        <Link href="/shop" className="inline-block mt-6 bg-white text-blue-600 px-6 py-2 rounded-lg font-medium">
          ورود به فروشگاه
        </Link>
      </section>

      {/* بخش ویترین محصولات (فقط چند مورد محدود) */}
      <section className="container mx-auto py-12">
        <h2 className="text-xl font-bold mb-6">جدیدترین محصولات</h2>
        <ProductGrid limit={4} /> {/* اینجا می‌توانیم با پاس دادن پروپس، تعداد را محدود کنیم */}
      </section>
    </div>
  );
}
