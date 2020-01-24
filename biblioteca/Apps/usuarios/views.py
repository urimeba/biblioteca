from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

from Apps.usuarios.models import usuario, tipoUsuario
from Apps.usuarios.serializers import UsuarioSerializer, tipoUsuarioSerializer, UserSerializer
from django.contrib.auth.models import User

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = usuario.objects.all()
    serializer_class = UsuarioSerializer

class tipoUsuarioViewSet(viewsets.ModelViewSet):
    queryset = tipoUsuario.objects.all()
    serializer_class = tipoUsuarioSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer