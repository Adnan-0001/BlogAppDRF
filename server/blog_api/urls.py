from django.urls import include, path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
    path(
        "register/",
        views.UserRegistrationAPIView.as_view(),
        name="create-user",
    ),
    path("login/", views.UserLoginAPIView.as_view(), name="login-user"),
    path("logout/", views.UserLogoutAPIView.as_view(), name="logout-user"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "check-token-validity/",
        views.CheckTokenValidityView.as_view(),
        name="check_token_validity",
    ),
    path("api-auth/", include("rest_framework.urls")),
]
