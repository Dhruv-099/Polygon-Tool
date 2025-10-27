from django.contrib.gis.db import models

class Polygons(models.Model):
    geom= models.PolygonField()
    area= models.FloatField(blank=True, null=True)
    perimeter=models.FloatField(blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    google_pin_code= models.CharField(max_length=20, blank=True, null=True) 
    nearest_forest_area = models.FloatField(blank=True, null=True)
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at= models.DateTimeField(auto_now=True)
    