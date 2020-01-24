from Apps.usuarios.models import usuario, tipoUsuario
from django.contrib.auth.models import User
from rest_framework import serializers

class UsuarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = usuario
        fields = ['id','user_id', 'tipoUsuario_id']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        
        model = User
        fields = ['id','username', 'first_name', 'last_name', 'email']

class tipoUsuarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = tipoUsuario
        fields = ['id','tipoUsuario', 'descripcion']

