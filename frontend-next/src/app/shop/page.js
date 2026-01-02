import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";

// تابع مستقیم برای گرفتن دیتا از API جنگو
async function getShopData(page) {
    const res = await fetch(`http://127.0.0.1:8000/api/products/?page=${page}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return { results: [], count: 0 };
    }

    return res.json();
}

export default async function ShopPage({ searchParams }) {
    // ۱. گرفتن صفحه فعلی از URL
    const sp = await searchParams;
    const page = parseInt(sp.page) || 1;

    // ۲. دریافت دیتا (شامل لیست محصولات و تعداد کل)
    const data = await getShopData(page);


    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">فروشگاه محصولات</h1>
                <p className="text-gray-500">تعداد کل کالاها: {data.count.toLocaleString('fa-IR')}</p>
            </div>

            {/* ۳. نمایش محصولات - حالا لیست محصولات را مستقیم به آن می‌دهیم */}
            <ProductGrid products={data.results} />

            {/* ۴. کامپوننت پجینیشن پیشرفته */}
            <div className="mt-12">
                <Pagination
                    currentPage={page}
                    totalCount={data.count}
                    pageSize={12}
                />
            </div>
        </main>
    );
}
