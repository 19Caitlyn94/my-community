from django.contrib import admin

from .models import Community, CommunityUser


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


class CommunityUserAdmin(admin.ModelAdmin):
    list_display = ["user", "community", "is_admin"]
    list_filter = ["community", "is_admin"]
    search_fields = ["user__email", "community__name"]


admin.site.register(Community, CommunityAdmin)
admin.site.register(CommunityUser, CommunityUserAdmin)
