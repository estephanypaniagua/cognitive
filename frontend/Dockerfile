# Imagen de Node minificada para la construcción de archivos
FROM node:14.16.0-alpine AS builder

# Carpeta donde se almacenará el código
WORKDIR /opt/app

# Copia los archivos de librerías
COPY package.json yarn.lock ./
# Instala librerías
RUN yarn

# Copia los archivos de código
COPY . .

# Construye archivos estáticos a la carpeta `build`
RUN yarn build




# Imagen de nginx minificada para "servir" los archivos estáticos
FROM nginx:1.19.10-alpine AS webapp

# Copia carpeta de la imagen previa al servidor
COPY --from=builder /opt/app/build /usr/share/nginx/html

# Agrega configuración de nginx para redirecciones
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
