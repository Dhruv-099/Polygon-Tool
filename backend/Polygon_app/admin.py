from django.contrib.gis import admin
from .models import Polygons

@admin.register(Polygons)
class PolygonAdmin(admin.GISModelAdmin):
    list_display = ('id', 'address', 'area', 'perimeter', 'created_at', 'updated_at')
    list_display = (
        'id', 'address', 'area', 'perimeter',
        'google_pin_code', 'created_at',
    )
    list_display_links = ('id', 'address',)
    search_fields = ('address', 'google_pin_code',)
    list_filter = ('created_at',)
    readonly_fields = (
        'area', 'perimeter', 'address', 'google_pin_code',
        'created_at', 'updated_at'
    )
