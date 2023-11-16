from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver


class Image(models.Model):
    image = models.ImageField(upload_to="imgs/")


@receiver(post_delete, sender=Image)
def delete_profile(sender, instance, *args, **kwargs):
    try:
        storage, path = (
            instance.image.storage,
            instance.image.path,
        )
        storage.delete(path)
    except Exception:
        pass
