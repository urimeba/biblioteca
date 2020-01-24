from Apps.libros.models import libro
from rest_framework import serializers

class LibroSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = libro
        fields=['id', 'seccion_id', 'titulo', 'autor', 'isbn', 'fecha', 'paginas', 'editorial', 'existencias', 'activo']
