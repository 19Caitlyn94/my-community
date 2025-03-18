from rest_framework import permissions
from communities.models import CommunityUser


class IsCommunityMember(permissions.BasePermission):
    """Checks if the user is a member of the requested community."""

    def has_permission(self, request, view):
        """Allow only users who are members of the requested community."""
        print("request", request.query_params)
        community_id = request.query_params.get("community_id", None)
        print("community_id", community_id)
        print("request.user", request.user)
        print("request.user.communityuser_set", request.user.communityuser_set)
        print(
            "request.user.communityuser_set.filter(community=community_id)",
            request.user.communityuser_set.filter(community=community_id),
        )

        if not community_id:
            return False

        # Check if the user is a member of the community
        return request.user.communityuser_set.filter(community=community_id).exists()
