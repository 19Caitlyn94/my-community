# Generated by Django 5.1.4 on 2025-03-12 18:15

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communities', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='communityuser',
            options={'verbose_name': 'Community member', 'verbose_name_plural': 'Community members'},
        ),
        migrations.AddField(
            model_name='community',
            name='users',
            field=models.ManyToManyField(related_name='joined_communities', through='communities.CommunityUser', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='community',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='created_communities', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddConstraint(
            model_name='communityuser',
            constraint=models.UniqueConstraint(fields=('community', 'user'), name='unique_community_user'),
        ),
    ]
