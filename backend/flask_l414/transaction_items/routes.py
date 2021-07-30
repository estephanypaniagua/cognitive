from flask import Blueprint, jsonify, request
from flask_cors import CORS

from flask_l414 import db
from flask_l414.models import TransactionItemModel, transaction_item_schema, transaction_items_schema


transaction_items = Blueprint('transaction_items', __name__)
CORS(transaction_items, supports_credentials=True)


@transaction_items.route('/transaction_items', methods=['GET'])
def get_transaction_items():
    # Leer todos los datos
    all_transaction_items = TransactionItemModel.query.all()
    result = transaction_items_schema.dump(all_transaction_items)
    cc = len(result)
    response = jsonify(result)
    response.headers["Content-Range"] = f"bytes {0}-{cc}/{cc}"
    response.headers["Access-Control-Expose-Headers"] = "Content-Range"
    return response


@transaction_items.route('/transaction_items/<id>', methods=['GET'])
def get_transaction_item(id):
    # Leer 1 dato
    transaction_item = TransactionItemModel.query.get(id)
    return transaction_item_schema.jsonify(transaction_item)


@transaction_items.route('/transaction_items', methods=['POST'])
def create_transaction_item():
    # Crear datos
    transaction_id = request.json['transaction_id']
    component_id = request.json['component_id']
    quantity = request.json['quantity']
    operation = request.json['operation']
    new_transaction_item = TransactionItemModel(
        transaction_id, component_id, quantity, operation)
    db.session.add(new_transaction_item)
    db.session.commit()
    return transaction_item_schema.jsonify(new_transaction_item)


@transaction_items.route('/transaction_items/<id>', methods=['PUT'])
def update_transaction_item(id):
    # Actualizar 1 dato
    transaction_item = TransactionItemModel.query.get(id)
    transaction_id = request.json['transaction_id']
    component_id = request.json['component_id']
    quantity = request.json['quantity']
    operation = request.json['operation']
    transaction_item.user_id = transaction_id
    transaction_item.component_id = component_id
    transaction_item.quantity = quantity
    transaction_item.operation = operation
    db.session.commit()
    return transaction_item_schema.jsonify(transaction_item)


@transaction_items.route('/transaction_items/<id>', methods=['DELETE'])
def delete_transaction_item(id):
    # Eliminar 1 dato
    transaction = TransactionItemModel.query.get(id)
    db.session.delete(transaction)
    db.session.commit()
    return transaction_item_schema.jsonify(transaction)
