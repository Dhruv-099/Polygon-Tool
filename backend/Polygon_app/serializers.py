from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import Polygons
from rest_framework import serializers

class PolygonSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Polygons
        geo_field = "geom"
        fields = (
            "id",
            "area",
            "perimeter",
            "address",
            "google_pin_code",
            "nearest_forest_area",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "area",
            "perimeter",
            "address",
            "google_pin_code",
            "nearest_forest_area",
            "created_at",
            "updated_at",
        )
    def validate_geom(self, value):
        if not value or value.geom_type != 'Polygon':
            raise serializers.ValidationError("Invalid geometry type. A Polygon is required.")
        return value