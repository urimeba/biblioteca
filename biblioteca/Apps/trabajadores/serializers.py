from Apps.trabajadores.models import trabajador
from rest_framework import serializers

class TrabajadorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = trabajador
        fields = ['id','fechaIngreso', 'salario', 'usuario_id']

