from flask import Flask, request, jsonify
from app import db, ma, Component, component_schema, components_schema


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


def get_components():
    # Leer todos los datos
    all_components = Component.query.all()
    result = components_schema.dump(all_components)
    return jsonify(result)


def get_component(id):
    # Leer 1 dato
    component = Component.query.get(id)
    return component_schema.jsonify(component)


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


def delete_component(id):
    # Eliminar 1 dato
    component = Component.query.get(id)
    db.session.delete(component)
    db.session.commit()

    return component_schema.jsonify(component)
