from enum import Enum
from flask_l414 import db, ma


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

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class CategoryModel(Base):
    __tablename__ = 'category'

    name = db.Column(db.String(70), unique=True)
    description = db.Column(db.String(100))

    components = db.relationship("ComponentModel", back_populates="category")

    def __init__(self, name, description):
        self.name = name
        self.description = description


class ComponentModel(Base):
    __tablename__ = 'component'

    name = db.Column(db.String(70), unique=True)
    description = db.Column(db.String(100))
    quantity = db.Column(db.Integer)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))

    category = db.relationship("CategoryModel", back_populates="components")

    def __init__(self, name, description, quantity, category_id):
        self.name = name
        self.description = description
        self.quantity = quantity
        self.category_id = category_id


class TransactionModel(Base):
    __tablename__ = 'transaction'

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    is_approved = db.Column(db.String(1))

    def __init__(self, user_id, is_approved):
        self.user_id = user_id
        self.is_approved = is_approved


class TransactionItemModel(Base):
    __tablename__ = 'transaction_item'

    transaction_id = db.Column(db.Integer, db.ForeignKey('transaction.id'))
    component_id = db.Column(db.Integer, db.ForeignKey('component.id'))
    quantity = db.Column(db.Integer)
    operation = db.Column(db.String(1))

    def __init__(self, transaction_id, component_id, quantity, operation):
        self.transaction_id = transaction_id
        self.component_id = component_id
        self.quantity = quantity
        self.operation = operation


# class UserRoles(Enum):
#     ADMIN = "admin"
#     NORMAL = "normal"


class UserModel(Base):
    __tablename__ = 'user'

    name = db.Column(db.String(70))
    mail = db.Column(db.String(70), unique=True)
    password = db.Column(db.String(255))
    university_code = db.Column(db.Integer, unique=True)
    role = db.Column(db.String(15))
    # role = db.Column(db.Enum(UserRoles))
    cellphone = db.Column(db.Integer)

    def __init__(self, name, mail, password, university_code, role, cellphone):
        self.name = name
        self.mail = mail
        self.password = password
        self.university_code = university_code
        self.role = role
        self.cellphone = cellphone


# asd

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = UserModel


user_schema = UserSchema()
users_schema = UserSchema(many=True)


class CategorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CategoryModel


category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)


class ComponentSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'description', 'category_id', 'quantity')
# class ComponentSchema(ma.SQLAlchemyAutoSchema):
#     class Meta:
#         model = ComponentModel


component_schema = ComponentSchema()
components_schema = ComponentSchema(many=True)


class TransactionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user_id', 'is_approved', 'created_at', 'updated_at')


transaction_schema = TransactionSchema()
transactions_schema = TransactionSchema(many=True)


class TransactionItemSchema(ma.Schema):
    class Meta:
        fields = ('id', 'transaction_id', 'component_id',
                  'quantity', 'operation', 'created_at', 'updated_at')


transaction_item_schema = TransactionItemSchema()
transaction_items_schema = TransactionItemSchema(many=True)
