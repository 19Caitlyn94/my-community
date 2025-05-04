from .models import Post, PostType
from rest_framework.serializers import (
    ModelSerializer,
    PrimaryKeyRelatedField,
    SlugRelatedField,
    DateTimeField,
    CurrentUserDefault,
    ListField,
    FileField,
    ValidationError,
    SerializerMethodField,
)
from users.serializers import UserPostSerializer
from communities.models import Community
from rest_framework import serializers
from media.models import Media
from django.contrib.contenttypes.models import ContentType

MAX_FILES_PER_POST = 10
MAX_FILE_SIZE_IN_MB = 5
MAX_FILE_SIZE_IN_BYTES = MAX_FILE_SIZE_IN_MB * 1024 * 1024
MAX_FILE_NAME_LENGTH = 255


class PostTypeSerializer(ModelSerializer):
    class Meta:
        model = PostType
        fields = ["slug", "name", "color"]


class PostSerializer(ModelSerializer):
    user = UserPostSerializer(read_only=True)
    posttype = SlugRelatedField(slug_field="slug", queryset=PostType.objects.all())
    media_urls = SerializerMethodField()
    uploaded_files = ListField(
        child=FileField(
            max_length=255,
            allow_empty_file=False,  # Prevent empty files
            use_url=True,  # Use URLs in output
        ),
        write_only=True,  # Only used for input
        required=False,  # Optional field
        style={"template": "upload_multiple"},  # Hint for browsable API
    )

    def get_media_urls(self, obj):
        return [media.file.url for media in obj.media.all()]

    class Meta:
        model = Post
        fields = [
            "id",
            "body",
            "posttype",
            "user",
            "community",
            "updated_at",
            "media_urls",
            "uploaded_files",
        ]
        read_only_fields = ["user", "community", "updated_at", "media_urls"]

    def validate_uploaded_files(self, files):
        if not files:
            return files

        # Max files validation
        if len(files) > MAX_FILES_PER_POST:
            raise ValidationError(
                {
                    "uploaded_files": f"You cannot upload more than {MAX_FILES_PER_POST} files."
                }
            )

        errors = []

        for file in files:
            if len(file.name) > MAX_FILE_NAME_LENGTH:
                errors.append(
                    f"File name exceeds {MAX_FILE_NAME_LENGTH} character limit"
                )

            if file.size > MAX_FILE_SIZE_IN_BYTES:
                errors.append(f"File size exceeds {MAX_FILE_SIZE_IN_MB}MB limit")

        if errors:
            raise ValidationError({"uploaded_files": errors})

        return files

    def create(self, validated_data):
        uploaded_files = validated_data.pop("uploaded_files", [])
        post = Post.objects.create(**validated_data)

        for file in uploaded_files:
            Media.objects.create(
                content_type=ContentType.objects.get_for_model(Post),
                object_id=post.id,
                file=file,
            )

        return post
