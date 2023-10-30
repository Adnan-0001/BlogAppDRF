from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from . import views

urlpatterns = [
    # path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path(
        "register/",
        views.UserRegistrationAPIView.as_view(),
        name="create-user",
    ),
    path("login/", views.UserLoginAPIView.as_view(), name="login-user"),
    path("logout/", views.UserLogoutAPIView.as_view(), name="logout-user"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("api-auth/", include("rest_framework.urls")),
]