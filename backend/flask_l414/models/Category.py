from flask_l414 import db, ma
from flask_l414.models.Base import Base


class CategoryModel(Base):
    __tablename__ = 'category'

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


category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)
