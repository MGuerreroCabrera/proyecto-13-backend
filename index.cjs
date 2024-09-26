// Importar librería dotenv para manejar variables de entorno
require('dotenv').config();
// Importar librería express
const express = require('express');
const { connectDB } = require('./src/config/db.cjs');

// Crear aplicación de Express
const app = express();

// Configuración del puerto
const port = 3000;

// Indicar al servidor que escuche en la ruta '/' y responda con un mensaje de bienvenida
app.listen(port, () => {
    console.log(`Servidor levantado en http://localhost:${port}`);
});

// Conectar con la BBDD
connectDB();

// Crear ruta * para manejar errores 404
app.use("*", (req, res) => {
    return res.status(404).json({ message: "Ruta no encontrada" });
});
