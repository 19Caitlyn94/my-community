from django.contrib import admin
from .models import PostType, Post


class PostTypeAdmin(admin.ModelAdmin):
    list_display = ["name", "slug"]
    readonly_fields = ["created_at", "updated_at"]


class PostAdmin(admin.ModelAdmin):
    list_display = ["__str__", "status", "posttype", "user"]
    readonly_fields = ["deleted_at", "created_at", "updated_at"]


admin.site.register(PostType, PostTypeAdmin)
admin.site.register(Post, PostAdmin)
