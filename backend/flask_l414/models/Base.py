from flask_l414 import db


class Base(db.Model):
    __abstract__ = True
    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True)
    created_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp())
    updated_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp())
