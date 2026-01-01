import os
import sys
import django
import requests
from django.utils.dateparse import parse_datetime

# ۱. تنظیم محیط جنگو
# نام پوشه اصلی پروژه (جایی که settings.py هست) را چک کن. اگر core است، بگذار بماند.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

# ۲. ایمپورت مدل‌ها از دو اپلیکیشن متفاوت
from products.models import Product
from productcomment.models import Review

def import_all_data():
    # گرفتن تمام محصولات با پارامتر limit=0 برای حل مشکل ۳۰ تا محصول
    url = "https://dummyjson.com/products?limit=0"

    try:
        print("🚀 در حال دریافت اطلاعات از API...")
        response = requests.get(url)
        data = response.json()
        products_list = data.get('products', [])
        print(f"📦 تعداد {len(products_list)} محصول پیدا شد.")

        for item in products_list:
            # الف) ساخت یا آپدیت محصول اصلی
            product_obj, created = Product.objects.update_or_create(
                id=item['id'],
                defaults={
                    'title': item['title'],
                    'description': item['description'],
                    'price': item['price'],
                    'category': item['category'],
                    'thumbnail': item['thumbnail'],
                    'dimensions': item['dimensions'],
                    'meta': item['meta'],
                    'rating': item['rating'],
                    'stock': item['stock'],
                }
            )

            status = "✅ ساخته شد" if created else "🔄 آپدیت شد"
            print(f"{status}: {product_obj.title}")

            # ب) مدیریت نظرات (Reviews) مربوط به هر محصول
    # ب) مدیریت نظرات (Reviews) مربوط به هر محصول
            reviews_data = item.get('reviews', [])
            if not reviews_data:
                print(f"   ⚠️ هیچ نظری برای {product_obj.title} در API نبود.")

            for rev in reviews_data:
                rev_obj, rev_created = Review.objects.update_or_create(
                    product=product_obj,
                    reviewer_email=rev['reviewerEmail'],
                    date=parse_datetime(rev['date']),
                    defaults={
                        'reviewer_name': rev['reviewerName'],
                        'rating': rev['rating'],
                        'comment': rev['comment'],
                    }
                )
                if rev_created:
                    print(f"   💬 نظر جدید از {rev_obj.reviewer_name} اضافه شد.")

    except Exception as e:
        print(f"❌ خطایی رخ داد: {e}")

if __name__ == "__main__":
    import_all_data()
