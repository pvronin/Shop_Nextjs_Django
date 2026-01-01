from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    # این ستون‌ها در لیست نظرات نمایش داده می‌شوند
    list_display = ('id', 'product', 'reviewer_name', 'rating', 'date')

    # امکان فیلتر کردن نظرات بر اساس امتیاز و محصول
    list_filter = ('rating', 'product')

    # قابلیت جستجو در نام نویسنده و متن کامنت
    search_fields = ('reviewer_name', 'comment')

    # نمایش فیلد تاریخ به صورت خواناتر
    readonly_fields = ('date',)
