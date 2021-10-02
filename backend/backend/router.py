from fastapi import APIRouter
from fastapi.responses import ORJSONResponse

from backend.api.answers import router as answers_router
from backend.api.categories import router as categories_router
from backend.api.questions import router as questions_router
from backend.api.users import router as users_router


api_answers = APIRouter(
    default_response_class=ORJSONResponse,
    tags=["Answers"],
)
api_answers.include_router(answers_router)

#

api_categories = APIRouter(
    default_response_class=ORJSONResponse,
    tags=["Categories"],
)
api_categories.include_router(categories_router)

#

api_questions = APIRouter(
    default_response_class=ORJSONResponse,
    tags=["Questions"],
)
api_questions.include_router(questions_router)

#

api_users = APIRouter(
    default_response_class=ORJSONResponse,
    tags=["Users"],
)
api_users.include_router(users_router)
