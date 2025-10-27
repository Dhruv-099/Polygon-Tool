from rest_framework import viewsets
from .models import Polygons
from .serializers import PolygonSerializer

class PolygonViewSet(viewsets.ModelViewSet):
    queryset=Polygons.objects.all()
    serializer_class=PolygonSerializer