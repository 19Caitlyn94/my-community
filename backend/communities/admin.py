from django.contrib import admin
from .models import Community
from utils.admin import CommunityUserInline


class CommunityUserInlineForCommunity(CommunityUserInline):
    fields = ("user", "is_admin")
    autocomplete_fields = ["user"]


class CommunityAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "created_at",
        "updated_at",
        "is_active",
    ]
    ordering = ["updated_at"]
    readonly_fields = ["created_at", "updated_at"]
    inlines = [CommunityUserInlineForCommunity]
    search_fields = ["id", "name"]


admin.site.register(Community, CommunityAdmin)
