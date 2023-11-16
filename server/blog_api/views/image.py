from blog_api.models import Image
from blog_api.serializers import ImageSerializer
from rest_framework import permissions, status, views
from rest_framework.response import Response


class ImageUploadView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )


class ImageDeleteView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, img, format=None):
        img = f"imgs/{img}"

        try:
            img_to_delete = Image.objects.get(image=img)
            img_to_delete.delete()

            return Response(
                "Image deleted", status=status.HTTP_205_RESET_CONTENT
            )
        except Image.DoesNotExist:
            return Response(
                "Image does not exist", status=status.HTTP_400_BAD_REQUEST
            )


# class ImageDeleteView(generics.DestroyAPIView):
#     serializer_class = ImageSerializer
#     permission_classes = [permissions.IsAuthenticated]
