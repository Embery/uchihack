from typing import List, Optional
from datetime import datetime
from pydantic import Field

from backend.data_classes.base import BaseClass, ResponseSuccess, Request


__all__ = ('RequestLogin', 'ResponseLogin',
           'RequestCreateUser', 'ResponseCreateUser',
           'RequestReadUser', 'ResponseReadUser',
           'RequestUpdateUser', 'ResponseUpdateUser',
           'RequestDeleteUser', 'ResponseDeleteUser',
           'RequestLogout', 'ResponseLogout',
           'RequestIsLoggedIn', 'ResponseIsLoggedIn')


class User(BaseClass):
    id: int = Field(description="Идентификатор")

    login: str = Field(description="Логин")
    password: str = Field(description="Пароль")

    name: str = Field(description="Имя")
    surname: str = Field(description="Фамилия")

    rating: Optional[int] = Field(description="Рейтинг")

    created: datetime = Field(description="Время создания")
    updated: Optional[datetime] = Field(description="Время обновления")


class UserCreate(BaseClass):
    login: str = Field(description="Логин")
    password: str = Field(description="Пароль")

    name: str = Field(description="Имя")
    surname: str = Field(description="Фамилия")


class UserUpdate(BaseClass):
    id: int = Field(description="Идентификатор")

    login: str = Field(description="Логин")
    password: str = Field(description="Пароль")

    name: str = Field(description="Имя")
    surname: str = Field(description="Фамилия")

    rating: int = Field(description="Рейтинг")


#


class Auth(BaseClass):
    login: str = Field(description="Логин")
    password: str = Field(description="Пароль")


class RequestLogin(Request):
    params: Auth = Field(title="Параметры для авторизации")


class Session(User):
    session_id: str = Field(title="Идентификатор сессии")


class ResponseLogin(ResponseSuccess):
    result: Session = Field(title="Сессия")

#


class RequestCreateUser(Request):
    params: List[UserCreate] = Field(title="Список пользователей")


class ResponseCreateUser(ResponseSuccess):
    result: List[User] = Field(title="Список пользователей")


#


class RequestReadUser(Request):
    params: List[int] = Field(title="Список идентификаторов пользователей")


class ResponseReadUser(ResponseSuccess):
    result: List[User] = Field(title="Список пользователей")


#


class RequestUpdateUser(Request):
    params: List[UserUpdate] = Field(title="Список пользователей")


class ResponseUpdateUser(ResponseSuccess):
    result: List[User] = Field(title="Список пользователей")


#

class RequestDeleteUser(Request):
    params: List[int] = Field(title="Список идентификаторов пользователей")


class ResponseDeleteUser(ResponseSuccess):
    pass


#

class RequestLogout(Request):
    params: List[str] = Field(title="Список идентификаторов пользователей")


class ResponseLogout(ResponseSuccess):
    pass


#

class RequestIsLoggedIn(Request):
    params: List[str] = Field(title="Список идентификаторов пользователей")


class ResponseIsLoggedIn(ResponseSuccess):
    result: List[User] = Field(title="Список пользователей")
