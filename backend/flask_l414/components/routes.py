from flask import Blueprint, jsonify, request, Response
from flask_cors import CORS

from flask_l414 import db
from flask_l414.models import ComponentModel, component_schema, components_schema


components = Blueprint('components', __name__)
CORS(components, supports_credentials=True)


@components.route('/components', methods=['GET'])
def get_components():
    # Leer todos los datos

    all_components = ComponentModel.query.all()
    result = components_schema.dump(all_components)
    cc = len(result)
    response = jsonify(result)
    response.headers["Content-Range"] = f"bytes {0}-{cc}/{cc}"
    response.headers["Access-Control-Expose-Headers"] = "Content-Range"
    return response


@components.route('/components/<id>', methods=['GET'])
def get_component(id):
    # Leer 1 dato
    component = ComponentModel.query.get(id)
    return component_schema.jsonify(component)


@components.route('/components', methods=['POST'])
def create_component():
    # Crear datos
    name = request.json['name']
    description = request.json['description']
    category_id = request.json['category_id']
    quantity = request.json['quantity']
    new_component = ComponentModel(name, description, quantity, category_id)
    db.session.add(new_component)
    db.session.commit()
    return component_schema.jsonify(new_component)


@components.route('/components/<id>', methods=['PUT'])
def update_component(id):
    # Actualizar 1 dato
    component = ComponentModel.query.get(id)
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


@components.route('/components/<id>', methods=['DELETE'])
def delete_component(id):
    # Eliminar 1 dato
    component = ComponentModel.query.get(id)
    db.session.delete(component)
    db.session.commit()
    return component_schema.jsonify(component)
