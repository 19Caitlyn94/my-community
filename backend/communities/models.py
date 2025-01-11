from django.db import models
from users.models import User
from utils.models import TimeStampedModel
from django_extensions.db.fields import AutoSlugField, RandomCharField


class Community(TimeStampedModel, models.Model):
    slug = AutoSlugField(populate_from=["name"])
    registration_code = RandomCharField(length=9, unique=True)

    name = models.CharField(max_length=50)
    description = models.TextField(max_length=255)

    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Community"
        verbose_name_plural = "Communities"

    def __str__(self):
        return self.name


class CommunityUser(models.Model):
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    is_admin = models.BooleanField(default=False)
