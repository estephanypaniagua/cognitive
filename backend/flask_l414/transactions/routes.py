from flask import Blueprint, jsonify, request
from flask_cors import CORS

from flask_l414 import db
from flask_l414.models.Transaction import TransactionModel, transaction_schema, transactions_schema


transactions = Blueprint('transactions', __name__)
CORS(transactions, supports_credentials=True)


@transactions.route('/transactions', methods=['POST'])
def create_transaction():
    # Crear datos
    user_id = request.json['user_id']
    component_id = request.json['component_id']
    is_approved = request.json['is_approved']
    quantity = request.json['quantity']
    operation = request.json['operation']
    new_transaction = TransactionModel(
        user_id, component_id, is_approved, quantity, operation)
    db.session.add(new_transaction)
    db.session.commit()
    return transaction_schema.jsonify(new_transaction)


@transactions.route('/transactions', methods=['GET'])
def get_transactions():
    # Leer todos los datos
    all_transactions = TransactionModel.query.all()
    result = transactions_schema.dump(all_transactions)
    return jsonify(result)


@transactions.route('/transactions/<id>', methods=['GET'])
def get_transaction(id):
    # Leer 1 dato
    transaction = TransactionModel.query.get(id)
    return transaction_schema.jsonify(transaction)


@transactions.route('/transactions/<id>', methods=['PUT'])
def update_transaction(id):
    # Actualizar 1 dato
    transaction = TransactionModel.query.get(id)
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


@transactions.route('/transactions/<id>', methods=['DELETE'])
def delete_transaction(id):
    # Eliminar 1 dato
    transaction = TransactionModel.query.get(id)
    db.session.delete(transaction)
    db.session.commit()
    return transaction_schema.jsonify(transaction)
