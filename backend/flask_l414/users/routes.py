from flask import Blueprint, jsonify, request
from flask_cors import CORS

from flask_l414 import db
from flask_l414.models.User import UserModel, user_schema, users_schema


users = Blueprint('users', __name__)
CORS(users, supports_credentials=True)


@users.route('/users', methods=['POST'])
def create_user():
    # Crear datos
    name = request.json['name']
    mail = request.json['mail']
    password = request.json['password']
    university_code = request.json['university_code']
    role = request.json['role']
    cellphone = request.json['cellphone']
    new_user = UserModel(name, mail, password, university_code,
                         role, cellphone)
    db.session.add(new_user)
    db.session.commit()
    return user_schema.jsonify(new_user)


@users.route('/users', methods=['GET'])
def get_users():
    # Leer todos los datos
    all_users = UserModel.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)


@users.route('/users/<id>', methods=['GET'])
def get_user(id):
    # Leer 1 dato
    user = UserModel.query.get(id)
    return user_schema.jsonify(user)


@users.route('/users/<id>', methods=['PUT'])
def update_user(id):
    # Actualizar 1 dato
    user_real = UserModel.query.get(id)
    name = request.json['name']
    mail = request.json['mail']
    password = request.json['password']
    university_code = request.json['university_code']
    role = request.json['role']
    cellphone = request.json['cellphone']
    user_real.name = name
    user_real.mail = mail
    user_real.password = password
    user_real.university_code = university_code
    user_real.role = role
    user_real.cellphone = cellphone
    db.session.commit()
    return user_schema.jsonify(user_real)


@users.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    # Eliminar 1 dato
    user = UserModel.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return user_schema.jsonify(user)
