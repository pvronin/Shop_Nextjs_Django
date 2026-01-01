from rest_framework.generics import ListAPIView
from .models import Product
from .serializers import ProductSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'limit' # این اجازه می‌دهد که کاربر خودش بگوید چند تا محصول (مثل limit در dummyjson)
    max_page_size = 100

class ProductListAPI(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination # اینجا کلاس بالا را معرفی می‌کنیم

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
