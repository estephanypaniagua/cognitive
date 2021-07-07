# Imagen base para la base de datos
FROM mysql:8.0.25

# Crea la base de datos `prueba`
ENV MYSQL_DATABASE prueba

# Copia scripts SQL que se ejecutarán al iniciar el contenedor
COPY ./db.sql /docker-entrypoint-initdb.d/