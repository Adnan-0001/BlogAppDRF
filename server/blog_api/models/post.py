from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=60)
    content = models.TextField()
    author = models.ForeignKey(
        "blog_api.User", related_name="posts", on_delete=models.CASCADE
    )
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"Post title is {self.title} and id is: {self.id}"
