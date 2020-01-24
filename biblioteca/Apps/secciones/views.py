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

from Apps.secciones.models import seccion
from Apps.secciones.serializers import SeccionSerializer

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'Error':'Favor de completar los campos'}, status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({"Error":"Credenciales no validas"}, status=HTTP_404_NOT_FOUND)

    token, _ = Token.objects.get_or_create(user=user)
    print(_)
    return Response({"token":token.key, "id":str(user.id)}, status=HTTP_200_OK)

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def registro(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")
    number = request.data.get("number")

    if username=="" or password=="" or email=="" or number=="":
        return Response({"Error":"Favor de completar todos los campos"}, status=HTTP_400_BAD_REQUEST)
    else:
        user, created = User.objects.get_or_create(username=username)
        if created:
            # USUARIO CREADO
            user.set_password(password)
            user.email=email
            user.save()
            return Response({"Registrado": "Usuario registrado exitosamente"}, status=HTTP_200_OK)
        else:
            # YA EXISTE
            return Response({"Error": "El usuario ya existe"}, status=HTTP_400_BAD_REQUEST)


class SeccionesViewSet(viewsets.ModelViewSet):
    queryset = seccion.objects.all()
    serializer_class = SeccionSerializer