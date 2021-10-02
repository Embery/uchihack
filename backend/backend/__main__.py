import uvicorn

from backend.config import Config

uvicorn.run(
    "backend.run_server:app",
    host=Config.HOST,
    port=Config.PORT,
    log_level="error",
)
