from django.contrib import admin

from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

User = get_user_model()


class ExtendedUserAdmin(UserAdmin):
    list_display = ["first_name", "last_name", "email", "status", "is_superuser"]
    ordering = ["date_joined"]

    fieldsets = [
        (
            None,
            {
                "fields": ["email", "password"],
            },
        ),
        (
            "Personal Info",
            {
                "fields": ["first_name", "last_name", "profile_image", "bio"],
            },
        ),
        (
            "Permissions",
            {
                "fields": [
                    "status",
                    "is_active",
                    "is_superuser",
                    "is_staff",
                    "groups",
                    "user_permissions",
                ],
            },
        ),
        (
            "Important Dates",
            {
                "fields": ["last_login", "date_joined", "deactivated_at"],
            },
        ),
    ]

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )


admin.site.register(User, ExtendedUserAdmin)
