"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // ۱. ایجاد یک State برای ذخیره دسته‌بندی‌ها
    const [categories, setCategories] = useState([]);

    // ۲. اجرای درخواست fetch به محض بالا آمدن کامپوننت
    useEffect(() => {
        const getCategories = async () => {
            const res = await fetch("http://127.0.0.1:8000/api/categories/");
            const data = await res.json();
            setCategories(data); // ذخیره دیتا در استیت
        };
        getCategories();
    }, []);

    const updateFilter = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set(key, value);
        else params.delete(key);
        params.set("page", 1);
        router.push(`/shop?${params.toString()}`, { scroll: false });
    };

    return (
        <aside className="w-full md:w-64 space-y-6 bg-white p-6 rounded-2xl border shadow-sm h-fit">


            <div className="mb-6">
                <h3 className="font-bold mb-4 text-gray-900 text-right">ترتیب مشاهده</h3>
                <select
                    onChange={(e) => updateFilter("ordering", e.target.value)}
                    value={searchParams.get("ordering") || ""}
                    className="w-full border rounded-lg px-2 py-2 text-sm bg-white outline-none text-right"
                >
                    <option value="">پیش‌فرض (جدیدترین)</option>
                    <option value="-rating">محبوب‌ترین</option>
                    <option value="-price">گران‌ترین</option>
                    <option value="price">ارزان‌ترین</option>
                </select>
            </div>

            <div>
                <h3 className="font-bold mb-4 text-gray-900">دسته‌بندی‌ها</h3>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => updateFilter("category", "")}
                        className={`text-right text-sm py-1 ${!searchParams.get("category") ? "text-blue-600 font-bold" : "text-gray-500"}`}
                    >
                        همه کالاها
                    </button>

                    {/* ۳. نمایش دیتای دریافتی */}
                    {categories.map(cat => (
                        <button
                            key={cat.id} // حتما از یک کلید منحصر به فرد مثل id استفاده کنید
                            onClick={() => updateFilter("category", cat.slug)}
                            className={`text-right text-sm py-1 capitalize ${searchParams.get("category") === cat.slug ? "text-blue-600 font-bold" : "text-gray-500"}`}
                        >
                            {cat.name} {/* فیلد نام در دیتابیس شما */}
                        </button>
                    ))}
                </div>
            </div>

            {/* بقیه فیلترها (امتیاز و قیمت) بدون تغییر باقی می‌مانند */}
            <div className="border-t pt-6 mt-6">
                <h3 className="font-bold mb-4 text-gray-900">حداقل امتیاز</h3>
                <select
                    onChange={(e) => updateFilter("minRating", e.target.value)}
                    value={searchParams.get("minRating") || ""}
                    className="w-full border rounded-lg px-2 py-2 text-sm bg-white"
                >
                    <option value="">همه امتیازها</option>
                    <option value="4.5">4.5 ستاره و بالاتر</option>
                    <option value="4">4 ستاره و بالاتر</option>
                    <option value="3">3 ستاره و بالاتر</option>
                </select>
            </div>



            <div className="border-t pt-6">
                <h3 className="font-bold mb-4 text-gray-900">محدوده قیمت ($)</h3>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="از"
                        className="w-1/2 border rounded-lg px-2 py-1 text-sm text-right"
                        onBlur={(e) => updateFilter("minPrice", e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="تا"
                        className="w-1/2 border rounded-lg px-2 py-1 text-sm text-right"
                        onBlur={(e) => updateFilter("maxPrice", e.target.value)}
                    />
                </div>
            </div>

            <button
                onClick={() => router.push('/shop')}
                className="w-full mt-4 py-2 text-sm text-red-500 border border-red-500 rounded-xl hover:bg-red-50 transition-colors"
            >
                پاک کردن همه فیلترها
            </button>
        </aside>
    );
}
