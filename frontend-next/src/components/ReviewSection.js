export default function ReviewSection({ reviews }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border mt-12">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">
        نظرات کاربران ({reviews?.length || 0})
      </h2>

      {reviews && reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((rev, index) => (
            <div key={index} className="border-b last:border-0 pb-6 group">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-700">{rev.reviewer_name}</span>
                <div className="flex text-yellow-400">
                  {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                {rev.comment}
              </p>
              <time className="block text-xs text-gray-400 mt-3">
                {new Date(rev.date).toLocaleDateString('fa-IR')}
              </time>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">هنوز نظری برای این محصول ثبت نشده است.</p>
      )}
    </div>
  );
}
