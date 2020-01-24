from django.db import models

# Create your models here.
class libro(models.Model):
    seccion = models.ForeignKey('secciones.seccion', on_delete=models.CASCADE)
    titulo = models.CharField(max_length=100)
    autor = models.CharField(max_length=100)
    isbn = models.CharField(max_length=13)
    fecha = models.DateField(auto_now=False, auto_now_add=False)
    paginas = models.PositiveIntegerField()
    editorial = models.CharField(max_length=100)
    existencias = models.PositiveIntegerField()
    activo = models.BooleanField(default=True)