// src/components/ProductGrid.js
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
    if (!products || products.length === 0) {
        return (
            <div className="text-center py-12 md:py-20 text-gray-500">
                <div className="mx-auto max-w-xs md:max-w-sm">
                    <svg className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg md:text-xl mb-2">محصولی یافت نشد</p>
                    <p className="text-sm text-gray-400">ممکن است فیلترهای اعمال شده نتیجه‌ای نداشته باشند</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {products.map((product) => (
                <ProductCard key={product.id} item={product} />
            ))}
        </div>
    );
}
