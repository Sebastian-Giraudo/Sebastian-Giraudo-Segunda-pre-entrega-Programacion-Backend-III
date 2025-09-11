# 1. Usa la imagen oficial de Node.js como base.
# La versión 20 es la misma que usas localmente.
FROM node:20

# 2. Establece el directorio de trabajo dentro del contenedor.
# Aquí es donde se copiarán los archivos de tu proyecto.
WORKDIR /app

# 3. Copia los archivos de manifiesto (package.json y package-lock.json).
# Este paso se hace primero para aprovechar el cache de Docker.
COPY package*.json ./

# 4. Instala las dependencias del proyecto.
# Docker no ejecutará este paso si package.json no ha cambiado.
RUN npm install

# 5. Copia el resto de los archivos de tu proyecto.
# El resto del código de la aplicación (src, test, etc.).
COPY . .

# 6. Expone el puerto que tu aplicación usa.
# Esto le dice a Docker que tu aplicación escuchará en el puerto 8080.
EXPOSE 8080

# 7. Define el comando para iniciar la aplicación.
# Este comando se ejecutará cuando se inicie el contenedor.
CMD ["npm", "start"]