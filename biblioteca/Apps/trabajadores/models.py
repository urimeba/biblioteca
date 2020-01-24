from django.db import models
# from Apps.usuarios.models import

# Create your models here.
class trabajador(models.Model):
    usuario = models.ForeignKey('usuarios.usuario', on_delete=models.CASCADE)
    fechaIngreso = models.DateField()
    salario = models.PositiveIntegerField()


