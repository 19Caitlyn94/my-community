from django.test import TestCase
from .models import Community, CommunityUser
from django.contrib.auth import get_user_model

User = get_user_model()


class CommunityModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
        self.community = Community.objects.create(
            name="Test Community",
            description="This is a test community.",
            created_by=self.user,
        )

    def test_community_creation(self):
        """Test that a Community instance is created correctly."""
        self.assertEqual(self.community.name, "Test Community")
        self.assertEqual(self.community.description, "This is a test community.")
        self.assertEqual(self.community.created_by, self.user)
        self.assertTrue(self.community.is_active)

    def test_community_slug_generation(self):
        """Test that the slug field is automatically generated."""
        self.assertEqual(self.community.slug, "test-community")

    def test_community_registration_code_is_unique(self):
        """Test that the registration_code is unique."""
        another_community = Community.objects.create(
            name="Another Community",
            description="Another test community.",
            created_by=self.user,
        )
        self.assertNotEqual(
            self.community.registration_code, another_community.registration_code
        )


class CommunityUserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", email="testuser@mc.com", password="password"
        )
        self.community = Community.objects.create(
            name="Test Community",
            description="This is a test community.",
            created_by=self.user,
        )
        self.community_user = CommunityUser.objects.create(
            community=self.community,
            user=self.user,
            is_admin=True,
        )

    def test_community_user_creation(self):
        """Test that a CommunityUser instance is created correctly."""
        self.assertEqual(self.community_user.community, self.community)
        self.assertEqual(self.community_user.user, self.user)
        self.assertTrue(self.community_user.is_admin)

    def test_community_user_deletion_cascades(self):
        """Test that deleting a community cascades to CommunityUser."""
        self.community.delete()
        self.assertEqual(CommunityUser.objects.count(), 0)

    def test_community_user_relationship(self):
        """Test the relationship between CommunityUser and Community/User."""
        self.assertEqual(self.community_user.community.name, "Test Community")
        self.assertEqual(self.community_user.user.email, "testuser@mc.com")
