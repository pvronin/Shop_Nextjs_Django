import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar"; // این را الان می‌سازیم

// تابع آپدیت شده برای دریافت پارامترهای فیلتر
async function getShopData(page, search = "", category = "", brand = "", minPrice = "", maxPrice = "", minRating = "", ordering = "") {
    const query = new URLSearchParams({
        page: page,
        ...(search && { search }),
        ...(category && { category }),
        ...(brand && { brand }),
        ...(minPrice && { price__gte: minPrice }), // جنگو-فیلتر از __gte استفاده می‌کند
        ...(maxPrice && { price__lte: maxPrice }),
        ...(minRating && { rating__gte: minRating }),
        ...(ordering && { ordering }), // اضافه کردن ترتیب‌بندی به کوئری
    }).toString();

    const res = await fetch(`http://127.0.0.1:8000/api/products/?${query}`, {
        cache: "no-store",
    });

    if (!res.ok) return { results: [], count: 0 };
    return res.json();
}

import FilterSidebar from "@/components/FilterSidebar";

export default async function ShopPage({ searchParams }) {
    const sp = await searchParams;
    const page = parseInt(sp.page) || 1;
    const search = sp.search || "";
    const category = sp.category || "";
    const brand = sp.brand || "";
    const minPrice = sp.minPrice || "";
    const maxPrice = sp.maxPrice || "";
    const minRating = sp.minRating || "";
    const ordering = sp.ordering || ""; // ۲. گرفتن مقدار از URL

    const data = await getShopData(page, search, category, brand, minPrice, maxPrice, minRating, ordering);

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">

                {/* ستون اول: فیلترها */}
                <div className="md:w-64 flex-shrink-0">
                    <FilterSidebar />
                </div>

                {/* ستون دوم: محتوا */}
                <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <h1 className="text-2xl font-bold text-gray-800">فروشگاه</h1>
                        <SearchBar />
                        <p className="text-sm text-gray-500">
                            نمایش {data.results.length} از {data.count.toLocaleString('fa-IR')} کالا
                        </p>
                    </div>

                    <ProductGrid products={data.results} />

                    <div className="mt-12">
                        <Pagination
                            currentPage={page}
                            totalCount={data.count}
                            pageSize={12}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
