from flask import Blueprint, jsonify, request
from flask_cors import CORS

from flask_l414 import db
from flask_l414.models import TransactionModel, transaction_schema, transactions_schema


transactions = Blueprint('transactions', __name__)
CORS(transactions, supports_credentials=True)


@transactions.route('/transactions', methods=['GET'])
def get_transactions():
    # Leer todos los datos
    all_transactions = TransactionModel.query.all()
    result = transactions_schema.dump(all_transactions)
    cc = len(result)
    response = jsonify(result)
    response.headers["Content-Range"] = f"bytes {0}-{cc}/{cc}"
    response.headers["Access-Control-Expose-Headers"] = "Content-Range"
    return response


@transactions.route('/transactions/<id>', methods=['GET'])
def get_transaction(id):
    # Leer 1 dato
    transaction = TransactionModel.query.get(id)
    return transaction_schema.jsonify(transaction)


@transactions.route('/transactions', methods=['POST'])
def create_transaction():
    # Crear datos
    user_id = request.json['user_id']
    is_approved = request.json['is_approved']
    new_transaction = TransactionModel(user_id, is_approved)
    db.session.add(new_transaction)
    db.session.commit()
    return transaction_schema.jsonify(new_transaction)


@transactions.route('/transactions/<id>', methods=['PUT'])
def update_transaction(id):
    # Actualizar 1 dato
    transaction = TransactionModel.query.get(id)
    user_id = request.json['user_id']
    is_approved = request.json['is_approved']
    transaction.user_id = user_id
    transaction.is_approved = is_approved
    db.session.commit()
    return transaction_schema.jsonify(transaction)


@transactions.route('/transactions/<id>', methods=['DELETE'])
def delete_transaction(id):
    # Eliminar 1 dato
    transaction = TransactionModel.query.get(id)
    db.session.delete(transaction)
    db.session.commit()
    return transaction_schema.jsonify(transaction)
