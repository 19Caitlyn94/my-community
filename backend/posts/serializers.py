from .models import Post, PostType
from rest_framework.serializers import (
    ModelSerializer,
    PrimaryKeyRelatedField,
    SlugRelatedField,
    DateTimeField,
    CurrentUserDefault,
)
from users.serializers import UserPostSerializer
from communities.models import Community


class PostTypeSerializer(ModelSerializer):
    class Meta:
        model = PostType
        fields = ["slug", "name"]


class PostSerializer(ModelSerializer):
    user = UserPostSerializer(read_only=True)
    posttype = SlugRelatedField(slug_field="slug", queryset=PostType.objects.all())

    class Meta:
        model = Post
        fields = [
            "id",
            "body",
            "posttype",
            "user",
            "community",
            "updated_at",
        ]
        read_only_fields = [
            "user",
            "community",
            "updated_at",
        ]
