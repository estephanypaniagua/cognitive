from flask_l414 import db, ma
from flask_l414.models.Base import Base


class ComponentModel(Base):
    __tablename__ = 'component'

    name = db.Column(db.String(70), unique=True)
    description = db.Column(db.String(100))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    quantity = db.Column(db.Integer)

    def __init__(self, name, description, category_id, quantity):
        self.name = name
        self.description = description
        self.category_id = category_id
        self.quantity = quantity


# class ComponentSchema(ma.Schema):
#     class Meta:
#       fields = ('id', 'name', 'description', 'category_id', 'quantity')
class ComponentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ComponentModel


component_schema = ComponentSchema()
components_schema = ComponentSchema(many=True)
