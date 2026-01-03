from rest_framework import serializers
from .models import Product
# ایمپورت کردن سریالایزر از اپلیکیشن دیگر
from productcomment.serializers import ReviewSerializer
from productcategories.serializers import CategorySerializer # وارد کردن سریالایزر دسته

class ProductSerializer(serializers.ModelSerializer):
    # اضافه کردن فیلد کامنت‌ها به خروجی محصول
    category = CategorySerializer(read_only=True)
    # related_name در مدل Review باید 'reviews' باشد
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__' # یا لیست فیلدهایی که داری
