// Importar librería dotenv para manejar variables de entorno
require('dotenv').config();
// Importar librería express
const express = require('express');
// Importar librería CORS para permitir solicitudes desde cualquier origen
const cors = require('cors');
const { connectDB } = require('./src/config/db.cjs');


// Crear aplicación de Express
const app = express();

// Habilitar CORS para las peticiones
app.use(cors());

// Importar el enrutado
const mainRouter = require("./src/api/routes/main.cjs");

// Permitir que el servidor reciba datos en formato json
app.use(express.json());

app.use("/api/v1/", mainRouter);

// Crear ruta * para manejar errores 404
app.use("*", (req, res) => {
    return res.status(404).json({ message: "Ruta no encontrada" });
});

// Configuración del puerto
const port = 3000;

// Indicar al servidor que escuche en la ruta '/' y responda con un mensaje de bienvenida
app.listen(port, () => {
    console.log(`Servidor levantado en http://localhost:${port}`);
});

// Conectar con la BBDD
connectDB();

