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

from Apps.prestamos.models import prestamo, solicitud
from Apps.prestamos.serializers import PrestamoSerializer, SolicitudSerializer

# Create your views here.
class PrestamoViewSet(viewsets.ModelViewSet):
    queryset = prestamo.objects.all()
    serializer_class = PrestamoSerializer

class SolicitudViewSet(viewsets.ModelViewSet):
    queryset = solicitud.objects.all()
    serializer_class = SolicitudSerializer

    @action(detail=False, methods=['post'])
    def search_solicitudes(self, request):
        usuario = request.data.get('usuario')
        libro = request.data.get('libro')
        search_solicitud = solicitud.objects.filter(usuario_id=usuario, libro_id=libro, activo=1)

        page = self.paginate_queryset(search_solicitud)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(search_solicitud, many=True)
        return Response(serializer.data)
