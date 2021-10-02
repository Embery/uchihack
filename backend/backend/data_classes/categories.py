from typing import List, Optional
from datetime import datetime
from pydantic import Field


from backend.data_classes.base import BaseClass, ResponseSuccess, Request, BaseList

__all__ = ('RequestCreateCategory', 'ResponseCreateCategory',
           'RequestReadCategory', 'ResponseReadCategory',
           'RequestUpdateCategory', 'ResponseUpdateCategory',
           'RequestDeleteCategory', 'ResponseDeleteCategory',
           'RequestListCategory', 'ResponseListCategory')


class Category(BaseClass):
    id: int = Field(description="Идентификатор")

    name: str = Field(description="Название категории")

    parent_id: Optional[int] = Field(description="Идентификатор родительской категории")

    created: datetime = Field(description="Время создания")
    updated: Optional[datetime] = Field(description="Время обновления")


class CategoryCreate(BaseClass):
    name: str = Field(description="Название категории")

    parent_id: Optional[int] = Field(description="Идентификатор вопроса")


class CategoryUpdate(BaseClass):
    id: int = Field(description="Идентификатор")

    name: Optional[str] = Field(description="Название категории")

    parent_id: Optional[int] = Field(description="Идентификатор вопроса")


#

class RequestCreateCategory(Request):
    params: List[CategoryCreate] = Field(title="Список категорий")


class ResponseCreateCategory(ResponseSuccess):
    result: List[Category] = Field(title="Список категорий")


#


class RequestReadCategory(Request):
    params: List[int] = Field(title="Список категорий")


class ResponseReadCategory(ResponseSuccess):
    result: List[Category] = Field(title="Список категорий")


#


class RequestUpdateCategory(Request):
    params: List[CategoryUpdate] = Field(title="Список категорий")


class ResponseUpdateCategory(ResponseSuccess):
    result: List[Category] = Field(title="Список категорий")


#

class RequestDeleteCategory(Request):
    params: List[int] = Field(title="Список категорий")


class ResponseDeleteCategory(ResponseSuccess):
    pass


#

class ListCategory(BaseList):
    name: Optional[str] = Field(description="Название категории")
    parent_id: Optional[int] = Field(description="Идентификатор родителя")


class RequestListCategory(Request):
    params: ListCategory = Field(title="Набор фильтров")


class ResponseListCategory(ResponseSuccess):
    result: List[Category] = Field(title="Список категорий")
