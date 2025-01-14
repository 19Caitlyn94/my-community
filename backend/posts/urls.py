from django.urls import path, include
from rest_framework import routers

from .views import PostViewSet, PostTypesViewSet

# Automatically generate the URL conf by registering the viewsets with a router class.
router = routers.DefaultRouter()
router.register(r"posttypes", PostTypesViewSet)
router.register(r"posts", PostViewSet)

# Wire up our API using automatic URL routing.
urlpatterns = [
    path("", include(router.urls)),
]
