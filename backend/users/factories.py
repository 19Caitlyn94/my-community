import factory
from django.contrib.auth import get_user_model
from factory.faker import Faker

User = get_user_model()


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ("email",)  # Make sure email is unique

    email = Faker("email")
    first_name = Faker("first_name")
    last_name = Faker("last_name")
    password = factory.PostGenerationMethodCall("set_password", "testpass123")
    status = "pending"
    bio = Faker("text", max_nb_chars=200)

    @factory.post_generation
    def profile_image(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            self.profile_image = extracted

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        """Override the default _create to ensure email is always provided"""
        if "email" not in kwargs:
            kwargs["email"] = Faker("email").generate({})
        kwargs["email"] = kwargs["email"].lower()
        return super()._create(model_class, *args, **kwargs)
