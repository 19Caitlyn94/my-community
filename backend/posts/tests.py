from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from users.tests import UserFactory
from communities.tests import CommunityFactory
from .models import Post, PostType
from .serializers import PostSerializer
from .factories import PostFactory, PostTypeFactory
import random


class PostTests(TestCase):
    def setUp(self):
        self.user = UserFactory()
        self.community = CommunityFactory()
        self.community.users.add(self.user)
        self.posttype = PostTypeFactory()
        self.post = PostFactory(
            user=self.user, community=self.community, posttype=self.posttype
        )

    def test_create_post(self):
        """Test creating a post"""
        post = PostFactory(
            body="Another test post",
            user=self.user,
            community=self.community,
            posttype=self.posttype,
        )
        self.assertEqual(post.body, "Another test post")
        self.assertEqual(post.user, self.user)
        self.assertEqual(post.community, self.community)


class PostAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = UserFactory()
        self.community = CommunityFactory()
        self.community.users.add(self.user)
        self.posttype = PostTypeFactory()
        self.client.force_authenticate(user=self.user)
        self.post_data = {
            "body": "Test post content",
            "posttype": self.posttype.slug,
            "community_id": self.community.id,
        }

    def test_create_post_community_member(self):
        """Test creating post as community member"""
        # Create a new user and add them as a community member
        community_member = UserFactory()
        community_member.joined_communities.add(self.community)
        self.community.users.add(community_member)
        # Verify the user was added correctly
        self.assertTrue(self.community.users.filter(id=community_member.id).exists())

        # Authenticate as the community member
        self.client.force_authenticate(user=community_member)

        response = self.client.post(
            f"/api/posts/?community_id={self.community.id}", self.post_data
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().body, "Test post content")

    def test_create_post_unauthenticated(self):
        """Test creating post fails for unauthenticated user"""
        self.client.force_authenticate(user=None)
        response = self.client.post("/api/posts/", self.post_data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Post.objects.count(), 0)

    def test_create_post_non_community_member(self):
        """Test creating post fails for non-community member"""
        non_member = UserFactory()
        self.client.force_authenticate(user=non_member)
        response = self.client.post("/api/posts/", self.post_data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Post.objects.count(), 0)

    def test_list_posts_api(self):
        """Test listing posts through API"""
        PostFactory.create_batch(
            2, user=self.user, community=self.community, posttype=self.posttype
        )

        response = self.client.get(f"/api/posts/?community_id={self.community.id}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_list_posts_unauthenticated(self):
        """Test listing posts fails for unauthenticated user"""
        self.client.force_authenticate(user=None)
        response = self.client.get(f"/api/posts/?community_id={self.community.id}")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_posts_non_community_member(self):
        """Test listing posts fails for non-community member"""
        non_member = UserFactory()
        self.client.force_authenticate(user=non_member)
        response = self.client.get(f"/api/posts/?community_id={self.community.id}")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # TODO: Add test for get post detail
    # def test_get_post_detail(self):
    #     """Test retrieving a specific post"""
    #     self.community.users.add(self.user)
    #     post = PostFactory(
    #         user=self.user, community=self.community, posttype=self.posttype
    #     )
    #     self.client.force_authenticate(user=self.user)
    #     response = self.client.get(f"/api/posts/{post.id}/")
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data["body"], post.body)

    # TODO: Add tests for update, delete posts
    # def test_update_post(self):
    #     """Test updating a post through API"""
    #     post = PostFactory(
    #         body="Original post",
    #         user=self.user,
    #         community=self.community,
    #         posttype=self.posttype,
    #     )
    #     update_data = {"body": "Updated post content", "posttype": self.posttype.slug}
    #     response = self.client.patch(f"/api/posts/{post.id}/", update_data)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(Post.objects.get(id=post.id).body, "Updated post content")

    # def test_delete_post(self):
    #     """Test deleting a post through API"""
    #     post = PostFactory(
    #         user=self.user, community=self.community, posttype=self.posttype
    #     )
    #     response = self.client.delete(f"/api/posts/{post.id}/")
    #     self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    #     self.assertEqual(Post.objects.count(), 0)


class PostSerializerTests(TestCase):
    def setUp(self):
        self.user = UserFactory()
        self.community = CommunityFactory()
        self.posttype = PostTypeFactory()
        self.post = PostFactory(
            user=self.user, community=self.community, posttype=self.posttype
        )

    def test_post_serializer_contains_expected_fields(self):
        """Test that PostSerializer includes the expected fields"""
        serializer = PostSerializer(instance=self.post)
        expected_fields = {"id", "body", "posttype", "user", "community", "updated_at"}
        self.assertEqual(set(serializer.data.keys()), expected_fields)

    def test_post_serializer_read_only_fields(self):
        """Test that certain fields are read-only in PostSerializer"""
        data = {
            "user": UserFactory().id,
            "community": CommunityFactory().id,
            "body": "Updated content",
            "posttype": self.posttype.slug,
        }
        serializer = PostSerializer(instance=self.post, data=data, partial=True)
        self.assertTrue(serializer.is_valid())
        updated_post = serializer.save()

        # Check that read-only fields weren't updated
        self.assertEqual(updated_post.user, self.user)
        self.assertEqual(updated_post.community, self.community)
        # But other fields were
        self.assertEqual(updated_post.body, "Updated content")
