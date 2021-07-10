from flask import Blueprint, jsonify


healthchecks = Blueprint('healthchecks', __name__)


@healthchecks.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Welcome to my API'})
