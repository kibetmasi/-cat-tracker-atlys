from django.urls import path

from core.views import CatViewCR, CatViewUD

urlpatterns = [
    path('list', CatViewCR.as_view(), name = 'create, list'),
    path('delete/<pk>', CatViewUD.as_view(), name='update, delete')
]
