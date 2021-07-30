from os import access
from bcrypt import checkpw, gensalt, hashpw
from flask import Blueprint, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import create_access_token

from flask_l414 import db
from flask_l414.models import UserModel, user_schema, users_schema


auth = Blueprint('auth', __name__)
CORS(auth, supports_credentials=True)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return jsonify({'message': 'Bienvenido al login'})
    if request.json is None:
        return jsonify({'message': 'Content Type debe ser JSON'}), 400

    mail = request.json['mail']
    password = request.json['password']

    if not mail or not password:
        return jsonify({'message': 'Campos incompletos!'}), 400
    user = UserModel.query.filter_by(mail=mail).first()
    if not user:
        return jsonify({'message': 'Error usuario inexistente'}), 404
    if not checkpw(password.encode('utf-8'), user.password.encode("utf-8")):
        return jsonify({'message': 'Contraseña incorrecta'}), 403
    access_token = create_access_token(
        identity={'role': 'admin'},
        expires_delta=False)

    return jsonify({'message': 'Login correcto', "token": access_token})


@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'GET':
        return jsonify({'message': 'Bienvenido al signup'})

    name = request.json['name']
    mail = request.json['mail']
    raw_password = request.json['password']
    university_code = request.json['university_code']
    cellphone = request.json['cellphone']

    pass_hasheada = hashpw(raw_password.encode('utf-8'), gensalt())
    role = "USER"
    user = UserModel.query.filter_by(mail=mail).first()
    if user:
        return jsonify({'message': 'Usuario existente'}), 400
    new_user = UserModel(name=name, mail=mail, password=pass_hasheada, university_code=university_code,
                         role=role, cellphone=cellphone)
    db.session.add(new_user)
    db.session.commit()
    return user_schema.jsonify(new_user)
