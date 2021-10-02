import orjson
from typing import Union, Optional
from pydantic import BaseModel, Field
from datetime import datetime, timezone


def orjson_dumps(v, *, default=None):
    # Add UTC timezone to datetime fields
    for key, value in v.items():
        # If it's a list of dicts
        if isinstance(value, list):
            for vv in value:
                if isinstance(vv, dict):
                    for kkey, vvalue in vv.items():
                        if isinstance(vvalue, datetime):
                            vv[kkey] = vvalue.replace(tzinfo=timezone.utc)
        if isinstance(value, datetime):
            v[key] = value.replace(tzinfo=timezone.utc)

    # orjson.dumps returns bytes, to match standard json.dumps we need to decode
    return orjson.dumps(
        v,
        default=default,
        option=orjson.OPT_OMIT_MICROSECONDS | orjson.OPT_UTC_Z,
    ).decode()


# Base class
class BaseClass(BaseModel):
    class Config:
        # Change default json encoders/decoders to orjson ones
        json_loads = orjson.loads
        json_dumps = orjson_dumps


class ErrorResult(BaseClass):
    error_type: str = Field("", description="Тип ошибки.")
    error_message: str = Field("", description="Описание ошибки.")


class ResponseFailure(BaseClass):
    success: bool = Field(False, description="Успех выполнения операции.")
    result: Optional[ErrorResult] = Field(title="Результат выполнения операции.")


class Log(BaseClass):
    type: str = Field(description="Тип запроса.")
    request_uuid: str = Field(description="UUID запроса.")
    url: str = Field(description="URL запроса.")
    method: str = Field(description="Метод запроса.")
    body: Union[str, dict, list] = Field(description="Тело запроса.")


class RequestLog(Log):
    headers: dict = Field(description="Заголовки запроса.")
    cookies: dict = Field(description="Куки запроса.")


class ResponseLog(Log):
    status_code: int = Field(description="Статус ответа.")
    execution_time: float = Field(description="Время выполнения.")


class ErrorLog(Log):
    status_code: int = Field(description="Статус ответа.")
    error_info: ResponseFailure = Field(description="Информация об ошибках.")
    traceback: str = Field(description="Traceback ошибки.")
