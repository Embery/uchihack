from typing import List, Optional
from datetime import datetime
from pydantic import Field


from backend.data_classes.base import BaseClass, ResponseSuccess, Request, BaseList


__all__ = ('RequestCreateQuestion', 'ResponseCreateQuestion',
           'RequestReadQuestion', 'ResponseReadQuestion',
           'RequestUpdateQuestion', 'ResponseUpdateQuestion',
           'RequestDeleteQuestion', 'ResponseDeleteQuestion',
           'RequestListQuestion', 'ResponseListQuestion',
           'RequestSimilarQuestion', 'ResponseSimilarQuestion',
           'RequestCloseQuestion', 'ResponseCloseQuestion',
           'RequestCancelQuestion', 'ResponseCancelQuestion')


class Question(BaseClass):
    id: int = Field(description="Идентификатор")

    name: str = Field(description="Вопрос")
    body: str = Field(description="Тело вопроса")

    category_id: int = Field(description="Идентификатор категории")
    category_name: str = Field(description="Название категории")

    user_id: int = Field(description="Идентификатор пользователя")
    user_login: str = Field(description="Логин пользователя")
    user_name: str = Field(description="Имя пользователя")
    user_surname: str = Field(description="Фамилия пользователя")

    status_id: Optional[int] = Field(description="Идентификатор статуса")
    status_name: Optional[str] = Field(description="Название статуса")

    created: datetime = Field(description="Время создания")
    updated: Optional[datetime] = Field(description="Время обновления")


class QuestionCreate(BaseClass):
    name: str = Field(description="Вопрос")
    body: str = Field(description="Тело вопроса")

    category_id: int = Field(description="Идентификатор категории")
    user_id: int = Field(description="Идентификатор пользователя")


class QuestionUpdate(BaseClass):
    id: int = Field(description="Идентификатор")

    name: str = Field(description="Вопрос")
    body: str = Field(description="Тело вопроса")

    category_id: int = Field(description="Идентификатор категории")


#

class RequestCreateQuestion(Request):
    params: List[QuestionCreate] = Field(title="Список вопросов")


class ResponseCreateQuestion(ResponseSuccess):
    result: List[Question] = Field(title="Список вопросов")


#


class RequestReadQuestion(Request):
    params: List[int] = Field(title="Список идентификаторов вопросов")


class ResponseReadQuestion(ResponseSuccess):
    result: List[Question] = Field(title="Список вопросов")


#


class RequestUpdateQuestion(Request):
    params: List[QuestionUpdate] = Field(title="Список вопросов")


class ResponseUpdateQuestion(ResponseSuccess):
    result: List[Question] = Field(title="Список вопросов")


#

class RequestDeleteQuestion(Request):
    params: List[int] = Field(title="Список идентификаторов вопросов")


class ResponseDeleteQuestion(ResponseSuccess):
    pass


#

class ListQuestion(BaseList):
    name: Optional[str] = Field(description="Вопрос")
    body: Optional[str] = Field(description="Тело вопроса")
    category_id: Optional[int] = Field(description="Идентификатор категории")
    user_id: Optional[int] = Field(description="Идентификатор пользователя")


class RequestListQuestion(Request):
    params: ListQuestion = Field(title="Набор фильтров")


class ResponseListQuestion(ResponseSuccess):
    result: List[Question] = Field(title="Список вопросов")


#

class RequestSimilarQuestion(Request):
    params: List[str] = Field(title="Список строка, по которым выполняется поиск")


class ResponseSimilarQuestion(ResponseSuccess):
    result: List[Question] = Field(title="Список вопросов")


#

class RequestCloseQuestion(Request):
    params: List[int] = Field(title="Список идентификаторов вопросов")


class ResponseCloseQuestion(ResponseSuccess):
    result: List[Question] = Field(title="Список вопросов")


#

class RequestCancelQuestion(Request):
    params: List[int] = Field(title="Список идентификаторов вопросов")


class ResponseCancelQuestion(ResponseSuccess):
    result: List[Question] = Field(title="Список вопросов")
