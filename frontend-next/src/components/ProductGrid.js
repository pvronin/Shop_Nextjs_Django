// src/components/ProductGrid.js
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
    if (!products || products.length === 0) {
        return <div className="text-center py-20 text-gray-500 text-xl">محصولی یافت نشد.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product) => (
                <ProductCard key={product.id} item={product} />
            ))}
        </div>
    );
}
