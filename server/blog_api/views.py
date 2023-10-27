from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(["GET"])
def getRoutes(
    request,
):
    routes = ["snippets/", "api/snippet-detail"]

    return Response(routes)
