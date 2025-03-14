import factory
from factory.faker import Faker
from .models import Community, CommunityUser
from users.factories import UserFactory


class CommunityFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Community

    name = Faker("company")
    description = Faker("catch_phrase")
    created_by = factory.SubFactory(UserFactory)
    is_active = True


class CommunityUserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = CommunityUser

    community = factory.SubFactory(CommunityFactory)
    user = factory.SubFactory(UserFactory)
    is_admin = False
