from django.contrib import admin

from core.models import CatDetails, CatModel

# Register your models here.
admin.site.register(CatModel, CatDetails)