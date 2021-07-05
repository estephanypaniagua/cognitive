from operator import methodcaller
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import user
#import category
import component
#import transaction

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/prueba'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(70))
    user = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(20))
    university_code = db.Column(db.Integer, unique=True)
    role = db.Column(db.String(2))
    mail = db.Column(db.String(70), unique=True)
    cellphone = db.Column(db.Integer)

    def __init__(self, name, user, password, university_code, role, mail, cellphone):
        self.name = name
        self.user = user
        self.password = password
        self.university_code = university_code
        self.role = role
        self.mail = mail
        self.cellphone = cellphone


class Component(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(70), unique=True)
    description = db.Column(db.String(100))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    quantity = db.Column(db.Integer)

    def __init__(self, name, description, category_id, quantity):
        self.name = name
        self.description = description
        self.category_id = category_id
        self.quantity = quantity


db.create_all()


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'user', 'password',
                  'university_code', 'mail', 'cellphone')


user_schema = UserSchema()
users_schema = UserSchema(many=True)


class ComponentSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'description', 'category_id', 'quantity')


component_schema = ComponentSchema()
components_schema = ComponentSchema(many=True)

# Inicio


@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Welcome to my API'})

# User


# @app.route('/users', methods=['Post'])
# def create_user(): return user.create_user()


# @app.route('/users', methods=['GET'])
# def get_users(): return user.get_users()


# @app.route('/users/<id>', methods=['GET'])
# def get_user(id): return user.get_user(id)


# @app.route('/users/<id>', methods=['PUT'])
# def update_user(id): return user.update_user(id)


# @app.route('/users/<id>', methods=['DELETE'])
# def delete_user(id): return user.delete_user(id)

# Component


@app.route('/components', methods=['Post'])
def create_component(): return component.create_component()


@app.route('/components', methods=['GET'])
def get_components(): return component.get_components()


@app.route('/components/<id>', methods=['GET'])
def get_component(id): return component.get_component(id)


@app.route('/components/<id>', methods=['PUT'])
def update_component(id): return component.update_component(id)


@app.route('/components/<id>', methods=['DELETE'])
def delete_component(id): return component.delete_component(id)

# # Category


# @app.route('/categorys', methods=['Post'])
# def create_category(): return category.create_category()


# @app.route('/categorys', methods=['GET'])
# def get_categorys(): return category.get_categorys()


# @app.route('/categorys/<id>', methods=['GET'])
# def get_category(id): return category.get_category(id)


# @app.route('/categorys/<id>', methods=['PUT'])
# def update_category(id): return category.update_category(id)


# @app.route('/categorys/<id>', methods=['DELETE'])
# def delete_category(id): return category.delete_category(id)

# # Transaction


# @app.route('/transactions', methods=['POST'])
# def create_transaction(): return transaction.create_transaction()


# @app.route('/transactions', methods=['GET'])
# def get_transactions(): return transaction.get_transactions()


# @app.route('/transactions/<id>', methods=['GET'])
# def get_transaction(id): return transaction.get_transaction(id)


# @app.route('/transactions/<id>', methods=['PUT'])
# def update_transaction(id): return transaction.update_transaction(id)


# @app.route('/transactions/<id>', methods=['DELETE'])
# def delete_transaction(id): return transaction.delete_transaction(id)

# # Login


# @app.route('/login', methods=['POST'])
# def login(): return user.login()


if __name__ == "__main__":
    app.run(debug=True)
