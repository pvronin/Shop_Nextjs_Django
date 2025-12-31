import requests
from django.core.management.base import BaseCommand
from products.models import Product

class Command(BaseCommand):
    def handle(self, *args, **options):
        self.stdout.write("در حال دریافت اطلاعات...")
        response = requests.get('https://dummyjson.com/products?limit=200')
        data = response.json()

        for item in data['products']:
            Product.objects.create(
                title=item['title'],
                description=item['description'],
                price=item['price'],
                category=item['category'],
                thumbnail=item['thumbnail'],
                stock=item['stock']
            )

        self.stdout.write(self.style.SUCCESS(f"تعداد {len(data['products'])} محصول وارد شد!"))
