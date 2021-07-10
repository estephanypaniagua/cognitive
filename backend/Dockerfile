# Imagen que contendrá la aplicación
FROM python:3.8-slim-buster

# Instalar servidor de producción
RUN pip3 install gunicorn[gevent]

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivo de librerías
COPY requerimientos.txt requerimientos.txt

# Instalar librerías
RUN pip3 install -r requerimientos.txt

# Copia el código
COPY . .

# Inicia la aplicación
CMD python3 run.py
# CMD gunicorn --worker-class --workers 8 gevent --bind 0.0.0.0:5000 wsgi:app --max-requests 10000 --timeout 5 --keep-alive 5 --log-level info