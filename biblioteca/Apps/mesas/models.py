from django.db import models

# Create your models here.
class mesa(models.Model):
    seccion = models.ForeignKey('secciones.seccion', on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=30)
    activa = models.BooleanField(default=False)

class reservas(models.Model):
    # FALTA USUARIO
    mesa = models.ForeignKey('mesas.mesa', on_delete=models.CASCADE)
    inicio = models.DateTimeField(auto_now=False, auto_now_add=False)
    termino = models.DateTimeField(auto_now=False, auto_now_add=False)