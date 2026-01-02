from rest_framework import generics
from .models import Review
from .serializers import ReviewSerializer

class ReviewListView(generics.ListAPIView):
    queryset = Review.objects.all().order_by('-date') # نمایش از جدیدترین به قدیمی‌ترین
    serializer_class = ReviewSerializer
