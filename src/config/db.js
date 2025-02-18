// Traer mongoose.
const mongoose = require('mongoose');

// Crear función de conexión con la BBDD
const connectDB = async () => {
    try {
        // Conectar a la BBDD con mongoose.connect()
        await mongoose.connect(process.env.DB_URL);
        // Mostrar mensaje de éxito en caso de conexión exitosa
        console.log('Conectado a la base de datos 😜');
    } catch (error) {
        // Mostrar error en caso de fallo en la conexión
        console.log("error conectando a la BBDD 😤", error);
        // Salir del proceso si no se puede conectar a la BBDD
        process.exit(1); 
    }
}

// Exportar función de conexión
module.exports = { connectDB };