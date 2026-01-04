from django.db import models
from productcategories.models import Category # ایمپورت مدل جدید
from django.utils import timezone # این خط حتما اضافه شود

class Product(models.Model):
    # این فیلدها دقیقا با خروجی dummyjson.com مطابقت دارند
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def final_price(self):
        # این متد در زمان فراخوانی، قیمت واقعی را محاسبه می‌کند
        now = timezone.now()
        # ما از related_name='active_discounts' که در مدل Discount تعریف کردیم استفاده می‌کنیم
        discount = self.active_discounts.filter(
            is_active=True,
            start_date__lte=now,
            end_date__gte=now
        ).first()

        if discount:
            # تبدیل به فلوت یا دسیمال برای محاسبات دقیق ریاضی
            return float(self.price) * (1 - discount.percent / 100)
        return self.price

    # فیلد جدید را با نامی که در اسکریپت استفاده کردیم (category_relation) نگه دار

    # فیلد جدید عددی
    category_relation = models.ForeignKey(
        'productcategories.Category',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='products'
    )
    thumbnail = models.URLField(max_length=500)
    stock = models.IntegerField(default=0)

    dimensions = models.JSONField(default=dict) # ذخیره width, height, depth
    meta = models.JSONField(default=dict)       # ذخیره createdAt, barcode و غیره

    rating = models.FloatField(default=0.0)


    def __str__(self):
        return self.title
