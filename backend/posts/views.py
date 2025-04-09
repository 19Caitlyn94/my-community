from rest_framework import viewsets
from .models import Post, PostType
from utils.viewsets import CreateListRetrieveUpdateDestroyViewSet
from .serializers import PostSerializer
from .serializers import PostTypeSerializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from communities.models import Community
from .permissions import IsCommunityMember
from rest_framework.parsers import MultiPartParser, FormParser


class PostTypesViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint lists all available posttype options
    """

    queryset = PostType.objects.all()
    serializer_class = PostTypeSerializer


class PostViewSet(CreateListRetrieveUpdateDestroyViewSet):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated & IsCommunityMember]
    parser_classes = [MultiPartParser, FormParser]

    # TODO: check isAuthor on update, partial update and delete.
    # def get_permissions(self):
    #     if self.action == "list":
    #         permission_classes = [IsAuthenticated & IsCommunityMember]
    #     # else:
    #     #     permission_classes = [IsAuthenticated & IsCommunityMember]
    #     return [permission() for permission in permission_classes]

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

    def perform_create(self, serializer):
        user = self.request.user
        # TODO: check this implementation
        community = Community.objects.get(id=self.request.data.get("community_id"))

        serializer.save(user=user, community=community)
