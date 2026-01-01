import Link from "next/link"

// src/components/ProductCard.js
export default function ProductCard({ item }) {
    return (
        <Link href={`/product/${item.id}`}>
            <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 truncate">{item.title}</h3>
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-xl font-black text-emerald-600">${item.price}</span>
                        <button className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors">
                            +
                        </button>
                    </div>
                </div>
            </div>
        </Link>

    );
}
