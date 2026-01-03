from django.db import models
from productcategories.models import Category # ایمپورت مدل جدید

class Product(models.Model):
    # این فیلدها دقیقا با خروجی dummyjson.com مطابقت دارند
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)



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
