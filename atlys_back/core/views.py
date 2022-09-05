from django.shortcuts import render
from rest_framework import generics

from core.models import CatModel
from core.serializers import CatSerializer


# Create your views here.
class CatViewCR(generics.ListCreateAPIView):
    queryset = CatModel.objects.all()
    serializer_class = CatSerializer


class CatViewUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = CatModel.objects.all()
    serializer_class = CatSerializer