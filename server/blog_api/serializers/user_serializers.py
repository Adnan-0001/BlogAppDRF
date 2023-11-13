from blog_api.models import Post, User
from django.contrib.auth import authenticate
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Post.objects.all()
    )

    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "posts"]


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "email",
            "password",
            "first_name",
            "last_name",
        )
        extra_kwargs = {"password": {"write_only": True}}

    # this is needed so the a new object is always created using custom manager
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
