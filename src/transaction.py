from flask import request, jsonify
from app import db, ma


class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    component_id = db.Column(db.Integer, db.ForeignKey('component.id'))
    is_approved = db.Column(db.String(1))
    quantity = db.Column(db.Integer)
    operation = db.Column(db.String(1))

    def __init__(self, user_id, component_id, is_approved, quantity, operation):
        self.user_id = user_id
        self.component_id = component_id
        self.is_approved = is_approved
        self.quantity = quantity
        self.operation = operation


db.create_all()


class TransactionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user_id', 'component_id',
                  'is_approved', 'quantity', 'operation')


transaction_schema = TransactionSchema()
transactions_schema = TransactionSchema(many=True)


def create_transaction():
    # Crear datos
    user_id = request.json['user_id']
    component_id = request.json['component_id']
    is_approved = request.json['is_approved']
    quantity = request.json['quantity']
    operation = request.json['operation']

    new_transaction = Transaction(
        user_id, component_id, is_approved, quantity, operation)

    db.session.add(new_transaction)
    db.session.commit()

    return transaction_schema.jsonify(new_transaction)


def get_transactions():
    # Leer todos los datos
    all_transactions = Transaction.query.all()
    result = transactions_schema.dump(all_transactions)
    return jsonify(result)


def get_transaction(id):
    # Leer 1 dato
    transaction = Transaction.query.get(id)
    return transaction_schema.jsonify(transaction)


def update_transaction(id):
    # Actualizar 1 dato
    transaction = Transaction.query.get(id)

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


def delete_transaction(id):
    # Eliminar 1 dato
    transaction = Transaction.query.get(id)
    db.session.delete(transaction)
    db.session.commit()

    return transaction_schema.jsonify(transaction)
