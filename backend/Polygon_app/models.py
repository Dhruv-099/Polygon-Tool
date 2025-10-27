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
        updated_fields=[]
        if self.geom and (self.area is None or self.perimeter is None):
                transformed_geom = self.geom.transform(3857, clone=True)
                new_area=round(transformed_geom.area,3)  # in square meters
                new_perimeter=round(transformed_geom.length,3)  # in meters
                if self.area != new_area:
                    self.area=new_area
                    updated_fields.append('area')
                if self.perimeter != new_perimeter:
                    self.perimeter=new_perimeter
                    updated_fields.append('perimeter')
        return updated_fields
    def _perform_geocoding(self):#find pincode if not already set
        updated_fields=[]
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
                formatted_address=result['formatted_address']
                self.address=formatted_address
                updated_fields.append('address')
                for component in result.get('address_components', []):
                    if 'postal_code' in component['types']:
                        self.google_pin_code=component['long_name']
                        updated_fields.append('google_pin_code')
                        break
        return updated_fields
        
    
    def save(self, *args, **kwargs):
        if self._state.adding:
            super().save(*args, **kwargs)#obj gets id and is saved
        updated_fields=[]
        updated_fields.extend(self._calculate_area_and_perimeter())
        updated_fields.extend(self._perform_geocoding())
        if updated_fields and self._state.adding:
            unique_updated_fields=list(set(updated_fields))
            super().save(update_fields=unique_updated_fields,*args, **kwargs)
        if not self._state.adding and not updated_fields:
            super().save(*args, **kwargs)
