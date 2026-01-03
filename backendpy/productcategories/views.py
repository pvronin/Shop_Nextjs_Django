from rest_framework.generics import ListAPIView
from .models import Category
from .serializers import CategorySerializer

class CategoryListAPI(ListAPIView):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    pagination_class = None # برای لیست سایدبار نیازی به پجینیشن نیست
