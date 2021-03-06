from os import path, environ


class Config:
    # Statement for enabling the development environment
    DEBUG = True

    # Define the application directory
    BASE_DIR = path.abspath(path.dirname(__file__))

    # Define the database - we are working with
    # SQLite for this example
    # SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'app.db')
    # "mysql+pymysql://root@localhost/prueba"
    SQLALCHEMY_DATABASE_URI = environ.get(
        "DB_URI",
        'sqlite:///' + path.join(BASE_DIR, 'db.sqlite3'),
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    DATABASE_CONNECT_OPTIONS = {}

    JWT_TOKEN_LOCATION = "headers"
    JWT_SECRET_KEY = "MY_COOL_SECRET"

    # Application threads. A common general assumption is
    # using 2 per available processor cores - to handle
    # incoming requests using one and performing background
    # operations using the other.
    THREADS_PER_PAGE = 2

    # Enable protection agains *Cross-site Request Forgery (CSRF)*
    CSRF_ENABLED = False

    # Use a secure, unique and absolutely secret key for
    # signing the data.
    CSRF_SESSION_KEY = "secret"

    # CORS configuration
    CORS_HEADERS = 'Content-Type'

    # Secret key for signing cookies
    SECRET_KEY = environ.get("SECRET_KEY", "secret")
