import sqlalchemy as sa
from fastapi import APIRouter, Request

from datetime import datetime as dt

from backend.utils.pg_storage import AsyncpgsaStorage
from backend.middleware.middleware import LoggedRoute

from backend.database.tables import categories

from backend.data_classes.categories import *


router = APIRouter(route_class=LoggedRoute)


@router.post("/category/create", response_model=ResponseCreateCategory)
async def create_category(request: Request, data: RequestCreateCategory):
    storage: AsyncpgsaStorage = request.app.state.Storage

    results = []

    for category in data.params:
        if category.parent_id:
            query = f"""
                INSERT INTO categories (name, parent_id, created)
                VALUES ('{category.name}', 
                        {category.parent_id}, 
                        '{dt.now().strftime("%Y-%m-%d %H:%M:%S")}')
                RETURNING *;
            """
        else:
            query = f"""
                INSERT INTO categories (name, created)
                VALUES ('{category.name}', 
                '{dt.now().strftime("%Y-%m-%d %H:%M:%S")}')
                RETURNING *;
            """

        result = (await storage.fetch(query))[0]
        results.append(result)

    return ResponseCreateCategory(result=results)


@router.post("/category/read", response_model=ResponseReadCategory)
async def read_category(request: Request, data: RequestReadCategory):
    storage: AsyncpgsaStorage = request.app.state.Storage

    results = []

    for idx in data.params:
        query = categories.select().where(categories.c.id == idx)
        result = await storage.fetch(query)

        if result:
            results.append(result[0])

    return ResponseReadCategory(result=results)


@router.post("/category/delete", response_model=ResponseDeleteCategory)
async def delete_category(request: Request, data: RequestDeleteCategory):
    storage: AsyncpgsaStorage = request.app.state.Storage

    for idx in data.params:
        query = (
            categories.delete()
                .where(categories.c.id == idx)
                .returning(sa.literal_column("*"))
        )
        await storage.fetch(query)

    return ResponseDeleteCategory()


@router.post("/category/list", response_model=ResponseListCategory)
async def list_category(request: Request, data: RequestListCategory):
    storage: AsyncpgsaStorage = request.app.state.Storage

    params = data.dict(exclude_unset=True)["params"]

    query = categories.select()

    # Text keys
    keys = ["name"]

    for key in keys:
        if key in params:
            query = query.where(categories.c[key].like(f"%{params[key]}%"))

    # Single value keys
    keys = ["parent_id"]

    for key in keys:
        if key in params:
            query = query.where(categories.c[key] == params[key])

    # Time
    if "created_gt" in params:
        query = query.where(categories.c.created > params["created_gt"].replace(tzinfo=None))

    if "created_lt" in params:
        query = query.where(categories.c.created < params["created_lt"].replace(tzinfo=None))

    if "updated_gt" in params:
        query = query.where(categories.c.updated > params["updated_gt"].replace(tzinfo=None))

    if "updated_lt" in params:
        query = query.where(categories.c.updated < params["updated_lt"].replace(tzinfo=None))

    # Limit and Offset
    query = query.order_by(categories.c.created.desc())

    if "limit" in params:
        query = query.limit(params["limit"])

    if "offset" in params:
        query = query.offset(params["offset"])

    result = await storage.fetch(query)

    return ResponseListCategory(result=result)
