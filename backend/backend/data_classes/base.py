import orjson
from typing import List, Any, Optional
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


class BaseClass(BaseModel):
    class Config:
        # Change default json encoders/decoders to orjson ones
        json_loads = orjson.loads
        json_dumps = orjson_dumps


#


class ErrorResult(BaseClass):
    error_type: str = Field("", description="Тип ошибки.")
    error_message: str = Field("", description="Описание ошибки.")


class ResponseFailure(BaseClass):
    success: bool = Field(False, description="Успех выполнения операции.")
    result: Optional[ErrorResult] = Field(
        title="Результат выполнения операции.")

#


class Request(BaseClass):
    params: Any = Field(title="Данные.")


class ResponseSuccess(BaseClass):
    success: bool = Field(True, description="Успех выполнения операции.")
    result: Any = Field({}, title="Результат выполнения операции.")


class BaseList(BaseClass):
    # Time
    created_gt: Optional[datetime] = Field(
        description="Отдавать записи, созданные после."
    )
    created_lt: Optional[datetime] = Field(description="Отдавать записи, созданные до.")
    updated_gt: Optional[datetime] = Field(
        description="Отдавать записи, отредактированные после."
    )
    updated_lt: Optional[datetime] = Field(
        description="Отдавать записи, отредактированные до."
    )

    # Limit/Offset
    limit: Optional[int] = Field(
        description="Максимальное кол-во результатов в ответе."
    )
    offset: Optional[int] = Field(
        description="Номер первого результата. Отсчет начинается с 0."
    )
