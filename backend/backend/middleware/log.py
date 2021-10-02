import orjson
import traceback
from typing import Any
from uuid import UUID

from .data_classes import ErrorLog, RequestLog, ResponseLog


async def get_request_body(request: Any, max_length: int = 0):
    """ Get decoded json or body from the request. """
    body = ""

    if hasattr(request, "body"):
        body = await request.body()

    try:
        body = orjson.loads(body)
    except Exception:
        pass

    if 0 < max_length < len(str(body)):
        body = str(body)[:max_length] + "..."

    return body


async def get_response_body(response: Any, max_length: int = 0):
    """ Get decoded json or body from the response. """

    body = ""

    if hasattr(response, "body"):
        body = response.body

    if 0 < max_length < len(str(body)):
        body = str(body)[:max_length] + "..."

    return body


async def get_response_status_code(response: Any):
    """ Get status code from the response. """
    status_code = response.status_code
    return status_code


async def log_request(
        request, req_id: UUID, callback=None) -> None:
    """
    Log request.

    :param request: request object.
    :param req_id: request uuid.
    :param callback: callable.
    """

    if callback:
        await callback(
            msg=f"Request #{req_id}",
            extra=RequestLog(
                **{
                    "type": "Request",
                    "request_uuid": str(req_id),
                    "url": str(request.url),
                    "method": request.method,
                    "body": await get_request_body(request),
                    "headers": dict(request.headers),
                    "cookies": dict(request.cookies),
                },
            ).dict(),
        )


async def log_response(
        request,
        req_id: UUID,
        response,
        execution_time: float,
        callback=None,
) -> None:
    """
    Log response in ELK.

    :param request: request object.
    :param req_id: request uuid.
    :param response: response object.
    :param execution_time: time elapsed since handler was called.
    :param callback: callable.
    """

    if callback:
        await callback(
            msg=f"Response #{req_id}",
            extra=ResponseLog(
                **{
                    "type": "Response",
                    "request_uuid": str(req_id),
                    "url": str(request.url),
                    "method": request.method,
                    "body": await get_response_body(response),
                    "status_code": await get_response_status_code(response),
                    "execution_time": execution_time,
                },
            ).dict(),
        )


async def log_error(
        request,
        req_id: UUID,
        response: dict,
        status_code: int,
        exception: Exception = None,
        callback=None,
) -> None:
    """
    Log error in ELK.

    :param request: request object.
    :param req_id: request uuid.
    :param response: response object.
    :param status_code: response status code.
    :param exception: caught exception.
    :param callback: callable.
    """

    if callback:
        tb = None
        if exception:
            tb = "".join(traceback.format_tb(exception.__traceback__))

        await callback(
            msg=f"Error #{req_id}",
            extra=ErrorLog(
                **{
                    "type": "Error",
                    "request_uuid": str(req_id),
                    "url": str(request.url),
                    "method": request.method,
                    "body": await get_request_body(request),
                    "status_code": status_code,
                    "error_info": response,
                    "traceback": tb,
                },
            ).dict(),
        )
