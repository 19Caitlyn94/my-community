from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The email field is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("verified", "Verified"),
        ("suspended", "Suspended"),
        ("deactivated", "Deactivated"),
    ]

    username = None  # Remove username field
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

    USERNAME_FIELD = "email"  # Use email as the username field
    REQUIRED_FIELDS = []  # No additional required fields

    objects = UserManager()  # Use our custom manager

    @property
    def display_name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def profile_image_url(self):
        if self.profile_image:
            return f"{settings.BASE_HOST}/media/{self.profile_image}"
        return ""

    def __str__(self):
        return self.email
