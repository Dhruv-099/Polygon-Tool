from django.db import models 
from django.contrib.gis.db import models as gis_models 
from django.contrib.gis.geos import Polygon as GEOSPolygon 
import requests 
from dotenv import load_dotenv 
import os
load_dotenv()
GOOGLE_GEOCODING_API_KEY = os.getenv('GOOGLE_GEOCODING_API_KEY')

class Polygons(gis_models.Model):
    geom= gis_models.PolygonField()
    area= models.FloatField(blank=True, null=True)
    perimeter=models.FloatField(blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    google_pin_code= models.CharField(max_length=20, blank=True, null=True) 
    nearest_forest_area = models.FloatField(blank=True, null=True)
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at= models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name_plural = "Polygons" 
    
    def __str__(self):
        return f"Polygon {self.id} - {self.address or 'No Address'}"
    
    def _calculate_area_and_perimeter(self):
        if self.geom:
            transformed_geom = self.geom.transform(3857, clone=True)
            self.area = round(transformed_geom.area,3)  # in square meters
            self.perimeter = round(transformed_geom.length,3)  # in meters

    def _perform_geocoding(self):#find pincode if not already set
        if self.geom and not self.address and GOOGLE_GEOCODING_API_KEY:
            centroid = self.geom.centroid
            url = (
                f"https://maps.googleapis.com/maps/api/geocode/json?"
                f"latlng={centroid.y},{centroid.x}&key={GOOGLE_GEOCODING_API_KEY}"
            )
            response = requests.get(url)
            response.raise_for_status()
            data=response.json()
            if data['status']=='OK' and data['results']:
                result=data['results'][0]
                self.address=result['formatted_address']
                for component in result.get('address_components', []):
                    if 'postal_code' in component['types']:
                        self.google_pin_code=component['long_name']
                        break
        
    
    def save(self, *args, **kwargs):
        self._calculate_area_and_perimeter()
        self._perform_geocoding()
        # Override to avoid saving initial empty values for created_at if it gets overridden
        if self._state.adding and not hasattr(self, 'created_at'):
            super().save(update_fields=['created_at', 'updated_at'] if 'update_fields' not in kwargs else kwargs['update_fields'], *args, **kwargs)
        else:
            super().save(*args, **kwargs)
