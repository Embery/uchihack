from typing import List, Optional
from datetime import datetime
from pydantic import Field


from backend.data_classes.base import BaseClass, ResponseSuccess, Request, BaseList

__all__ = ('RequestCreateAnswer', 'ResponseCreateAnswer',
           'RequestReadAnswer', 'ResponseReadAnswer',
           'RequestUpdateAnswer', 'ResponseUpdateAnswer',
           'RequestDeleteAnswer', 'ResponseDeleteAnswer',
           'RequestListAnswer', 'ResponseListAnswer')


class Answer(BaseClass):
    id: int = Field(description="Идентификатор")

    body: str = Field(description="Тело ответа")

    question_id: int = Field(description="Идентификатор вопроса")

    user_id: int = Field(description="Идентификатор пользователя")
    user_login: str = Field(description="Логин пользователя")
    user_name: str = Field(description="Имя пользователя")
    user_surname: str = Field(description="Фамилия пользователя")

    created: datetime = Field(description="Время создания")
    updated: Optional[datetime] = Field(description="Время обновления")


class AnswerCreate(BaseClass):
    body: str = Field(description="Тело ответа")

    question_id: int = Field(description="Идентификатор вопроса")
    user_id: int = Field(description="Идентификатор пользователя")


class AnswerUpdate(BaseClass):
    id: int = Field(description="Идентификатор")

    body: str = Field(description="Тело ответа")

    question_id: int = Field(description="Идентификатор вопроса")


#

class RequestCreateAnswer(Request):
    params: List[AnswerCreate] = Field(title="Список ответов")


class ResponseCreateAnswer(ResponseSuccess):
    result: List[Answer] = Field(title="Список ответов")


#


class RequestReadAnswer(Request):
    params: List[int] = Field(title="Список идентификаторов ответов")


class ResponseReadAnswer(ResponseSuccess):
    result: List[Answer] = Field(title="Список ответов")


#


class RequestUpdateAnswer(Request):
    params: List[AnswerUpdate] = Field(title="Список ответов")


class ResponseUpdateAnswer(ResponseSuccess):
    result: List[Answer] = Field(title="Список ответов")


#

class RequestDeleteAnswer(Request):
    params: List[int] = Field(title="Список идентификаторов ответов")


class ResponseDeleteAnswer(ResponseSuccess):
    pass


#


class ListAnswer(BaseList):
    body: Optional[str] = Field(description="Ответ")
    question_id: Optional[str] = Field(description="Идентификатор вопроса")
    user_id: Optional[str] = Field(description="Идентификатор пользователя")


class RequestListAnswer(Request):
    params: ListAnswer = Field(title="Набор фильтров")


class ResponseListAnswer(ResponseSuccess):
    result: List[Answer] = Field(title="Список ответов")
