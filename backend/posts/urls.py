from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, PostTypesViewSet

router = DefaultRouter()
router.register(r"", PostViewSet, basename="post")

# Create a separate router for posttypes
posttype_router = DefaultRouter()
posttype_router.register(r"", PostTypesViewSet, basename="posttype")

urlpatterns = [
    path("api/posts/", include(router.urls)),
    path("api/posttypes/", include(posttype_router.urls)),
]
