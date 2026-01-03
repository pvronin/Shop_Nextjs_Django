from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from .models import Product
from productcomment.models import Review
from django.utils import timezone # اضافه کردن این خط

class ShopIntegrationTest(TestCase):
    def setUp(self):
        # ساخت یک محصول تستی
        self.product = Product.objects.create(
            title="گوشی تستی",
            price=1000,
            stock=10
        )
        # ساخت یک نظر برای آن محصول
        Review.objects.create(
            product=self.product,
            reviewer_name="علی",
            reviewer_email="ali@test.com", # اضافه کردن ایمیل (چون در مدل اجباری است)
            rating=5,
            comment="تست عالی",
            date=timezone.now() # <--- اضافه کردن تاریخ فعلی برای حل مشکل
        )

    def test_product_list_pagination(self):
        # آدرس API محصولات
        url = '/api/products/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('count', response.data)
        self.assertIn('results', response.data)

    def test_product_with_reviews(self):
        # آدرس API جزئیات محصول
        url = f'/api/products/{self.product.id}/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # چک کردن فیلد کامنت‌ها در خروجی سریالایزر محصول
        self.assertIn('reviews', response.data)
        self.assertTrue(len(response.data['reviews']) > 0)
