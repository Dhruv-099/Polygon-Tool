from rest_framework.routers import DefaultRouter
from .views import PolygonViewSet
from django.urls import path,include

router=DefaultRouter()
router.register(r'polygons',PolygonViewSet,basename='polygon') #generates all crud urls
urlpatterns = [
    path('',include(router.urls))
]
