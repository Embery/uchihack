import orjson
import asyncpgsa
from asyncpg.pool import Pool
from sqlalchemy.dialects import postgresql

from typing import Optional


class AsyncpgsaStorage:
    connection: Optional[Pool]
    transaction: Optional
    transaction_connection: Optional

    def __init__(
        self,
        dsn: str = None,
        host: str = None,
        port: int = None,
        database: str = None,
        user: str = None,
        password: str = None,
        min_size: int = 10,
        max_size: int = 10,
        max_queries: int = 50000,
        max_inactive_connection_lifetime: float = 300.0,
    ):
        """
        Class which provides a wrapper around asyncpgsa package.

        :param dsn: Postgres dsn.
        :param host: Postgres host.
        :param port: Postgres port.
        :param database: Postgres database.
        :param user: Postgres user.
        :param password: Postgres password.
        :param min_size: Minimum number of connections in the pool.
        :param max_size: Maximum number of connections in the pool.
        :param max_queries: Number of queries after which a connection
         is closed and replaced with a new one.
        :param max_inactive_connection_lifetime: Number of seconds after which
         inactive connections in the pool will be closed.
          Pass 0 to turn this off.
        """
        self.connection = None

        self.dsn = dsn
        self.host = host
        self.port = port
        self.database = database
        self.user = user
        self.password = password
        self.min_size = int(min_size)
        self.max_size = int(max_size)
        self.max_queries = int(max_queries)
        self.max_inactive_connection_lifetime = float(max_inactive_connection_lifetime)

        if not self.dsn and not (
            self.host and self.port and self.database and self.user and self.password
        ):
            raise RuntimeError("Postgres connections settings are not filled.")

    def get_dialect(self):
        """Get currently used SQLAlchemy dialect. """
        return postgresql

    async def connection_open(self):
        """Open connection to PostgreSQL. """
        if self.connection:
            await self.connection_close()

            raise RuntimeWarning(
                "Tried to open a new connection while a previous connection wasn't closed."
            )

        self.connection = await asyncpgsa.create_pool(
            dsn=self.dsn,
            host=self.host,
            port=self.port,
            database=self.database,
            user=self.user,
            password=self.password,
            min_size=self.min_size,
            max_size=self.max_size,
            max_queries=self.max_queries,
            max_inactive_connection_lifetime=self.max_inactive_connection_lifetime,
            init=self.connection_init,
            # connection_class=SAConnection,
        )

    async def connection_close(self):
        """Close connection to PostgreSQL. """
        if not self.connection:
            raise RuntimeWarning(
                "Tried to close a not open connection."
            )

        await self.connection.close()

        self.connection = None

    @staticmethod
    async def connection_init(connection) -> None:
        """Modify PostgreSQL connection. """
        # decode jsonb on arrival
        await connection.set_type_codec(
            "jsonb",
            encoder=str,
            decoder=orjson.loads,
            schema="pg_catalog",
        )

    async def fetch(self, query, connection=None) -> list:
        """Fetch several rows. """
        if connection:
            results = await connection.fetch(query)
        else:
            async with self.connection.acquire() as conn:
                results = await conn.fetch(query)

        return [dict(row) for row in results] if results else []
