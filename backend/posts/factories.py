import factory
from .models import PostType, Post
from users.factories import UserFactory
from communities.factories import CommunityFactory


class PostTypeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = PostType

    name = factory.Faker("word")
    slug = factory.Faker("slug")


class PostFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Post

    body = factory.Faker("text", max_nb_chars=200)
    user = factory.SubFactory(UserFactory)
    community = factory.SubFactory(CommunityFactory)
    posttype = factory.Faker("random_element", elements=PostType.objects.all())
