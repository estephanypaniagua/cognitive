from flask import Flask, request, jsonify
from app import db, ma, User, user_schema, users_schema


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


def get_users():
    # Leer todos los datos
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)


def get_user(id):
    # Leer 1 dato
    user = User.query.get(id)
    return user_schema.jsonify(user)


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


def delete_user(id):
    # Eliminar 1 dato
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()

    return user_schema.jsonify(user)


def login():
    message = "Hols"
    return jsonify(message)
