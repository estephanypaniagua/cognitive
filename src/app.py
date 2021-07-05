from operator import methodcaller
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

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


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(70), unique=True)
    description = db.Column(db.String(100))

    def __init__(self, name, description):
        self.name = name
        self.description = description


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


class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
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


db.create_all()


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'user', 'password',
                  'university_code', 'mail', 'cellphone')


user_schema = UserSchema()
users_schema = UserSchema(many=True)


class CategorySchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'description')


category_schema = CategorySchema()
categorys_schema = CategorySchema(many=True)


class ComponentSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'description', 'category_id', 'quantity')


component_schema = ComponentSchema()
components_schema = ComponentSchema(many=True)


class TransactionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user_id', 'component_id',
                  'is_approved', 'quantity', 'operation')


transaction_schema = TransactionSchema()
transactions_schema = TransactionSchema(many=True)

# Inicio


@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Welcome to my API'})

# User


@app.route('/users', methods=['Post'])
def create_user():
    # Crear datos
    name = request.json['name']
    user = request.json['user']
    password = request.json['password']
    university_code = request.json['university_code']
    role = request.json['role']
    mail = request.json['mail']
    cellphone = request.json['cellphone']
    new_user = User(name, user, password, university_code,
                    role, mail, cellphone)
    db.session.add(new_user)
    db.session.commit()
    return user_schema.jsonify(new_user)


@app.route('/users', methods=['GET'])
def get_users():
    # Leer todos los datos
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)


@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    # Leer 1 dato
    user = User.query.get(id)
    return user_schema.jsonify(user)


@app.route('/users/<id>', methods=['PUT'])
def update_user(id):
    # Actualizar 1 dato
    user_real = User.query.get(id)
    name = request.json['name']
    user = request.json['user']
    password = request.json['password']
    university_code = request.json['university_code']
    role = request.json['role']
    mail = request.json['mail']
    cellphone = request.json['cellphone']
    user_real.name = name
    user_real.user = user
    user_real.password = password
    user_real.university_code = university_code
    user_real.role = role
    user_real.mail = mail
    user_real.cellphone = cellphone
    db.session.commit()
    return user_schema.jsonify(user_real)


@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    # Eliminar 1 dato
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return user_schema.jsonify(user)
# Component


@app.route('/components', methods=['Post'])
def create_component():
    # Crear datos
    name = request.json['name']
    description = request.json['description']
    category_id = request.json['category_id']
    quantity = request.json['quantity']
    new_component = Component(name, description, category_id, quantity)
    db.session.add(new_component)
    db.session.commit()
    return component_schema.jsonify(new_component)


@app.route('/components', methods=['GET'])
def get_components():
    # Leer todos los datos
    all_components = Component.query.all()
    result = components_schema.dump(all_components)
    return jsonify(result)


@app.route('/components/<id>', methods=['GET'])
def get_component(id):
    # Leer 1 dato
    component = Component.query.get(id)
    return component_schema.jsonify(component)


@app.route('/components/<id>', methods=['PUT'])
def update_component(id):
    # Actualizar 1 dato
    component = Component.query.get(id)
    name = request.json['name']
    description = request.json['description']
    category_id = request.json['category_id']
    quantity = request.json['quantity']
    component.name = name
    component.description = description
    component.category_id = category_id
    component.quantity = quantity
    db.session.commit()
    return component_schema.jsonify(component)


@app.route('/components/<id>', methods=['DELETE'])
def delete_component(id):
    # Eliminar 1 dato
    component = Component.query.get(id)
    db.session.delete(component)
    db.session.commit()
    return component_schema.jsonify(component)
# Category


@app.route('/categorys', methods=['Post'])
def create_category():
    # Crear datos
    name = request.json['name']
    description = request.json['description']
    new_category = Category(name, description)
    db.session.add(new_category)
    db.session.commit()
    return category_schema.jsonify(new_category)


@app.route('/categorys', methods=['GET'])
def get_categorys():
    # Leer todos los datos
    all_categorys = Category.query.all()
    result = categorys_schema.dump(all_categorys)
    return jsonify(result)


@app.route('/categorys/<id>', methods=['GET'])
def get_category(id):
    # Leer 1 dato
    category = Category.query.get(id)
    return category_schema.jsonify(category)


@app.route('/categorys/<id>', methods=['PUT'])
def update_category(id):
    # Actualizar 1 dato
    category = Category.query.get(id)
    name = request.json['name']
    description = request.json['description']
    category.name = name
    category.description = description
    db.session.commit()
    return category_schema.jsonify(category)


@app.route('/categorys/<id>', methods=['DELETE'])
def delete_category(id):
    # Eliminar 1 dato
    category = Category.query.get(id)
    db.session.delete(category)
    db.session.commit()
    return category_schema.jsonify(category)

# Transaction


@app.route('/transactions', methods=['POST'])
def create_transaction():
    # Crear datos
    user_id = request.json['user_id']
    component_id = request.json['component_id']
    is_approved = request.json['is_approved']
    quantity = request.json['quantity']
    operation = request.json['operation']
    new_transaction = Transaction(
        user_id, component_id, is_approved, quantity, operation)
    db.session.add(new_transaction)
    db.session.commit()
    return transaction_schema.jsonify(new_transaction)


@app.route('/transactions', methods=['GET'])
def get_transactions():
    # Leer todos los datos
    all_transactions = Transaction.query.all()
    result = transactions_schema.dump(all_transactions)
    return jsonify(result)


@app.route('/transactions/<id>', methods=['GET'])
def get_transaction(id):
    # Leer 1 dato
    transaction = Transaction.query.get(id)
    return transaction_schema.jsonify(transaction)


@app.route('/transactions/<id>', methods=['PUT'])
def update_transaction(id):
    # Actualizar 1 dato
    transaction = Transaction.query.get(id)
    user_id = request.json['user_id']
    component_id = request.json['component_id']
    is_approved = request.json['is_approved']
    quantity = request.json['quantity']
    operation = request.json['operation']
    transaction.user_id = user_id
    transaction.component_id = component_id
    transaction.is_approved = is_approved
    transaction.quantity = quantity
    transaction.operation = operation
    db.session.commit()
    return transaction_schema.jsonify(transaction)


@app.route('/transactions/<id>', methods=['DELETE'])
def delete_transaction(id):
    # Eliminar 1 dato
    transaction = Transaction.query.get(id)
    db.session.delete(transaction)
    db.session.commit()
    return transaction_schema.jsonify(transaction)


# Login


# @app.route('/login', methods=['POST'])
# def login(): return user.login()


if __name__ == "__main__":
    app.run(debug=True)
