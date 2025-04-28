from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

User = get_user_model()


class Command(BaseCommand):
    help = "Creates a superuser from environment variables"

    def handle(self, *args, **options):
        email = options.get("email") or os.environ.get("DJANGO_SUPERUSER_EMAIL")
        password = options.get("password") or os.environ.get(
            "DJANGO_SUPERUSER_PASSWORD"
        )

        if not email:
            email = input("Enter email: ")
        if not password:
            password = input("Enter password: ")

        try:
            user = User.objects.create_superuser(email=email, password=password)
            self.stdout.write(
                self.style.SUCCESS(f"Successfully created superuser: {email}")
            )
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error creating superuser: {str(e)}"))
