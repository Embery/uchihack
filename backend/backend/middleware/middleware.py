import time
import uuid
from functools import partial
from typing import Callable, List

from fastapi import Request, Response
from fastapi.exceptions import RequestValidationError
from fastapi.responses import ORJSONResponse
from fastapi.routing import APIRoute

from .log import (
    log_error,
    log_request,
    log_response,
)

from .data_classes import ResponseFailure, ErrorResult


class LoggedRoute(APIRoute):
    """
    Custom route which replaces Aiohttp-style middlewares, because
    FastAPI middlewares do not support getting request and response bodies.
    """

    middlewares: List = []

    async def _apply_middlewares(self, request: Request) -> Response:
        """ Execute the handler and middlewares. """

        handler = super().get_route_handler()

        for middleware in reversed(self.middlewares):
            handler = partial(middleware, handler=handler)

        return await handler(request=request)

    # --------------------------------------------------------------------------------

    def get_route_handler(self) -> Callable:
        """ Get the route handler with middlewares applied. """

        return self._apply_middlewares


class MiddlewareFastAPI:

    def __init__(self, callback_log_request: Callable = None,
                 callback_log_response: Callable = None,
                 callback_log_error: Callable = None):
        """
        :param callback_log_request:
        :param callback_log_response:
        :param callback_log_error:
        """
        self._callback_log_request = callback_log_request
        self._callback_log_response = callback_log_response
        self._callback_log_error = callback_log_error

    async def server_error_handler(self, request: Request, handler):
        """
        Wrapper around server_error_handler function.

        :param request: request object.
        :param handler: handler function.
        :return: response object.
        """

        req_id = uuid.uuid4()

        try:
            await log_request(request, req_id,
                              callback=self._callback_log_request)
            time_begin = time.time()

            response = await handler(request)

            time_end = time.time() - time_begin
            await log_response(request, req_id, response, time_end,
                               callback=self._callback_log_response)

            return response
        # 400: RequestValidationError
        except RequestValidationError as e:
            response = ResponseFailure(
                result=ErrorResult(
                    error_type=type(e).__name__,
                    error_message=e.json(indent=0).replace("\n", "").replace('"', "'"),
                ),
            )

            await log_error(request, req_id, response.dict(), 400,
                            exception=e, callback=self._callback_log_error)

            return ORJSONResponse(response.dict(), status_code=400)
        # 500: InternalServerError
        except Exception as e:
            response = ResponseFailure(
                result=ErrorResult(
                    error_type=type(e).__name__,
                    error_message=str(e),
                ),
            )

            await log_error(request, req_id, response.dict(), 500,
                            exception=e, callback=self._callback_log_error)

            return ORJSONResponse(response.dict(), status_code=500)
