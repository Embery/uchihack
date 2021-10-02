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
        "DATABASE_URL",
        "postgresql://dwwnedmbkjlrmu:73dbd4f4ac5b78d3209768a2b92dde8f8c9d1d8b1bc5c45f63541bdc094c5d35@ec2-54-73-58-75.eu-west-1.compute.amazonaws.com:5432/ddh32q28b5vmav"
    )
    POSTGRES_MIN_SIZE = "5"
    POSTGRES_MAX_SIZE = "75"
