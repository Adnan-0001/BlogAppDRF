from blog_api.serializers import (
    UserLoginSerializer,
    UserRegistrationSerializer,
    UserSerializer,
)
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from rest_framework import status, viewsets
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class UserRegistrationAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return self.confirm_email(request, user)

    def confirm_email(self, request, user):
        confirmation_token = default_token_generator.make_token(user)

        mail_subject = "Activate your user account."
        message = render_to_string(
            "activate_account.html",
            {
                "user_name": user.first_name,
                "user_id": user.id,
                "domain": get_current_site(request).domain,
                "token": confirmation_token,
                "protocol": "https" if request.is_secure() else "http",
            },
        )
        email = EmailMessage(
            mail_subject, message, settings.EMAIL_HOST_USER, to=[user.email]
        )
        email.fail_silently = False

        if email.send():
            return Response(
                "Please check your email for activation link.",
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                "Could not send email activation link.",
                status=status.HTTP_400_BAD_REQUEST,
            )


class UserLoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        serializer = UserSerializer(user)
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {
            "refresh": str(token),
            "access": str(token.access_token),
        }
        return Response(data, status=status.HTTP_200_OK)


class UserLogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {"detail": "Logout successful"},
                status=status.HTTP_205_RESET_CONTENT,
            )
        except TokenError as e:
            if "blacklisted" in str(e):
                return Response(
                    {"detail": "Logout successful"},
                    status=status.HTTP_205_RESET_CONTENT,
                )
            else:
                return Response(
                    {"detail": "Invalid token or token not provided"},
                    status=status.HTTP_400_BAD_REQUEST,
                )


class UserAPIView(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
