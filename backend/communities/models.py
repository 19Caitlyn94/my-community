from django.db import models
from utils.models import TimeStampedModel
from django_extensions.db.fields import AutoSlugField, RandomCharField
from django.contrib.auth import get_user_model
from django.db.models.constraints import UniqueConstraint

User = get_user_model()


class Community(TimeStampedModel, models.Model):
    slug = AutoSlugField(populate_from=["name"])
    registration_code = RandomCharField(length=9, unique=True)
    is_active = models.BooleanField(default=True)

    name = models.CharField(max_length=50)
    description = models.TextField(max_length=255)
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="created_communities"
    )
    users = models.ManyToManyField(User, through="CommunityUser")

    class Meta:
        verbose_name = "Community"
        verbose_name_plural = "Communities"

    def __str__(self):
        return self.name


class CommunityUser(models.Model):
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    is_admin = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Community member"
        verbose_name_plural = "Community members"

        # Avoid duplicate entries
        constraints = [
            UniqueConstraint(fields=["community", "user"], name="unique_community_user")
        ]

    def __str__(self):
        return f"{self.user.email} in {self.community.name}"
