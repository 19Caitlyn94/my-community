from django.db import models
from utils.models import TimeStampedModel
from django_extensions.db.fields import AutoSlugField
from django.contrib.auth import get_user_model

User = get_user_model()


class PostType(TimeStampedModel, models.Model):
    name = models.CharField(max_length=50)
    slug = AutoSlugField(populate_from=["name"], unique=True)

    def __str__(self):
        return self.name


class Post(TimeStampedModel, models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("declined", "Declined"),
    ]

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")

    body = models.TextField(max_length=511, default="", blank=True)
    posttype = models.ForeignKey(PostType, on_delete=models.RESTRICT)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    is_active = models.BooleanField(default=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Post {self.id}"
