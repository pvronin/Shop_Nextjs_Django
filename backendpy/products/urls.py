from django.urls import path
from .views import ProductListAPI,ProductDetailView

urlpatterns = [
    path('', ProductListAPI.as_view()), # آدرس نهایی: api/products/
    path('<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
]
