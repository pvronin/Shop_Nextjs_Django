// src/components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <span className="text-xl font-black text-emerald-600">NEXTSHOP</span>
            <p className="mt-4 text-gray-500 text-sm leading-relaxed">
              بهترین تجربه خرید آنلاین با استفاده از جدیدترین تکنولوژی‌های وب. امنیت و سرعت اولویت ماست.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-emerald-600 transition">پیگیری سفارش</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition">سوالات متداول</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition">قوانین و مقررات</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">خدمات مشتریان</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-emerald-600 transition">تماس با پشتیبانی</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition">بازگشت کالا</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">خبرنامه</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="ایمیل شما" className="bg-gray-100 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-emerald-500" />
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">ثبت</button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} تمام حقوق این سایت محفوظ است.
        </div>
      </div>
    </footer>
  );
}
