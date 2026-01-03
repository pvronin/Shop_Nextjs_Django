from django.contrib import admin
from .models import Category

@admin.register(Category)
class ProductCategoryAdmin(admin.ModelAdmin):
    # این ستون‌ها در لیست نظرات نمایش داده می‌شوند
    list_display = ('id','name')
