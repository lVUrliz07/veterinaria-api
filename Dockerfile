# Usa una imagen oficial de Node.js como base. Piensa en esto como el "sistema operativo".
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor.
WORKDIR /usr/src/app

# Copia los archivos de definición de dependencias.
COPY package*.json ./

# Instala las dependencias del proyecto.
RUN npm install

# Copia el resto de los archivos de tu aplicación al contenedor.
COPY . .

# Expone el puerto 3000 para que podamos acceder a la API desde fuera del contenedor.
EXPOSE 3000

# El comando que se ejecutará cuando el contenedor se inicie.
CMD ["npm", "run", "start:dev"]