from flask import Blueprint, jsonify, request
from flask_cors import CORS

from flask_l414 import db
from flask_l414.models import CategoryModel, categories_schema, category_schema


categories = Blueprint('categories', __name__)
CORS(categories, supports_credentials=True)


@categories.route('/categories', methods=['POST'])
def create_category():
    # Crear datos
    name = request.json['name']
    description = request.json['description']
    new_category = CategoryModel(name, description)
    db.session.add(new_category)
    db.session.commit()
    return category_schema.jsonify(new_category)


@categories.route('/categories', methods=['GET'])
def get_categories():
    # Leer todos los datos
    all_categories = CategoryModel.query.all()
    result = categories_schema.dump(all_categories)
    return jsonify(result)


@categories.route('/categories/<id>', methods=['GET'])
def get_category(id):
    # Leer 1 dato
    category = CategoryModel.query.get(id)
    return category_schema.jsonify(category)


@categories.route('/categories/<id>', methods=['PUT'])
def update_category(id):
    # Actualizar 1 dato
    category = CategoryModel.query.get(id)
    name = request.json['name']
    description = request.json['description']
    category.name = name
    category.description = description
    db.session.commit()
    return category_schema.jsonify(category)


@categories.route('/categories/<id>', methods=['DELETE'])
def delete_category(id):
    # Eliminar 1 dato
    category = CategoryModel.query.get(id)
    db.session.delete(category)
    db.session.commit()
    return category_schema.jsonify(category)
