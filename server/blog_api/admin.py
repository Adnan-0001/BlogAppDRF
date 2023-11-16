from django.contrib import admin

from .models import Image, Post, User

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Image)
