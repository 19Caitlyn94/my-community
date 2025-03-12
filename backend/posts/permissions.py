from rest_framework import permissions
from communities.models import CommunityUser


class IsCommunityMember(permissions.BasePermission):
    """
    Custom permission to only allow members of the community to view posts.
    """

    def has_permission(self, request, view):
        # Only allow authenticated users
        if not request.user.is_authenticated:
            return False

        # Get the community from the request
        community_id = request.query_params.get("community", None)
        if not community_id:
            return False

        # Check if user is a member of the community
        return CommunityUser.objects.filter(
            community_id=community_id, user=request.user
        ).exists()


class IsAuthor(permissions.BasePermission):
    """
    Custom permission to only allow authors of a post to edit or delete it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any authenticated user
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the author of the post
        return obj.user == request.user
