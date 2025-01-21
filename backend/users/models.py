from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("verified", "Verified"),
        ("suspended", "Suspended"),
        ("deactivated", "Deactivated"),
    ]

    email = models.EmailField(
        unique=True,
        error_messages={"unique": "A user with that email already exists."},
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    deactivated_at = models.DateTimeField(null=True, blank=True)

    profile_image = models.ImageField(
        upload_to="profile_images/", blank=True, null=True
    )
    bio = models.TextField(max_length=255, blank=True, default="")

    @property
    def display_name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def profile_image_url(self):
        if self.profile_image:
            return f"{settings.BASE_HOST}/media/{self.profile_image}"
        return ""
