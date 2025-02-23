#Arcade 
Este proyecto requiere tener configurado Node.js, npm, MySQL y XAMPP con Apache y MySQL.

Requisitos
Node.js v23.8.0
npm (gestor de paquetes de Node.js)
MySQL configurado (se recomienda usar XAMPP, que incluye Apache y MySQL)
phpMyAdmin para gestionar la base de datos (si usas XAMPP)

Configuración
1. Clonar el repositorio
Abre una terminal y clona el repositorio en tu máquina local. Usa bash para ejecutar el siguiente comando:
git clone https://github.com/Camilamm2/Arcade.git
2. Configuración del frontend
Accede a la carpeta del frontend, instala las dependencias y corre el servidor de desarrollo. Sigue estos pasos:
Entra en la carpeta del frontend:
cd frontend

Instala las dependencias:
npm install

Corre el servidor de desarrollo:
npm run dev

3. Configuración del backend
Accede a la carpeta del backend, instala las dependencias y corre el servidor de desarrollo. Sigue estos pasos:

Entra en la carpeta del backend:
cd backend

Instala las dependencias:
npm install

Corre el servidor de desarrollo:
npm run dev

4. Base de Datos
El script de la base de datos está en backend/config/script.sql. Asegúrate de crear la base de datos en MySQL y ejecutar el script para crear las tablas necesarias.

6. Configuración de Variables de Entorno (.env)
Asegúrate de configurar las variables de entorno para el backend. Edita el archivo de entorno .env en la carpeta backend con las siguientes variables:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_tu_base_de_datos
PORT=3000
Asegúrate de reemplazar tu_contraseña con la contraseña de tu base de datos si es necesario y nombre_de_tu_base_de_datos con el nombre real de la base de datos que crearás en MySQL.


