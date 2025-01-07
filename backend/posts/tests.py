from django.test import TestCase
from users.models import User
from .models import PostType, Post


class PostTypeModelTest(TestCase):
    def setUp(self):
        self.post_type = PostType.objects.create(name="Blog")

    def test_post_type_creation(self):
        """Test that a PostType instance is created correctly."""
        self.assertEqual(self.post_type.name, "Blog")

    def test_post_type_slug_generation(self):
        """Test that the slug field is automatically generated."""
        self.assertEqual(self.post_type.slug, "blog")

    def test_post_type_string_representation(self):
        """Test the string representation of the PostType model."""
        self.assertEqual(str(self.post_type), "Blog")


class PostModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
        self.post_type = PostType.objects.create(name="Blog")
        self.post = Post.objects.create(
            status="pending",
            body="This is a test post.",
            posttype=self.post_type,
            user=self.user,
            is_active=True,
        )

    def test_post_creation(self):
        """Test that a Post instance is created correctly."""
        self.assertEqual(self.post.status, "pending")
        self.assertEqual(self.post.body, "This is a test post.")
        self.assertEqual(self.post.posttype, self.post_type)
        self.assertEqual(self.post.user, self.user)
        self.assertTrue(self.post.is_active)

    def test_post_default_status(self):
        """Test that the default status is 'pending'."""
        post = Post.objects.create(posttype=self.post_type, user=self.user)
        self.assertEqual(post.status, "pending")

    def test_post_string_representation(self):
        """Test the string representation of the Post model."""
        self.assertEqual(str(self.post), f"Post {self.post.id}")

    def test_post_deletion_does_not_cascade_to_post_type(self):
        """Test that deleting a Post does not delete its associated PostType."""
        self.post.delete()
        self.assertTrue(PostType.objects.filter(id=self.post_type.id).exists())

    def test_post_deletion_sets_deleted_at(self):
        """Test that deleting a Post sets the deleted_at field."""
        self.post.deleted_at = "2025-01-07 00:00:00"
        self.post.save()
        self.assertIsNotNone(self.post.deleted_at)
