from unicodedata import name
import uuid
from django.db import models
from django.contrib import admin


# Create your models here.
class CatModel(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    timezone = models.CharField(max_length=50)

    def __str__(self):
            return self.name

    class Meta:
        verbose_name_plural = "Cat Details"


class CatDetails(admin.ModelAdmin):
    list_display = ('id', 'name', 'color', 'timezone')
