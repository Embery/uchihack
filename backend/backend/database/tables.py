import sqlalchemy as sa
from datetime import datetime

metadata = sa.MetaData()


users = sa.Table(
    "users",
    metadata,
    sa.Column("id", sa.Integer, primary_key=True),
    sa.Column("login", sa.String, nullable=False),
    sa.Column("password", sa.String, nullable=False),
    sa.Column("name", sa.String, nullable=False),
    sa.Column("surname", sa.String, nullable=False),
    sa.Column("rating", sa.Integer, default=0),
    sa.Column("created", sa.TIMESTAMP, nullable=False, default=datetime.utcnow),
    sa.Column("updated", sa.TIMESTAMP, onupdate=datetime.utcnow),
)

categories = sa.Table(
    "categories",
    metadata,
    sa.Column("id", sa.Integer, primary_key=True),
    sa.Column("name", sa.String, nullable=False),
    sa.Column("parent_id", sa.Integer, sa.ForeignKey("categories.id", ondelete="CASCADE")),
    sa.Column("created", sa.TIMESTAMP, nullable=False, default=datetime.utcnow),
    sa.Column("updated", sa.TIMESTAMP, onupdate=datetime.utcnow),
)


answers = sa.Table(
    "answers",
    metadata,
    sa.Column("id", sa.Integer, primary_key=True),
    sa.Column("body", sa.String, nullable=False),
    sa.Column("question_id", sa.Integer, sa.ForeignKey("questions.id", ondelete="CASCADE"), nullable=False),
    sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
    sa.Column("created", sa.TIMESTAMP, nullable=False, default=datetime.utcnow),
    sa.Column("updated", sa.TIMESTAMP, onupdate=datetime.utcnow),
)

questions = sa.Table(
    "questions",
    metadata,
    sa.Column("id", sa.Integer, primary_key=True),
    sa.Column("name", sa.String, nullable=False),
    sa.Column("body", sa.String, nullable=False),
    sa.Column("category_id", sa.Integer, sa.ForeignKey("categories.id", ondelete="CASCADE"), nullable=False),
    sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
    sa.Column("status_id", sa.Integer, sa.ForeignKey("statuses.id")),
    sa.Column("created", sa.TIMESTAMP, nullable=False, default=datetime.utcnow),
    sa.Column("updated", sa.TIMESTAMP, onupdate=datetime.utcnow),
)

statuses = sa.Table(
    "statuses",
    metadata,
    sa.Column("id", sa.Integer, primary_key=True),
    sa.Column("name", sa.String, nullable=False),
)
