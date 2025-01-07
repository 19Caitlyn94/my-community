from django.contrib import admin

from .models import Community


class CommunityAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "created_by",
        "created_at",
        "updated_at",
        "is_active",
    ]
    ordering = ["updated_at"]
    readonly_fields = ["created_at", "updated_at"]



admin.site.register(Community, CommunityAdmin)
