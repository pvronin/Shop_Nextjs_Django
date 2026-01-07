"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
# اضافه کردن این خط برای حل مشکل ارور:
from productcategories.views import CategoryListAPI
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/products/', include('products.urls')),
    path('api/productcomments/', include('productcomment.urls')),

    # حالا CategoryListAPI شناخته شده است
    # path('api/categories/', CategoryListAPI.as_view(), name='category-list'),
    path('api/categories/', include('productcategories.urls')),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # برای لاگین
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # برای تمدید اعتبار
    path('api/accounts/', include('accounts.urls')),
]
