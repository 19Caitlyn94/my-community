from rest_framework import viewsets, permissions
from .models import Post, PostType
from utils.viewsets import CreateListRetrieveUpdateDestroyViewSet
from .serializers import PostSerializer
from .serializers import PostTypeSerializer


class PostTypesViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint lists all available posttype options
    """

    queryset = PostType.objects.all()
    serializer_class = PostTypeSerializer


class PostViewSet(CreateListRetrieveUpdateDestroyViewSet):
    serializer_class = PostSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Post.objects.all().order_by("-updated_at")
        #  A community admin can see all posts from any community created by them
        #  A user can see all posts from any community they are a member of, they have the ability to switch bewteen communityies on the frontend and see all the posts from that community

        #     user = self.request.user
        #     user_id = user.id
        #     community_id = user.community.id
        return queryset
