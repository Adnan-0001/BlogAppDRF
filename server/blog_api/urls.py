from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

router = DefaultRouter()
router.register("users", views.UserAPIView, basename="user")
router.register("posts", views.PostAPIViewSet, basename="post")


urlpatterns = [
    path(
        "register/",
        views.UserRegistrationAPIView.as_view(),
        name="create-user",
    ),
    path("login/", views.UserLoginAPIView.as_view(), name="login_user"),
    path("logout/", views.UserLogoutAPIView.as_view(), name="logout_user"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "check-token-validity/",
        views.CheckTokenValidityView.as_view(),
        name="check_token_validity",
    ),
    path(
        "upload-image/", views.ImageUploadView.as_view(), name="image_upload"
    ),
    path(
        "confirm-email/<int:user_id>/<str:token>/",
        views.EmailConfirmationView.as_view(),
        name="confirm_email",
    ),
    path("api-auth/", include("rest_framework.urls")),
    path("", include(router.urls)),
]
