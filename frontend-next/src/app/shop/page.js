import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar"; // این را الان می‌سازیم
import FilterSidebar from "@/components/FilterSidebar";

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



export default async function ShopPage({ searchParams }) {


    const sp = await searchParams;
    console.log(sp);
    const page = parseInt(sp.page) || 1;
    const search = sp.search || "";
    const category = sp.category || "";
    const brand = sp.brand || "";
    const minPrice = sp.minPrice || "";
    const maxPrice = sp.maxPrice || "";
    const minRating = sp.minRating || "";
    const ordering = sp.ordering || "";

    const data = await getShopData(page, search, category, brand, minPrice, maxPrice, minRating, ordering);

    return (
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">
            {/* سایدبار فیلتر - در موبایل بالای صفحه */}
            <div className="w-full lg:w-72 flex-shrink-0">
                <FilterSidebar />
            </div>

            {/* محتوای اصلی */}
            <div className="flex-1">
                {/* هدر */}
                <div className="flex flex-col sm:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
                    <div className="w-full md:w-auto">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">فروشگاه</h1>
                        <p className="text-xs md:text-sm text-gray-500">
                            نمایش <span className="font-bold">{data.results.length}</span> از
                            <span className="font-bold mr-1"> {data.count.toLocaleString('fa-IR')}</span> کالا
                        </p>
                    </div>
                    <div className="w-full md:w-auto">
                        <SearchBar />
                    </div>
                </div>

                {/* گرید محصولات */}
                <ProductGrid products={data.results} />

                {/* پجینیشن */}
                <div className="mt-8 md:mt-12">
                    <Pagination
                        currentPage={page}
                        totalCount={data.count}
                        pageSize={12}
                    />
                </div>
            </div>
        </div>
    );
}
