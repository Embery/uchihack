import sqlalchemy as sa
from sqlalchemy.sql import select
from fastapi import APIRouter, Request

from datetime import datetime as dt

from backend.utils.pg_storage import AsyncpgsaStorage
from backend.middleware.middleware import LoggedRoute

from backend.data_classes.answers import *
from backend.database.tables import answers, users


router = APIRouter(route_class=LoggedRoute)


@router.post("/answer/create", response_model=ResponseCreateAnswer)
async def create_answer(request: Request, data: RequestCreateAnswer):
    storage: AsyncpgsaStorage = request.app.state.Storage

    results = []

    for answer in data.params:
        query = f"""
            INSERT INTO answers (body, question_id, user_id, created)
            VALUES ('{answer.body}', 
                     {answer.question_id}, 
                     {answer.user_id}, 
                    '{dt.now().strftime("%Y-%m-%d %H:%M:%S")}')
            RETURNING *;
        """

        result = (await storage.fetch(query))[0]
        results.append(result)

    idxs = []   # TODO упростить
    for question in results:
        idxs.append(question["id"])

    results = []

    for idx in idxs:
        j = answers.join(users, answers.c.user_id == users.c.id)

        query = select(
            [answers,
             users.c.name.label('user_name'),
             users.c.surname.label('user_surname'),
             users.c.login.label('user_login'),
            ]).select_from(j).where(answers.c.id == idx)

        result = await storage.fetch(query)

        if result:
            results.append(result[0])

    return ResponseCreateAnswer(result=results)


@router.post("/answer/read", response_model=ResponseReadAnswer)
async def read_answer(request: Request, data: RequestReadAnswer):
    storage: AsyncpgsaStorage = request.app.state.Storage

    results = []

    for idx in data.params:
        j = answers.join(users, answers.c.user_id == users.c.id)

        query = select(
            [answers,
             users.c.name.label('user_name'),
             users.c.surname.label('user_surname'),
             users.c.login.label('user_login'),
            ]).select_from(j).where(answers.c.id == idx)

        result = await storage.fetch(query)

        if result:
            results.append(result[0])

    return ResponseReadAnswer(result=results)


@router.post("/answer/delete", response_model=ResponseDeleteAnswer)
async def delete_answer(request: Request, data: RequestDeleteAnswer):
    storage: AsyncpgsaStorage = request.app.state.Storage

    for idx in data.params:
        query = (
            answers.delete()
                .where(answers.c.id == idx)
                .returning(sa.literal_column("*"))
        )
        await storage.fetch(query)

    return ResponseDeleteAnswer()


@router.post("/answer/list", response_model=ResponseListAnswer)
async def list_answer(request: Request, data: RequestListAnswer):
    storage: AsyncpgsaStorage = request.app.state.Storage

    params = data.dict(exclude_unset=True)["params"]

    j = answers.join(users, answers.c.user_id == users.c.id)

    query = select(
        [answers,
         users.c.name.label('user_name'),
         users.c.surname.label('user_surname'),
         users.c.login.label('user_login'),
         ]).select_from(j)

    # Text keys
    keys = ["body"]

    for key in keys:
        if key in params:
            query = query.where(answers.c[key].like(f"%{params[key]}%"))

    # Single value keys
    keys = ["user_id", "question_id"]

    for key in keys:
        if key in params:
            query = query.where(answers.c[key] == params[key])

    # Time
    if "created_gt" in params:
        query = query.where(answers.c.created > params["created_gt"].replace(tzinfo=None))

    if "created_lt" in params:
        query = query.where(answers.c.created < params["created_lt"].replace(tzinfo=None))

    if "updated_gt" in params:
        query = query.where(answers.c.updated > params["updated_gt"].replace(tzinfo=None))

    if "updated_lt" in params:
        query = query.where(answers.c.updated < params["updated_lt"].replace(tzinfo=None))

    # Limit and Offset
    query = query.order_by(answers.c.created.desc())

    if "limit" in params:
        query = query.limit(params["limit"])

    if "offset" in params:
        query = query.offset(params["offset"])

    result = await storage.fetch(query)

    return ResponseListAnswer(result=result)
