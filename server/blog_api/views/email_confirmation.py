from blog_api.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class EmailConfirmationView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, user_id, token, *args, **kwargs):
        try:
            user = User.objects.get(pk=user_id)
        except Exception:
            user = None
        if user is None:
            return Response(
                "User not found", status=status.HTTP_400_BAD_REQUEST
            )

        # if user is already verified
        if user.is_active:
            return Response(
                "Email has already been verified.",
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not default_token_generator.check_token(user, token):
            return Response(
                "Token is invalid or expired. Please request another confirmation email by signing in.",
                status=status.HTTP_400_BAD_REQUEST,
            )
        user.is_active = True
        user.last_login = timezone.now()

        user.save()
        return Response(
            "Email successfully confirmed", status=status.HTTP_200_OK
        )
