# backendpy/products/views.py

from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Product
from .serializers import ProductSerializer
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django_filters import rest_framework as django_filters

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 12
    # استفاده از 'page' به جای 'limit' برای استاندارد پجینیشن جنگو
    page_query_param = 'page'
    page_size_query_param = 'page_size'
    max_page_size = 100

# تعریف کلاس فیلتر برای حل مشکل TypeError
# تعریف کلاس فیلتر برای حل مشکل TypeError و هماهنگی با Slug
# backendpy/products/views.py

# فقط این بخش کلاس ProductFilter را اصلاح کنید:
class ProductFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='category_relation__slug', lookup_expr='exact')

    # این خط را اضافه کنید:
    # ما به جنگو-فیلتر می‌گوییم پارامتر 'ordering' را نادیده نگیر و از آن برای مرتب‌سازی استفاده کن
    ordering = django_filters.OrderingFilter(
        fields=(
            ('price', 'price'),
            ('rating', 'rating'),
            ('id', 'id'),
        ),
    )

    class Meta:
        model = Product
        fields = {
            'price': ['gte', 'lte'],
            'rating': ['gte'],
        }

class ProductListAPI(ListAPIView):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    filterset_class = ProductFilter

    search_fields = ['title', 'description']
    ordering_fields = ['price']

class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
