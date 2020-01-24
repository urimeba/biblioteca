from django.db import models

# Create your models here.
class prestamo(models.Model):
    usuario = models.ForeignKey('usuarios.usuario', on_delete=models.CASCADE)
    libro = models.ForeignKey('libros.libro', on_delete=models.CASCADE)
    trabajador = models.ForeignKey('trabajadores.trabajador', on_delete=models.CASCADE)
    fechaSalida = models.DateField(auto_now=False, auto_now_add=True)
    fechaRegreso = models.DateField(auto_now=False, auto_now_add=False)

class solicitud(models.Model):
    choices = [
        ("0", "Pendiente"),
        ("1", "Aceptado"),
        ("2", "Rechazado")
    ]

    choices2 = [
        ("0", "Inactivo"),
        ("1", "Activo"),
    ]
    usuario = models.ForeignKey('usuarios.usuario', on_delete=models.CASCADE)
    libro = models.ForeignKey('libros.libro', on_delete=models.CASCADE)
    status = models.CharField(choices=choices, default="0", max_length=1)
    activo = models.CharField(choices=choices2, default="1", max_length=1)
