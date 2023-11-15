from rest_framework.views import exception_handler

# def custom_exception_handler(exc, context):
#     response = exception_handler(exc, context)

#     if response is not None:
#         customized_response = {}
#         customized_response["errors"] = []

#         for key, value in response.data.items():
#             error = {"field": key, "message": value}
#             customized_response["errors"].append(error)

#         response.data = customized_response

#     return response


# exception_handler.py


def _handler_authentication_error(exc, context, response):
    """
    The function returns a message indicating that an authorization
    token is not provided.

    :param exc: The `exc` parameter is the exception object that was
    raised during the authentication process

    :param context: The `context` parameter is a dictionary that contains
    additional information about the error that occurred. It can include
    details such as the request that caused the error, the user who made
    the request, or any other relevant information


    :param response: The `response` parameter is the HTTP response object
    that will be returned to the client. It contains information such as
    the status code, headers, and body of the response


    :return: the string "An authorization token is not provided."

    """
    return "An authorization token is not provided."


def _handler_invalid_token_error(exc, context, response):
    """
    The function handles an invalid token error by returning a specific
    error message.

    :param exc: The `exc` parameter represents the exception that was raised.
    In this case, it would be an invalid token error

    :param context: The `context` parameter is a dictionary that contains
    additional information about the error that occurred. It can include
    details such as the request that caused the error, the user who made
    the request, or any other relevant information


    :param response: The `response` parameter is the HTTP response object
    that will be returned to the client. It contains information such as
    the status code, headers, and body of the response


    :return: the string "An authorization token is not valid."

    """
    return "An authorization token is not valid."


def _handler_validation_error(exc, context, response):
    """
    The function `_handler_validation_error` handles validation errors by
    extracting the error code and value, and returning a custom error
    message based on the code.

    :param exc: The `exc` parameter is an exception object that is raised when
    a validation error occurs. It contains information about the error, such
    as the field that failed validation and the error code


    :param context: The `context` parameter is a dictionary that contains
    additional information about the exception that occurred. It can include
    details such as the request, view, and args that were being processed
    when the exception occurred


    :param response: The `response` parameter is the response object that will
    be returned by the handler. It is used to modify the response if needed


    :return: a message based on the validation error code.

    """
    key = list(list(exc.__dict__.values())[0].keys())[0]
    try:
        code = list(list(exc.__dict__.values())[0].values())[0][0].__dict__[
            "code"
        ]
        value = list(list(exc.__dict__.values())[0].values())[0][0]

    except Exception:
        code = list(list(exc.__dict__.values())[0].values())[0][0][0].__dict__[
            "code"
        ]
        value = list(list(exc.__dict__.values())[0].values())[0][0][0]

    custom_msg_code = ["required", "null", "blank"]
    if code in custom_msg_code:
        message = f"{key} field is required"
    elif code:
        message = f"{value}"
    return message


def custom_exception_handler(exc, context):
    """
    The function `custom_exception_handler` handles custom exceptions
    by mapping them to specific handlers and returning a response
    with the appropriate status code and message.

    :param exc: The `exc` parameter is the exception object that was
    raised. It contains information about the exception, such as its type,
    message, and traceback

    :param context: The `context` parameter in the `custom_exception_handler`
    function is a dictionary that contains information about the current
    request and view that raised the exception.

    :return: a response object.

    """
    try:
        exception_class = exc.__class__.__name__

        handlers = {
            "NotAuthenticated": _handler_authentication_error,
            "InvalidToken": _handler_invalid_token_error,
            "ValidationError": _handler_validation_error,
        }
        resp = exception_handler(exc, context)
        if exception_class in handlers:
            # calling handler based on the custom
            message = handlers[exception_class](exc, context, resp)
        else:
            # if there is no handler is present
            # like for our GenericException
            message = str(exc)

        resp.data = message
        return resp
    except Exception as e:
        print(e)
