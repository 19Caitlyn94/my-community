from django.contrib import admin
from communities.models import CommunityUser


class CommunityUserInline(admin.TabularInline):
    model = CommunityUser  # The through model
    extra = 0  # Number of blank rows to display for adding new users
    can_delete = True
