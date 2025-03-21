from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from .factories import UserFactory

User = get_user_model()


class UserModelTests(TestCase):
    def setUp(self):
        self.user_data = {
            "email": "test3@example.com",
            "password": "testpass123",
            "first_name": "Test",
            "last_name": "User",
        }
        self.user = User.objects.create_user(**self.user_data)

    def test_create_user(self):
        """Test creating a user is successful"""
        self.assertEqual(self.user.email, self.user_data["email"])
        self.assertEqual(self.user.first_name, self.user_data["first_name"])
        self.assertEqual(self.user.status, "pending")
        self.assertTrue(self.user.check_password(self.user_data["password"]))

    def test_user_email_normalized(self):
        """Test email is normalized for new users"""
        email = "test@EXAMPLE.com"
        user = User.objects.create_user(email=email, password="test123")
        self.assertEqual(user.email, email.lower())

    def test_user_without_email_raises_error(self):
        """Test that creating a user without an email raises a ValueError"""
        with self.assertRaises(ValueError):
            User.objects.create_user("", "test123")


class UserAPITests(APITestCase):
    def setUp(self):
        self.register_url = reverse("rest_register")
        self.login_url = reverse("rest_login")
        self.user_data = {
            "email": "test1@example.com",
            "password1": "testpass123",
            "password2": "testpass123",
            "first_name": "Test",
            "last_name": "User",
        }

    def test_user_registration(self):
        """Test that user registration works"""
        response = self.client.post(self.register_url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email=self.user_data["email"]).exists())

    def test_user_registration_invalid_password(self):
        """Test registration fails with invalid password"""
        data = self.user_data.copy()
        data["password2"] = "wrongpass"
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_login(self):
        """Test that user can login"""
        # First register a user
        self.client.post(self.register_url, self.user_data)

        # Then attempt to login
        login_data = {
            "email": self.user_data["email"],
            "password": self.user_data["password1"],
        }
        response = self.client.post(self.login_url, login_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_user_login_invalid_credentials(self):
        """Test login fails with invalid credentials"""
        login_data = {"email": "wrong@example.com", "password": "wrongpass"}
        response = self.client.post(self.login_url, login_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UserSerializerTests(TestCase):
    def setUp(self):
        self.user_data = {
            "email": "test2@example.com",
            "password": "testpass123",
            "first_name": "Test",
            "last_name": "User",
        }
        self.user = User.objects.create_user(**self.user_data)

    def test_user_serializer_contains_expected_fields(self):
        """Test that UserSerializer includes the expected fields"""
        from users.serializers import UserSerializer

        serializer = UserSerializer(instance=self.user)
        expected_fields = {
            "id",
            "email",
            "first_name",
            "last_name",
            "status",
            "profile_image",
            "bio",
            "communities",
        }
        self.assertEqual(set(serializer.data.keys()), expected_fields)

    def test_user_serializer_read_only_fields(self):
        """Test that certain fields are read-only in UserSerializer"""
        from users.serializers import UserSerializer

        data = {
            "id": 999,
            "status": "verified",
            "email": "new@example.com",
            "first_name": "New",
        }
        serializer = UserSerializer(instance=self.user, data=data, partial=True)
        self.assertTrue(serializer.is_valid())
        updated_user = serializer.save()

        # Check that read-only fields weren't updated
        self.assertNotEqual(updated_user.id, data["id"])
        self.assertNotEqual(updated_user.status, data["status"])
        # But other fields were
        self.assertEqual(updated_user.first_name, data["first_name"])


class UserTests(TestCase):
    def setUp(self):
        self.user = UserFactory()

    def test_create_user_with_factory(self):
        """Test creating a user with UserFactory"""
        user = UserFactory(
            email="custom@example.com", first_name="Custom", last_name="User"
        )
        self.assertEqual(user.email, "custom@example.com")
        self.assertEqual(user.first_name, "Custom")
        self.assertTrue(user.check_password("testpass123"))

    def test_create_multiple_users(self):
        """Test creating multiple users with UserFactory"""
        users = UserFactory.create_batch(3)
        self.assertEqual(len(users), 3)
        # Emails should be unique
        emails = [user.email for user in users]
        self.assertEqual(len(emails), len(set(emails)))

    def test_user_with_profile_image(self):
        """Test creating a user with a profile image"""
        from django.core.files.uploadedfile import SimpleUploadedFile

        image = SimpleUploadedFile(
            "test_image.jpg", b"file_content", content_type="image/jpeg"
        )
        user = UserFactory(profile_image=image)
        self.assertTrue(user.profile_image)
