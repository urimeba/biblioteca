from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class tipoUsuario(models.Model):
    tipoUsuario = models.CharField(max_length=1)
    descripcion = models.CharField(max_length=50)

class usuario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    tipoUsuario = models.ForeignKey('tipoUsuario', on_delete=models.CASCADE)
    numero = models.BigIntegerField()
    
