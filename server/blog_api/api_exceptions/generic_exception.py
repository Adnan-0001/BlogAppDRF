from rest_framework.exceptions import APIException


class GenericException(APIException):
    detail = None
    status_code = 400

    def __init__(self, detail, code=None):
        super().__init__(detail, code)
        self.detail = detail
        if code:
            self.status_code = code
