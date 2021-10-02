import sqlalchemy as sa
from fastapi import APIRouter, Request

from uuid import uuid4
from datetime import datetime as dt

from backend.utils.pg_storage import AsyncpgsaStorage
from backend.middleware.middleware import LoggedRoute

from backend.data_classes.users import *
from backend.database.tables import users


router = APIRouter(route_class=LoggedRoute)


@router.post("/user/login", response_model=ResponseLogin)
async def login(request: Request, data: RequestLogin):
    storage: AsyncpgsaStorage = request.app.state.Storage
    session_keeper = request.app.state.SessionKeeper

    query = users.select().where(users.c.login == data.params.login).\
        where(users.c.password == data.params.password)
    result = await storage.fetch(query)

    if not result:
        raise RuntimeError("Invalid login or password")

    session_id = str(uuid4())
    session_keeper.put(session_id)

    query = users.select().where(users.c.id == result[0]["id"])
    result = {"session_id": session_id, **(await storage.fetch(query))[0]}

    return ResponseLogin(result=result)


@router.post("/user/create", response_model=ResponseCreateUser)
async def create_user(request: Request, data: RequestCreateUser):
    storage: AsyncpgsaStorage = request.app.state.Storage

    results = []

    for user in data.params:
        query = f"""
            INSERT INTO users (login, password, name, surname, created)
            VALUES ('{user.login}', 
                    '{user.password}', 
                    '{user.name}', 
                    '{user.surname}', 
                    '{dt.now().strftime("%Y-%m-%d %H:%M:%S")}')
            RETURNING *;
        """

        result = (await storage.fetch(query))[0]
        results.append(result)

    return ResponseCreateUser(result=results)


@router.post("/user/read", response_model=ResponseReadUser)
async def read_user(request: Request, data: RequestReadUser):
    storage: AsyncpgsaStorage = request.app.state.Storage

    results = []

    for idx in data.params:
        query = users.select().where(users.c.id == idx)
        result = await storage.fetch(query)

        if result:
            results.append(result[0])

    return ResponseReadUser(result=results)


@router.post("/user/delete", response_model=ResponseDeleteUser)
async def delete_user(request: Request, data: RequestDeleteUser):
    storage: AsyncpgsaStorage = request.app.state.Storage

    for idx in data.params:
        query = (
            users.delete()
                .where(users.c.id == idx)
                .returning(sa.literal_column("*"))
        )
        await storage.fetch(query)

    return ResponseDeleteUser()
