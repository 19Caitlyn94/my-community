from rest_framework import viewsets, permissions
from .models import Post, PostType
from .serializers import PostSerializer, PostTypeSerializer


class PostTypesViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint lists all available posttype options
    """

    queryset = PostType.objects.all()
    serializer_class = PostTypeSerializer


class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows posts to be viewed, created or edited.
    """

    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]  # TODO make sure user is admin of community and only return community members
