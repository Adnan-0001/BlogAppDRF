from blog_api.models import Post
from blog_api.permissions import IsOwnerOrReadOnly
from blog_api.serializers import PostSerializer
from rest_framework import permissions, viewsets


class PostAPIViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    ]
