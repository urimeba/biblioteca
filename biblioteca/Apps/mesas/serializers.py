from Apps.mesas.models import mesa, reservas
from rest_framework import serializers

class MesaSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = mesa
        fields=['id', 'descripcion', 'activa', 'seccion_id']


class ReservaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = reservas
        fields=['id', 'mesa', 'inicio', 'termino']