import Image from "next/image";
import { notFound } from "next/navigation";

// تابع گرفتن دیتای محصول از جنگو
async function getProduct(id) {
    const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
        cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
}

export default async function ProductDetailPage({ params }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) notFound();

    return (
        <div className="container mx-auto px-4 py-12">
            {/* بخش اصلی محصول */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-sm border mb-12">
                <div className="relative h-[400px] w-full rounded-xl overflow-hidden bg-gray-50">
                    <img
                        src={product.thumbnail || "/placeholder.png"}
                        alt={product.title}
                        className="object-contain w-full h-full"
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
                    <div className="text-2xl font-semibold text-blue-600 mb-6">
                        ${Number(product.price).toLocaleString()}
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

                    {/* نمایش ویژگی‌های فنی (Dimensions) */}
                    <div className="bg-gray-50 p-4 rounded-lg text-sm grid grid-cols-3 gap-4">
                        <div>عرض: {product.dimensions?.width}</div>
                        <div>ارتفاع: {product.dimensions?.height}</div>
                        <div>عمق: {product.dimensions?.depth}</div>
                    </div>
                </div>
            </div>

            {/* بخش نظرات - کامپوننت‌وار */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border">
                <h2 className="text-2xl font-bold mb-8">نظرات کاربران ({product.reviews?.length || 0})</h2>

                {product.reviews && product.reviews.length > 0 ? (
                    <div className="space-y-6">
                        {product.reviews.map((rev, index) => (
                            <div key={index} className="border-b last:border-0 pb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-gray-800">{rev.reviewer_name}</span>
                                    <span className="text-yellow-500">{"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}</span>
                                </div>
                                <p className="text-gray-600 italic">{rev.comment}</p>
                                <div className="text-xs text-gray-400 mt-2">
                                    {new Date(rev.date).toLocaleDateString('fa-IR')}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">هنوز نظری برای این محصول ثبت نشده است.</p>
                )}
            </div>
        </div>
    );
}
