from flask import request, jsonify
from app import db, ma


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(70), unique=True)
    description = db.Column(db.String(100))

    def __init__(self, name, description):
        self.name = name
        self.description = description


db.create_all()


class CategorySchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'description')


category_schema = CategorySchema()
categorys_schema = CategorySchema(many=True)


def create_category():
    # Crear datos
    name = request.json['name']
    description = request.json['description']

    new_category = Category(name, description)

    db.session.add(new_category)
    db.session.commit()

    return category_schema.jsonify(new_category)


def get_categorys():
    # Leer todos los datos
    all_categorys = Category.query.all()
    result = categorys_schema.dump(all_categorys)
    return jsonify(result)


def get_category(id):
    # Leer 1 dato
    category = Category.query.get(id)
    return category_schema.jsonify(category)


def update_category(id):
    # Actualizar 1 dato
    category = Category.query.get(id)

    name = request.json['name']
    description = request.json['description']

    category.name = name
    category.description = description

    db.session.commit()
    return category_schema.jsonify(category)


def delete_category(id):
    # Eliminar 1 dato
    category = Category.query.get(id)
    db.session.delete(category)
    db.session.commit()

    return category_schema.jsonify(category)
