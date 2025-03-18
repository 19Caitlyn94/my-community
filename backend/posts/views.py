from rest_framework import viewsets
from .models import Post, PostType
from utils.viewsets import CreateListRetrieveUpdateDestroyViewSet
from .serializers import PostSerializer
from .serializers import PostTypeSerializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .permissions import IsCommunityMember


class PostTypesViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint lists all available posttype options
    """

    queryset = PostType.objects.all()
    serializer_class = PostTypeSerializer


class PostViewSet(CreateListRetrieveUpdateDestroyViewSet):
    serializer_class = PostSerializer

    def get_permissions(self):
        print("self.action", self.action)
        if self.action == "list":
            permission_classes = [IsAuthenticated & IsCommunityMember]
        # else:
        #     permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = []
        community_id = self.request.query_params.get("community_id", None)

        if community_id:
            queryset = (
                Post.objects.all()
                .order_by("-updated_at")
                .filter(community_id=community_id)
            )

        return queryset
