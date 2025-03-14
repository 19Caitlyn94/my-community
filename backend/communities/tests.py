from django.test import TestCase
from django.db import IntegrityError
from django.core.exceptions import ValidationError

from users.factories import UserFactory
from .factories import CommunityFactory, CommunityUserFactory
from .models import Community, CommunityUser


class CommunityTests(TestCase):
    def setUp(self):
        self.user = UserFactory()
        self.community_data = {
            "name": "Test Community",
            "description": "A test community",
            "created_by": self.user,
        }

    def test_create_community(self):
        community = Community.objects.create(**self.community_data)
        self.assertEqual(community.name, "Test Community")
        self.assertEqual(community.created_by, self.user)
        self.assertTrue(community.is_active)
        self.assertIsNotNone(community.registration_code)
        self.assertIsNotNone(community.slug)

    def test_community_factory(self):
        community = CommunityFactory()
        self.assertIsNotNone(community.name)
        self.assertIsNotNone(community.description)
        self.assertIsNotNone(community.created_by)
        self.assertTrue(community.is_active)

    def test_str_representation(self):
        community = CommunityFactory()
        self.assertEqual(str(community), community.name)


class CommunityUserTests(TestCase):
    def setUp(self):
        self.community = CommunityFactory()
        self.user = UserFactory()

    def test_create_community_user(self):
        community_user = CommunityUser.objects.create(
            community=self.community, user=self.user, is_admin=False
        )
        self.assertEqual(community_user.community, self.community)
        self.assertEqual(community_user.user, self.user)
        self.assertFalse(community_user.is_admin)

    def test_unique_community_user_constraint(self):
        CommunityUser.objects.create(community=self.community, user=self.user)
        with self.assertRaises(IntegrityError):
            CommunityUser.objects.create(community=self.community, user=self.user)

    def test_community_user_factory(self):
        community_user = CommunityUserFactory()
        self.assertIsNotNone(community_user.community)
        self.assertIsNotNone(community_user.user)
        self.assertFalse(community_user.is_admin)

    def test_str_representation(self):
        community_user = CommunityUserFactory()
        expected = f"{community_user.user.email} in {community_user.community.name}"
        self.assertEqual(str(community_user), expected)

    def test_admin_status(self):
        community_user = CommunityUserFactory(is_admin=True)
        self.assertTrue(community_user.is_admin)

    def test_community_members(self):
        # Create multiple members
        members = [UserFactory() for _ in range(3)]
        for user in members:
            CommunityUser.objects.create(community=self.community, user=user)

        # Check if all members are in the community
        self.assertEqual(self.community.users.count(), 3)
        for user in members:
            self.assertTrue(self.community.users.filter(id=user.id).exists())
