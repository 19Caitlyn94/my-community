from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register(r"", UserViewSet, basename="users")

urlpatterns = [
    path("api/users/", include(router.urls)),
]
