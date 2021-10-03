from os import environ

en = environ.get


def boolean(value: str):
    if value.lower() in ("", "0", "false"):
        return False

    return True


class Config:
    HOST = "0.0.0.0"
    PORT = int(en("PORT", "8080"))

    # postgres
    POSTGRES_DSN = en(
        "DATABASE_URL"
    )
    POSTGRES_MIN_SIZE = "5"
    POSTGRES_MAX_SIZE = "75"
