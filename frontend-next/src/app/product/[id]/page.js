import AddToCartSection from "@/components/AddToCartSection";
import ReviewSection from "@/components/ReviewSection";
import { notFound } from "next/navigation";

// تابع گرفتن دیتای محصول از جنگو
async function getProduct(id) {
    const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
        cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
}

// کامپوننت ستاره‌های رتبه‌بندی
function RatingStars({ rating }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <span key={i} className="text-xl">
                    {i < fullStars ? (
                        <span className="text-yellow-500">★</span>
                    ) : i === fullStars && hasHalfStar ? (
                        <span className="text-yellow-500">⭐</span>
                    ) : (
                        <span className="text-gray-300">☆</span>
                    )}
                </span>
            ))}
            <span className="text-gray-700 font-bold mr-1">{rating.toFixed(2)}</span>
        </div>
    );
}

export default async function ProductDetailPage({ params }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) notFound();

    // استخراج داده‌های متا
    const meta = product.meta || {};
    const dimensions = product.dimensions || {};

    return (
        <>
            {/* هدر محصول */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
                <div className="flex items-center gap-4 mt-2">
                    <RatingStars rating={product.rating || 0} />
                    <span className="text-gray-500">({product.reviews?.length || 0} نظر)</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">کد محصول: {product.id}</span>
                </div>
            </div>

            {/* بخش اصلی محصول */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* گالری تصاویر */}
                <div className="space-y-4">
                    <div className="h-[500px] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-8">
                        <img
                            src={product.thumbnail || "/placeholder.png"}
                            alt={product.title}
                            className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* بارکد و QR */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">بارکد محصول</div>
                                <div className="font-mono text-sm">{meta.barcode || '1255669555958'}</div>
                            </div>
                        </div>
                        {meta.Code && (
                            <div className="text-center">
                                <div className="text-xs text-gray-500 mb-1">اسکن کنید</div>
                                <img src={meta.Code} alt="QR Code" className="w-16 h-16" />
                            </div>
                        )}
                    </div>
                </div>

                {/* اطلاعات محصول */}
                <div className="space-y-8">
                    {/* وضعیت موجودی و قیمت */}
                    <div className="bg-gradient-to-r from-white to-gray-50 p-6 rounded-2xl border border-gray-200">
                        <div className="flex justify-between items-start mb-4">

                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${product.stock > 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                                <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-emerald-500" : "bg-red-500"}`}></div>
                                {product.stock > 0 ? `موجود در انبار (${product.stock} عدد)` : "ناموجود"}
                            </div>

                            <div className="text-right">
                                <div className="text-4xl font-black text-blue-600">
                                    {product.final_price.toLocaleString()} تومان
                                </div>

                                {product.final_price != product.price && product.price && (
                                    <div className="text-base text-gray-500 line-through mt-1">
                                        {product.price.toLocaleString()}
                                    </div>
                                )}
                            </div>
                        </div>

                        <AddToCartSection product={product} />
                    </div>

                    {/* ابعاد و مشخصات */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">مشخصات فنی</h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                                <div className="text-2xl font-bold text-blue-600 mb-1">{dimensions.width || '23.23'}</div>
                                <div className="text-sm text-gray-500">عرض (میلی‌متر)</div>
                            </div>

                            <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                                <div className="text-2xl font-bold text-blue-600 mb-1">{dimensions.height || '7.19'}</div>
                                <div className="text-sm text-gray-500">ارتفاع (میلی‌متر)</div>
                            </div>

                            <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                                <div className="text-2xl font-bold text-blue-600 mb-1">{dimensions.depth || '28.95'}</div>
                                <div className="text-sm text-gray-500">عمق (میلی‌متر)</div>
                            </div>

                            <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                                <div className="text-2xl font-bold text-blue-600 mb-1">ساعت</div>
                                <div className="text-sm text-gray-500">نوع محصول</div>
                            </div>
                        </div>
                    </div>

                    {/* خدمات اضافی */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-xl border border-blue-100 flex items-center gap-3">
                            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg">
                                <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h4v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1v-4a1 1 0 00-.293-.707l-2-2A1 1 0 0018 8h-2V5a1 1 0 00-1-1H3zm11 4h2l1 1v2h-3V8z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold text-gray-900">ارسال رایگان</div>
                                <div className="text-sm text-gray-600">برای خریدهای بالای ۵۰۰ هزار تومان</div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-emerald-50 to-white p-4 rounded-xl border border-emerald-100 flex items-center gap-3">
                            <div className="w-10 h-10 flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-lg">
                                <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold text-gray-900">گارانتی ۲۴ ماهه</div>
                                <div className="text-sm text-gray-600">ضمانت بازگشت کالا</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* توضیحات محصول */}
            <div className="bg-white p-6 mb-10 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg">
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    توضیحات محصول
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                    {product.description}
                </p>
            </div>

            {/* بخش نظرات */}
            <div className="bg-gradient-to-b from-white to-gray-50 p-8 rounded-2xl border border-gray-200 mb-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        نظرات کاربران
                    </h2>
                    <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold">
                        {product.reviews?.length || 0} نظر
                    </div>
                </div>

                <ReviewSection reviews={product.reviews} />
            </div>

            {/* تاریخ ایجاد و به‌روزرسانی */}
            {/* <div className="text-center text-sm text-gray-500 border-t pt-6">
                <div className="flex justify-center gap-6">
                    <div>
                        <span className="font-medium">تاریخ ایجاد:</span>
                        <span className="mr-2">
                            {meta.createdAt ? new Date(meta.createdAt).toLocaleDateString('fa-IR') : '۱۴۰۴/۰۲/۱۰'}
                        </span>
                    </div>
                    <div>
                        <span className="font-medium">آخرین به‌روزرسانی:</span>
                        <span className="mr-2">
                            {meta.updatedAt ? new Date(meta.updatedAt).toLocaleDateString('fa-IR') : '۱۴۰۴/۰۲/۱۰'}
                        </span>
                    </div>
                </div>
            </div> */}
        </>
    );
}
