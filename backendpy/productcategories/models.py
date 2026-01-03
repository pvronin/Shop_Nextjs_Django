from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="نام دسته‌بندی")
    slug = models.SlugField(max_length=120, unique=True, verbose_name="اسلاگ")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"
