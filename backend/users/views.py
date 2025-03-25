from django.shortcuts import render
from rest_framework import viewsets, mixins, generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .permissions import IsOwner
from .models import User
from .serializers import UserSerializer
from rest_framework.generics import RetrieveUpdateAPIView


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly | (IsAuthenticated & IsOwner)]
