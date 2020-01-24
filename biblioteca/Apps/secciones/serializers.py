from Apps.secciones.models import seccion
from rest_framework import serializers

class SeccionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = seccion
        fields = ['id','nombre','numLibros']

