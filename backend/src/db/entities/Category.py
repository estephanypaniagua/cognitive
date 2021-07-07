from db.entities.Base import Base
from app import db, ma


class CategoryModel(Base):
    name = db.Column(db.String(70), unique=True)
    description = db.Column(db.String(100))

    def __init__(self, name, description):
        self.name = name
        self.description = description


# class CategorySchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'name', 'description')
class CategorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CategoryModel
