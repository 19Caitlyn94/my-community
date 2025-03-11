from .models import Post, PostType
from rest_framework import serializers
from users.serializers import UserSerializer


class PostTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostType
        fields = ["slug", "name"]


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    posttype = serializers.SlugRelatedField(read_only=True, slug_field="slug")
    updated_at = serializers.DateTimeField(
        read_only=True
    )  # format="%A, %B %e at %H:%M" Thursday, June 31 at 13:30

    class Meta:
        model = Post
        fields = [
            "id",
            "body",
            "posttype",
            "user",
            "updated_at",
        ]
