from fastapi import FastAPI
from starlette.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

# from pathlib import Path
# from alembic import command
# from alembic.config import Config as AConfig

from backend.database.tables import questions

from backend.middleware.middleware import LoggedRoute, MiddlewareFastAPI
from backend.utils.pg_storage import AsyncpgsaStorage
from backend.utils.helper import SimilarQuestionHelper
from backend.utils.session import SessionKeeper

from backend.config import Config
from backend.router import api_answers, api_categories, api_questions, api_users


app = FastAPI(
    title="Uchi Hack Backend",
    docs_url="/doc",
    redoc_url=None,
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routes
app.include_router(api_answers)
app.include_router(api_categories)
app.include_router(api_questions)
app.include_router(api_users)

# Config
app.state.config = Config()

# Postgres
app.state.Storage = AsyncpgsaStorage(
    dsn=Config.POSTGRES_DSN,
    min_size=Config.POSTGRES_MIN_SIZE,
    max_size=Config.POSTGRES_MAX_SIZE,
)

# Similar Questions
app.state.SimilarQuestionHelper = SimilarQuestionHelper()

app.state.SessionKeeper = SessionKeeper()


#

async def callback(*args, **kwargs):
    print(args, kwargs)

middleware = MiddlewareFastAPI(
    callback_log_request=callback,
    callback_log_response=callback,
    callback_log_error=callback,
)

LoggedRoute.middlewares = []  # Clear middlewares list as a precaution
LoggedRoute.middlewares.append(middleware.server_error_handler)


@app.get("/", include_in_schema=False)
@app.get("/docs", include_in_schema=False)
async def redirect_doc():
    return RedirectResponse("/doc")


async def load_questions_to_helper():
    query = questions.select()
    result = await app.state.Storage.fetch(query)

    for quest in result:
        app.state.SimilarQuestionHelper.put(idx=quest["id"], text=quest["name"])


async def load_statuses_model_to_db():
    statuses = [
        (1, "Новый"),
        (2, "Закрыт"),
        (3, "Отклонен")
    ]

    for status in statuses:
        query = f"""
            INSERT INTO statuses (id, name)
            VALUES ({status[0]}, '{status[1]}')
        """
        try:
            result = await app.state.Storage.fetch(query)
        except Exception:
            pass


# Event handlers
@app.on_event("startup")
async def startup():
    # Alembic
    # alembic_config = AConfig(Path(__file__).parent.parent / "alembic.ini")
    # alembic_config.set_main_option(
    #     "script_location", str(Path(__file__).parent.parent / "alembic")
    # )
    # alembic_config.set_main_option("sqlalchemy.url", Config.POSTGRES_DSN)
    # command.upgrade(alembic_config, "head")

    # Postgres
    await app.state.Storage.connection_open()
    #
    await load_questions_to_helper()
    #
    await load_statuses_model_to_db()

    print(
        f"======== Running on "
        f"http://{app.state.config.HOST}:{app.state.config.PORT}"
        f" ========"
    )


@app.on_event("shutdown")
async def shutdown():
    # Postgres
    await app.state.Storage.connection_close()
