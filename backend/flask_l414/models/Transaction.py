from flask_l414 import db, ma
from flask_l414.models.Base import Base


class TransactionModel(Base):
    __tablename__ = 'transaction'

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    component_id = db.Column(db.Integer, db.ForeignKey('component.id'))
    is_approved = db.Column(db.String(1))
    quantity = db.Column(db.Integer)
    operation = db.Column(db.String(1))

    def __init__(self, user_id, component_id, is_approved, quantity, operation):
        self.user_id = user_id
        self.component_id = component_id
        self.is_approved = is_approved
        self.quantity = quantity
        self.operation = operation


# class TransactionSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'user_id', 'component_id',
#                   'is_approved', 'quantity', 'operation')
class TransactionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TransactionModel


transaction_schema = TransactionSchema()
transactions_schema = TransactionSchema(many=True)
