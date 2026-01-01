from rest_framework import serializers
from .models import Product
# ایمپورت کردن سریالایزر از اپلیکیشن دیگر
from productcomment.serializers import ReviewSerializer

class ProductSerializer(serializers.ModelSerializer):
    # اضافه کردن فیلد کامنت‌ها به خروجی محصول
    # related_name در مدل Review باید 'reviews' باشد
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'description', 'price',
            'category', 'thumbnail', 'dimensions',
            'meta', 'rating', 'stock', 'reviews' # حتما reviews را اینجا اضافه کن
        ]
