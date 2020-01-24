from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import user_passes_test
import datetime
from datetime import timedelta
from Apps.trabajadores.serializers import TrabajadorSerializer
from Apps.trabajadores.models import trabajador

from Apps.usuarios.models import usuario
from Apps.prestamos.models import solicitud, prestamo

class TrabajadorViewSet(viewsets.ModelViewSet):
    queryset = trabajador.objects.all()
    serializer_class = TrabajadorSerializer

def loginn(request):
    if request.method=="POST":
        user = request.POST.get('usuario')
        passw = request.POST.get('contraseña')
        user = authenticate(request, username=user, password=passw)
        if user is not None:
            usuarioLocal = usuario.objects.get(user=user)
            tipoUsuarioLocal = usuarioLocal.tipoUsuario.descripcion
            if tipoUsuarioLocal=="Trabajador":
                login(request, user)
                return HttpResponse("True")
            else:
                return HttpResponse("Para ingresar debes entrar con tu usuario de trabajador.")
        else:
            return HttpResponse("Datos incorrectos. Intenta nuevamente")
    else:
        if request.user.is_authenticated:
            return redirect('solicitudes')
        else:
            return render(request, 'login_trabajador.html')

@login_required
def solicitudes(request):
    solicitudes = solicitud.objects.all()
    return render(request, 'solicitudes.html', {'solicitudes':solicitudes})

@login_required
def aprobarSolicitud(request):
    idSolicitud = request.POST.get('idSolicitud')

    solicitudAprobada = solicitud.objects.get(id=idSolicitud)
    solicitudAprobada.status = 1
    solicitudAprobada.activo = 0
    solicitudAprobada.save()

    fechaSalida = datetime.date.today()
    fechaRegreso = datetime.date.today()+timedelta(days=30)
    libro = solicitudAprobada.libro
    usuarioT = usuario.objects.get(user=request.user)
    trabajadorT = trabajador.objects.get(usuario=usuarioT)
    prestamista = solicitudAprobada.usuario
    prestamoAprobado = prestamo(fechaSalida=fechaSalida, fechaRegreso=fechaRegreso, libro=libro, trabajador=trabajadorT, usuario=prestamista)
    prestamoAprobado.save()
    return HttpResponse("Solicitud aprobada")

@login_required
def rechazarSolicitud(request):
    idSolicitud = request.POST.get('idSolicitud')

    solicitudAprobada = solicitud.objects.get(id=idSolicitud)
    solicitudAprobada.status = 2
    solicitudAprobada.activo = 0
    solicitudAprobada.save()
    return HttpResponse("Solicitud rechazada")

@login_required
def cerrarSesion(request):
    logout(request)
    return redirect("loginn")


