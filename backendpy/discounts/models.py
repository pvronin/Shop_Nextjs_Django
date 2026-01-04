from django.db import models
from products.models import Product # ایمپورت مدل محصول
from django.utils import timezone

class Discount(models.Model):
    # اتصال به محصول از طریق ForeignKey
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='active_discounts')

    title = models.CharField(max_length=100, help_text="مثلا: تخفیف شب یلدا")
    percent = models.PositiveIntegerField() # درصد تخفیف

    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)

    def is_currently_valid(self):
        now = timezone.now()
        return self.is_active and self.start_date <= now <= self.end_date

    def __str__(self):
        return f"{self.percent}% - {self.product.title}"
