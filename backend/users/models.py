from django.db import models
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
