"""biblioteca URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework import routers
from Apps.secciones import views as views_secciones
from Apps.mesas import views as views_mesas
from Apps.libros import views as views_libros
from Apps.prestamos import views as views_prestamos
from Apps.trabajadores import views as views_trabajadores
from Apps.usuarios import views as views_usuarios

router = routers.DefaultRouter()
router.register(r'secciones', views_secciones.SeccionesViewSet)
router.register(r'mesas', views_mesas.MesasViewSet)
router.register(r'reservas', views_mesas.ReservaViewSet )
router.register(r'libros', views_libros.LibroViewSet )
router.register(r'prestamos', views_prestamos.PrestamoViewSet )
router.register(r'trabajadores', views_trabajadores.TrabajadorViewSet )
router.register(r'usuarios', views_usuarios.UsuarioViewSet )
router.register(r'tipoUsuarios', views_usuarios.tipoUsuarioViewSet )
router.register(r'users', views_usuarios.UserViewSet )
router.register(r'solicitudes', views_prestamos.SolicitudViewSet )


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),

    path('', include(router.urls)),
    path('api-login', views_secciones.login),
    path('registro', views_secciones.registro),
    path('trabajador/', include('Apps.trabajadores.urls')),
    
    

]
