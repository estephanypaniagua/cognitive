from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

from flask_l414.config import Config


db = SQLAlchemy()
ma = Marshmallow()
bcrypt = Bcrypt()
jwt = JWTManager()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app, supports_credentials=True)

    db.init_app(app)
    ma.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    from flask_l414.healthchecks.routes import healthchecks
    from flask_l414.auth.routes import auth
    from flask_l414.categories.routes import categories
    from flask_l414.components.routes import components
    from flask_l414.users.routes import users
    from flask_l414.transactions.routes import transactions
    from flask_l414.transaction_items.routes import transaction_items

    app.register_blueprint(healthchecks)
    app.register_blueprint(auth)
    app.register_blueprint(categories)
    app.register_blueprint(components)
    app.register_blueprint(users)
    app.register_blueprint(transactions)
    app.register_blueprint(transaction_items)

    with app.app_context():
        db.create_all()

    return app
