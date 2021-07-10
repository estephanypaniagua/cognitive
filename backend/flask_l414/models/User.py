from flask_l414 import db, ma
from flask_l414.models.Base import Base


class UserModel(Base):
    __tablename__ = 'user'

    name = db.Column(db.String(70))
    mail = db.Column(db.String(70), unique=True)
    password = db.Column(db.String(255))
    university_code = db.Column(db.Integer, unique=True)
    role = db.Column(db.String(15))
    cellphone = db.Column(db.Integer)

    def __init__(self, name, mail, password, university_code, role, cellphone):
        self.name = name
        self.mail = mail
        self.password = password
        self.university_code = university_code
        self.role = role
        self.cellphone = cellphone


# class UserSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'name', 'user', 'password',
#                   'university_code', 'mail', 'cellphone')
class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = UserModel


user_schema = UserSchema()
users_schema = UserSchema(many=True)
