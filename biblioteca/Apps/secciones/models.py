from django.db import models

# Create your models here.
class seccion(models.Model):
    nombre = models.CharField(max_length=30)
    numLibros = models.IntegerField()
    