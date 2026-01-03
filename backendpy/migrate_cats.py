import os
import sys
import django
from django.utils.text import slugify

# اضافه کردن مسیر فعلی به پایتون برای شناسایی ماژول‌ها
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# با توجه به عکس، تنظیمات شما در پوشه core است
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

try:
    django.setup()
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)

from products.models import Product
from productcategories.models import Category

def run():
    print("Migration started...")

    # ۱. تغییر نام از category به category_old (مطابق با مدل فعلی شما)
    old_cat_names = Product.objects.values_list('category_old', flat=True).distinct()

    for name in old_cat_names:
        if name:
            # ۲. ساخت دسته در جدول جدید
            cat_obj, created = Category.objects.get_or_create(
                name=name,
                defaults={'slug': slugify(name)}
            )

            # ۳. متصل کردن محصولات با استفاده از فیلد متنی جدید و فیلد رابطه‌ای
            # اینجا هم از category_old برای فیلتر و از category_relation برای آپدیت استفاده می‌کنیم
            updated_count = Product.objects.filter(category_old=name).update(category_relation=cat_obj)
            print(f"Category '{name}' synced. {updated_count} products updated.")

    print("Done!")

if __name__ == "__main__":
    run()
