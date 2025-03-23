from rest_framework.serializers import (
    SerializerMethodField,
    ModelSerializer,
    CharField,
    ImageField,
)
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer
from communities.models import Community


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
        read_only_fields = ("id", "status", "communities", "status")


class CustomRegisterSerializer(RegisterSerializer):
    username = None  # Remove username field
    community_code = CharField(required=False)

    def save(self, request):
        community_code = self.validated_data.get("community_code", "")

        # Only proceed if registration code exists and is valid
        if not community_code:
            raise ValidationError("Registration code is required")

        community = Community.objects.filter(registration_code=community_code).first()
        if not community:
            raise ValidationError("Invalid registration code")

        # Create and save the user
        user = super().save(request)
        user.joined_communities.add(community)
        user.save()

        return user
