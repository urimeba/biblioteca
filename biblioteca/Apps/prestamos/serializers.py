from Apps.prestamos.models import prestamo, solicitud
from rest_framework import serializers

class PrestamoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = prestamo
        fields=['id', 'usuario', 'libro', 'trabajador', 'fechaSalida', 'fechaRegreso']


class SolicitudSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = solicitud
        fields=['id', 'usuario', 'libro', 'status', 'activo']
