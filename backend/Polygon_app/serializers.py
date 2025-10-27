from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import Polygons

class PolygonSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Polygon
        geo_field = "geom"
        fields = (
            "id",
            "area",
            "perimeter",
            "address",
            "pin_code",
            "nearest_forest_name",
            "nearest_forest_distance",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "address",
            "pin_code",
            "nearest_forest_name",
            "nearest_forest_distance",
            "created_at",
            "updated_at",
        )
