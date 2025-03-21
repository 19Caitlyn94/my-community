from rest_framework.serializers import (
    SerializerMethodField,
    ModelSerializer,
    CharField,
    ImageField,
)
from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer


User = get_user_model()


class UserPostSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "status",
            "profile_image",
            "bio",
        ]


class UserSerializer(ModelSerializer):
    profile_image = ImageField(
        max_length=255, use_url=True, allow_null=True, required=False
    )
    communities = SerializerMethodField()

    def get_communities(self, obj):
        return [
            {"id": community.id, "name": community.name}
            for community in obj.joined_communities.all()
        ]

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "status",
            "profile_image",
            "bio",
            "communities",
        )
        read_only_fields = ("id", "status")


class CustomRegisterSerializer(RegisterSerializer):
    username = None  # Remove username field
    first_name = CharField(required=False)
    last_name = CharField(required=False)

    def save(self, request):
        user = super().save(request)
        user.first_name = self.validated_data.get("first_name", "")
        user.last_name = self.validated_data.get("last_name", "")
        user.save()
        return user
