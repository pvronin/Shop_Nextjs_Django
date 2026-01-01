from django.db import models
from products.models import Product # ایمپورت مدل محصول برای ایجاد رابطه

class Review(models.Model):
    # رابطه یک به چند: هر محصول چند نظر دارد
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')

    reviewer_name = models.CharField(max_length=255)
    reviewer_email = models.EmailField()
    rating = models.IntegerField()
    comment = models.TextField()
    date = models.DateTimeField()

    def __str__(self):
        return f"نظر {self.reviewer_name} برای {self.product.title}"
