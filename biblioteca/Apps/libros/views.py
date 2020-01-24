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
from django.db.models import Q

from Apps.libros.models import libro
from Apps.libros.serializers import LibroSerializer

# Create your views here.
class LibroViewSet(viewsets.ModelViewSet):
    queryset = libro.objects.all()
    serializer_class = LibroSerializer

    @action(detail=False)
    def recent_libros(self, request):
        recent_libros = libro.objects.all().order_by('-titulo')

        page = self.paginate_queryset(recent_libros)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(recent_libros, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def search_libros(self, request):
    	cadena = request.data.get('cadena')
    	# print(cadena)
        # qs = User.objects.filter(Q(first_name__startswith='R')|Q(last_name__startswith='D'))
    	search_libros = libro.objects.filter(Q(titulo__icontains=cadena) | Q(autor__icontains=cadena) | Q(titulo__icontains=cadena) | Q(isbn__icontains=cadena) | Q(editorial__icontains=cadena) )

    	page = self.paginate_queryset(search_libros)
    	if page is not None:
    		serializer = self.get_serializer(page, many=True)
    		return self.get_paginated_response(serializer.data)

    	serializer = self.get_serializer(search_libros, many=True)
    	return Response(serializer.data)




