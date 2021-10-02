import sqlalchemy as sa
from fastapi import APIRouter, Request

from datetime import datetime as dt

from backend.database.tables import categories, users, questions, statuses
from sqlalchemy.sql import select

from backend.utils.pg_storage import AsyncpgsaStorage
from backend.utils.helper import SimilarQuestionHelper
from backend.middleware.middleware import LoggedRoute

from backend.data_classes.questions import *


router = APIRouter(route_class=LoggedRoute)


async def get_questions_by_id(storage, idxs):
    results = []

    for idx in idxs:
        j = questions.join(categories, questions.c.category_id == categories.c.id).\
            join(users, questions.c.user_id == users.c.id).\
            join(statuses, questions.c.status_id == statuses.c.id)

        query = select(
            [questions,
             categories.c.name.label('category_name'),
             users.c.name.label('user_name'),
             users.c.surname.label('user_surname'),
             users.c.login.label('user_login'),
             statuses.c.name.label('status_name')
            ]).select_from(j).where(questions.c.id == idx)

        result = await storage.fetch(query)

        if result:
            results.append(result[0])

    return results


@router.post("/question/create", response_model=ResponseCreateQuestion)
async def create_question(request: Request, data: RequestCreateQuestion):
    storage: AsyncpgsaStorage = request.app.state.Storage
    helper: SimilarQuestionHelper = request.app.state.SimilarQuestionHelper

    idxs = []

    for question in data.params:
        query = f"""
            INSERT INTO questions (name, body, category_id, user_id, created)
            VALUES ('{question.name}', 
                    '{question.body}', 
                     {question.category_id}, 
                     {question.user_id}, 
                    '{dt.now().strftime("%Y-%m-%d %H:%M:%S")}')
            RETURNING *;
        """
        #
        result = (await storage.fetch(query))[0]
        #
        idxs.append(result["id"])
        #
        helper.put(idx=result["id"], text=question.name)

    results = await get_questions_by_id(storage, idxs)

    return ResponseCreateQuestion(result=results)


@router.post("/question/read", response_model=ResponseReadQuestion)
async def read_question(request: Request, data: RequestReadQuestion):
    storage: AsyncpgsaStorage = request.app.state.Storage

    results = await get_questions_by_id(storage, idxs=data.params)

    return ResponseReadQuestion(result=results)


@router.post("/question/delete", response_model=ResponseDeleteQuestion)
async def delete_question(request: Request, data: RequestDeleteQuestion):
    storage: AsyncpgsaStorage = request.app.state.Storage
    helper: SimilarQuestionHelper = request.app.state.SimilarQuestionHelper

    for idx in data.params:
        query = (
            questions.delete()
                .where(questions.c.id == idx)
                .returning(sa.literal_column("*"))
        )
        result = await storage.fetch(query)

        if result:
            helper.delete(idx=idx, text=result[0]["name"])

    return ResponseDeleteQuestion()


@router.post("/question/list", response_model=ResponseListQuestion)
async def list_question(request: Request, data: RequestListQuestion):
    storage: AsyncpgsaStorage = request.app.state.Storage

    params = data.dict(exclude_unset=True)["params"]

    j = questions.join(categories, questions.c.category_id == categories.c.id). \
        join(users, questions.c.user_id == users.c.id).\
        join(statuses, questions.c.status_id == statuses.c.id)

    query = select(
        [questions,
         categories.c.name.label('category_name'),
         users.c.name.label('user_name'),
         users.c.surname.label('user_surname'),
         users.c.login.label('user_login'),
         statuses.c.name.label('status_name')
         ]).select_from(j)

    # Text keys
    keys = ["name", "body"]

    for key in keys:
        if key in params:
            query = query.where(questions.c[key].like(f"%{params[key]}%"))

    # Single value keys
    keys = ["user_id", "category_id"]

    for key in keys:
        if key in params:
            query = query.where(questions.c[key] == params[key])

    # Time
    if "created_gt" in params:
        query = query.where(questions.c.created > params["created_gt"].replace(tzinfo=None))

    if "created_lt" in params:
        query = query.where(questions.c.created < params["created_lt"].replace(tzinfo=None))

    if "updated_gt" in params:
        query = query.where(questions.c.updated > params["updated_gt"].replace(tzinfo=None))

    if "updated_lt" in params:
        query = query.where(questions.c.updated < params["updated_lt"].replace(tzinfo=None))

    # Limit and Offset
    query = query.order_by(questions.c.created.desc())

    if "limit" in params:
        query = query.limit(params["limit"])

    if "offset" in params:
        query = query.offset(params["offset"])

    result = await storage.fetch(query)

    return ResponseListQuestion(result=result)


@router.post("/question/similar", response_model=ResponseSimilarQuestion)
async def list_question(request: Request, data: RequestSimilarQuestion):
    storage: AsyncpgsaStorage = request.app.state.Storage
    helper: SimilarQuestionHelper = request.app.state.SimilarQuestionHelper

    idxs = []
    for text in data.params:
        idxs.extend(helper.get(text))

    results = await get_questions_by_id(storage, idxs)

    return ResponseSimilarQuestion(result=results)


@router.post("/question/close", response_model=ResponseCloseQuestion)
async def close_question(request: Request, data: RequestCloseQuestion):
    storage: AsyncpgsaStorage = request.app.state.Storage

    for idx in data.params:
        query = f"""
        UPDATE questions
        SET status_id = 2
        WHERE id = {idx};
        """

        try:
            await storage.fetch(query)
        except:
            pass

    results = await get_questions_by_id(storage, idxs=data.params)

    return ResponseCancelQuestion(result=results)


@router.post("/question/cancel", response_model=ResponseCancelQuestion)
async def cancel_question(request: Request, data: RequestCancelQuestion):
    storage: AsyncpgsaStorage = request.app.state.Storage

    for idx in data.params:
        query = f"""
        UPDATE questions
        SET status_id = 3
        WHERE id = {idx};
        """

        try:
            await storage.fetch(query)
        except:
            pass

    results = await get_questions_by_id(storage, idxs=data.params)

    return ResponseCancelQuestion(result=results)
